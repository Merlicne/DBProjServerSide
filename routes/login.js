const jwt = require('jsonwebtoken');
const pool = require('../db');
const { createHash } = require('crypto');

var connection = pool;

module.exports = async (req,res,next) => {
    const {username, password} = req.body;
    var pass = createHash('sha256').update(password).digest('base64');

    // console.log(req.headers);

    var query = `select karaoke.AdminLogin('${username}','${pass}');`;
    connection.query(query, function (err, results) {
        if (err) 
        res.status(500).json(
    {message: 'error', error: err});
    else if (results.rows[0].adminlogin != null){  
        
            next();
        
            res.setHeader('api-key', res.locals.key);
            res .status(200)
                .json({ 
                message: 'success',
                results: results.rows,
                key: res.locals.key
                });}
        else
            res.status(200).json({  
                message: 'login_fail'
            });
    });


}


