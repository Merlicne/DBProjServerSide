const pool = require('../db');
const { createHash } = require('crypto');
var connection = pool;

module.exports = async function (req, res, next) {
    // console.log(req.body);
    var { email, password } = req.body;
    var hash = createHash('sha256').update(password).digest('base64');
    var query = `select * from karaoke.resetpassword_admin('${email}','${hash}');`;
    connection.query(query, function (err, results) {
        if (err) 
            res.status(500).json(
                {message: 'error','error': err});
        else    
            res.status(200).json({
                message: 'success',
                results: results.rows
            });
    });
}