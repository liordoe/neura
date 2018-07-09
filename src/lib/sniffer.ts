export default function sniffer() {
    var Cap = require('cap').Cap;
    var decoders = require('cap').decoders;
    var PROTOCOL = decoders.PROTOCOL;

    var c = new Cap();
    const deviceList = Cap.deviceList();
    // console.log('deviceList', deviceList);
    var device = Cap.findDevice(deviceList[4].addresses[0].addr);
    var filter = 'tcp and dst port 80';
    var bufSize = 10 * 1024 * 1024;
    var buffer = Buffer.alloc(65535);

    c.setMinBytes && c.setMinBytes(0);

    var linkType = c.open(device, filter, bufSize, buffer);

    c.on('packet', function (nbytes, trunc) {
        console.log(`packet: length ${nbytes} bytes, ${trunc && 'truncated'}`);
        // raw packet data === buffer.slice(0, nbytes)
        const raw = buffer.slice(0, nbytes);

        if (linkType === 'ETHERNET') {
            let header = decoders.Ethernet(buffer);

            if (header.info.type === PROTOCOL.ETHERNET.IPV4) {
                console.log('Decoding IPv4 ...');

                console.log('header.info', header.info);

                header = decoders.IPV4(buffer, header.offset);
                console.log('from: ' + header.info.srcaddr + ' to ' + header.info.dstaddr);
                switch (header.info.protocol) {
                    case PROTOCOL.IP.TCP:
                        let datalen = header.info.totallen - header.hdrlen;
                        console.log('Decoding TCP ...');

                        header = decoders.TCP(buffer, header.offset);
                        console.log(' from port: ' + header.info.srcport + ' to port: ' + header.info.dstport);
                        datalen -= header.hdrlen;
                        console.log('buffer', raw.toString('binary', header.offset, header.offset + header.info.length));
                        console.log(header);
                        break;
                    case PROTOCOL.IP.UDP:
                        console.log('Decoding UDP ...');

                        header = decoders.UDP(buffer, header.offset);
                        console.log(' from port: ' + header.info.srcport + ' to port: ' + header.info.dstport);
                        console.log(header);
                        break;
                    default:
                        console.log('Unsupported IPv4 protocol: ' + PROTOCOL.IP[header.info.protocol]);
                        break;
                }
            } else
                console.log('Unsupported Ethertype: ' + PROTOCOL.ETHERNET[header.info.type]);
        }
    });
}