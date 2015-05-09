/**
 * SongsService.js
 */

var q = require('q');

module.exports = {

    insert: function(song) {
        var deferred = require('q').defer();
        Songs.create(song).exec(function createCB(err, created) {
            if (err) return err;
            deferred.resolve(created);
        });
        return deferred.promise;
    },

    delete: function(song) {
        var deferred = require('q').defer();
        Songs.destroy(song).exec(function deleteCB(err, res) {
            if (err) return err;
            deferred.resolve(res);
        });
        return deferred.promise;
    },

    get: function(params) {
        var deferred = require('q').defer();
        Songs.find(params).exec(function(err, results) {
            if (err) return err;
            deferred.resolve(results);
        });
        return deferred.promise;
    },

    count: function() {
        var deferred = require('q').defer();
        Songs.query('SELECT count(id) as count FROM tb_songs WHERE online=0', function(err, count) {
            if (err) return res.serverError(err);
            deferred.resolve(count[0].count);
        });
        return deferred.promise;
    },

    update: function(song, params) {
        var deferred = require('q').defer();

        Songs.update(params, song).exec(function(err, updated) {
            if (err) return err;
            deferred.resolve(updated);
        });
        return deferred.promise;
    },

    songsPagenate: function(page, params) {
        var deferred = require('q').defer();
        SongsService.count().then(function(total) {
            console.log("total:" + total);
            page.total = total;
            page.pages = Math.ceil(total / page.limit);
            Songs.find(params).paginate(page).exec(function(err, results) {
                if (err) return err;
                deferred.resolve({
                    song: results,
                    page: page
                });
            });
        });
        return deferred.promise;
    }

};