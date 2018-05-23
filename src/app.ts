import * as express from 'express';
import * as path from 'path';
import favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import Router from './server/routes/routes';
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'front', 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'sudo html');

// uncomment after placing your favicon in /public
//src.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(Router);

app.listen(3000, function () {
    console.log('Example src listening on port 3000!');
});
