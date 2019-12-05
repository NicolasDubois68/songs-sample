'use strict';

const database = require('../database/songs');

function addApiRoutes(app, config, callback) {
    database(config, songs  => {
        // This callback is called once the database has been readied
        
        app.get('/api/songs', (req, res) => {
            songs.find(results => {
                res.json({ data: results });
            });
        });

        app.post('/api/song', (req, res) => {
            songs.add(req.body, id => {
                res.json({ success: Boolean(id) });
            });
        });

        app.all('/api/*', (req, res) => {
            res.json({ error: 404, message: 'Unknown route' });
        });
        
        if (callback) callback();
    });
}

module.exports = {
    addRoutes: addApiRoutes
};
