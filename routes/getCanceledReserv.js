const pool = require('../db');
var connection = pool;


module.exports = async (req,res,next) => {
    var query = `select * from karaoke.getCancelReservation() order by res_id desc;`;
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