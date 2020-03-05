var express = require('express')
var app = express();

app.get('/', function(req, res){
     var sql = require('mssql/msnodesqlv8')

     // database config
     var config ={
        server: 'DESKTOP-4VC6QOA\\SQLEXPRESS',
        database: 'advertiise-qa',
        driver: 'msnodesqlv8',
    options : {
        trustedConnection : true
    }
    }

     // connecting to database
     sql.connect(config, function(err){
         if (err) console.log(err)
        console.log("connection stablished")
        var request = new sql.Request()

        request.query("SELECT TOP 5  * FROM vwAdminAdProfiles" , function(err, recordset){
            if(err) console.log(err)

            console.log(recordset.recordset)
            res.send(recordset.recordset)
        })
     })
   
})


var server = app.listen(5000, function(){
    console.log('server is running.. ')
})