import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import db from './server/connect';
dotenv.config({path: '.env'});

import Router from './server/routes/router';
const app = express();

// view engine setup
app.use(express.static(path.join(process.cwd(), 'dist')));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'sudo html');

// uncomment after placing your favicon in /public
//src.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(process.cwd(), 'public')));

app.use(Router);

app.listen(3000, function () {
    console.log('Example src listening on port 3000!');
    db();
});
