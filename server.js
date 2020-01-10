const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 3307;
  
const jsonexport = require('jsonexport');
const sendmail = require('sendmail')();

var cors = require('cors');
app.use(cors());
app.options('*',cors());
//basic authentication
/*const basicAuth=require('express-basic-auth')
app.use(basicAuth({
	users:{'admin':'Password2$'}
}))
*/
const mysql = require('mysql');
// pool connection configurations
var pool = mysql.createPool({
	connectionLimit:100,
    host: 'unserhausgrdb.cntuzpgt85ar.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Password2$',	
    database: 'unserHausGR'
});
 
// connect to database
//mc.connect();
exports.pool=pool;
//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Listening Port

var routes = require('./app/route/approutes.js'); //importing route
routes(app); //register the route

var eventRoute=require('./app/route/eventRoute.js');
eventRoute(app);


var eventUserDetailRoute=require('./app/route/eventUserDetailRoute.js');
eventUserDetailRoute(app);

var showroomDetailsRoute=require('./app/route/showroomDetailsRoute.js');
 showroomDetailsRoute(app);

 var adminPageEditRoute=require('./app/route/adminEditPageRoute.js');
 adminPageEditRoute(app);

/*var consultantDetailsRoute=require('./app/route/consultantDetailsRoute');
consultantDetailsRoute(app);
*/
app.listen(port);
console.log('API server started on: ' + port);