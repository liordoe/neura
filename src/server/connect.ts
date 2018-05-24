import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';

(<any>mongoose).Promise = bluebird.Promise;

/*
 A "service provider" to estabilish and maintain a MongoDB connection.
 */
export default () => {
    return new Promise((resolve, reject) => {
        mongoose.connection.once('open', () => {
            console.log('Mongo database connected');
            resolve();
        });

        mongoose.connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running.');
            console.log(err);
            reject(err);
        });

        const options = <mongoose.ConnectionOptions>{
            reconnectTries: 2,
            reconnectInterval: 2000,
            // useMongoClient: true,
        };

        mongoose.connect(process.env.MONGODB_URI, options);
    });
};
