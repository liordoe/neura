export const PROTOCOLS = ["tcp", "udp", "icmp"];

export const SERVICES = [
    "other", "ftp_data", "private", "http", "remote_job", "name", "netbios_ns", "eco_i", "mtp", "telnet",
    "finger", "domain_u", "supdup", "uucp_path", "Z39_50", "smtp", "csnet_ns", "uucp", "netbios_dgm", "urp_i",
    "auth", "domain", "ftp", "bgp", "ldap", "ecr_i", "gopher", "vmnet", "systat", "http_443", "efs", "whois",
    "imap4", "iso_tsap", "echo", "klogin", "link", "sunrpc", "login", "kshell", "sql_net", "time", "hostnames",
    "exec", "ntp_u", "discard", "nntp", "courier", "ctf", "ssh", "daytime", "shell", "netstat", "pop_3", "nnsp",
    "IRC", "pop_2", "printer", "tim_i", "pm_dump", "red_i", "netbios_ssn", "rje", "X11", "urh_i", "http_8001",
    "aol", "http_2784", "tftp_u", "harvest"
];

export const FLAGS = [ "SF", "S0", "REJ", "RSTR", "SH", "RSTO", "S1", "RSTOS0", "S3", "S2", "OTH" ];

export const ATTACK = [
    "normal", "neptune", "warezclient", "ipsweep", "portsweep", "teardrop", "nmap", "satan",
    "smurf", "pod", "back", "guess_passwd", "ftp_write", "multihop", "rootkit", "buffer_overflow",
    "imap", "warezmaster", "phf", "land", "loadmodule", "spy", "perl"
];