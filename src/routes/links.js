const express = require('express');
const router = express.Router();
const dbPool = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    const {
        title,
        url,
        description
    } = req.body;

    const newLink = {
        title,
        url,
        description
    };
    await dbPool.query('INSERT INTO links set ?', [newLink]);
    res.redirect('/links');
});

router.get('/', async(req, res) => {
    const links = await dbPool.query('SELECT * FROM links');
    res.render('links/list', { links:links });


});
module.exports = router;