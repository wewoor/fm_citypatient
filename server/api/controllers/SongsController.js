/**
 * SongsController
 *
 * @description :: Server-side logic for managing songs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `SongsController.add()`
     */
    add: function(req, res) {
        var song = req.param("song");
        song.online = song.online ? 0:1;
        SongsService.insert(song).then(function(data) {
            return res.json(data);
        });
    },

    /**
     * `SongsController.delete()`
     */
    delete: function(req, res) {
        var id = req.param("id");
        SongsService.delete({id: id}).then(function(data) {
            return res.ok(data);
        });
    },

    get: function(req, res) {
        var id = req.param('id');
        SongsService.get({
            id: id
        }).then(function(data) {
            return res.json(data);
        });
    },

    update: function(req, res) {
        var song = req.param("song");
        SongsService.update(song, {
            id: song.id
        }).then(function(data) {
            var result = data.length > 0?{ status: 200}: {status: -200};
            return res.json(result);
        });
    },

    count: function(req, res) {
        var id = parseInt(req.param('id'), 10),
            count = parseInt(req.param('c'), 10);
        if (id && count) { // update play count
            var c = {
                    count: count
                },
                p = {
                    id: id
                };
            SongsService.update(c, p).then(function(data) {
                return res.json(data);
            });
        }
    },

    /**
     * `SongsController.get()`
     */
    songPagenate: function(req, res) {

        var currentPage = req.param("page");
        var page = {};
        page.limit = 1;
        page.page = currentPage ? currentPage : 1; // Defaul current page index as 1
        var params = {
            online: 0,
            sort: "created desc"
        };
        SongsService.songsPagenate(page, params).then(function(data) {
            return res.json(data);
        });
    },

    songsPagenate: function(req, res) {

        var currentPage = req.param("page");
        var page = {};
        page.limit = 6;
        page.page = currentPage ? currentPage : 1; // Defaul current page index as 1

        var params = {
            online: 0,
            sort: "created desc"
        };
        SongsService.songsPagenate(page, params).then(function(data) {
            return res.json(data);
        });
    },

    getAll: function(req, res) {
        Songs.query('SELECT * FROM tb_songs', function(err, results) {
            if (err) return res.serverError(err);
            var data = {
                data: results
            };
            return res.ok(data);
        });
    },

};