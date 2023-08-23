

var pool = require('./bd');

async function getNovedades() {
    var query = 'select * from novedades order by id desc';
    var rows = await pool.query(query);
    return rows;
}



module.exports = { getNovedades }


/*async function deleteNovedadesById(id) {
    var query = 'delete from novedades where id = ?';
    var rows = await pool.query(query);
    return rows;
}

async function insertNovedades() {
    var query = 'delete from novedades where id = ?';
    var rows = await pool.query(query);
    return rows;

catch (error) {
    console.log(error);
    throw error;
}*/