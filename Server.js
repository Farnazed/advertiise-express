const express = require('express')
const app = express();
const sql = require('mssql/msnodesqlv8')

// database config
let config ={
    server: 'DESKTOP-4VC6QOA\\SQLEXPRESS',
    database: 'advertiise-qa',
    driver: 'msnodesqlv8',
    options : {
        trustedConnection : true
    }
}

app.get('/addProfiles', function(req, res){
     // connecting to database
     sql.connect(config, function(err){
        if (err) {
            res.sendStatus(500);
            return
        }
        console.log("connection stablished")
        let request = new sql.Request()
        let username = req.query.username

        if (!username) {
            res.status(400).send({message:"provider username"})      
            return
        }
        request.query("SELECT TOP 5  * FROM vwAdminAdProfiles WHERE UserName = '"+username+"' " , function(err, recordset){
            if(err) console.log(err)
            res.send(recordset.recordset)
        })
     })
})


const server = app.listen(5000, function(){
    console.log('server is running.. ')
})