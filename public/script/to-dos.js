const express = require('express');
const router = express.Router();
const db=require('../../app');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('../index', function(req, res, next) {
    const sql='SELECT * FROM todos';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.render('index', { title: 'To-Do List', userData: data});
    });
});
module.exports = router;