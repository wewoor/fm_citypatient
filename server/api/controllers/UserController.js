/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `UserController.create()`
     */
    signin: function(req, res) {
        try {
            return res.render('app/signin');
        } catch (e) {
            sails.config.log.error('UserController.signin():' + e);
        }
    },

    /**
     * `UserController.login()`
     */
    login: function(req, res) {

        try {
            var user = {};
            user.name = req.param('name');
            user.password = req.param('password');
            User.find(user, function(err, result) {
                if (result && result.length > 0) {
                    req.session.user = result[0];
                    return res.ok({
                        msg: 'succ'
                    });
                }
                return res.ok({
                    msg: 'fail'
                });
            });
        } catch (e) {
            sails.config.log.error('UserController.login():' + e);
        }
    },

    update: function(req, res) {
        try {
            var user = req.param("user");
            console.log(JSON.stringify(req.session.user));
            if (user.password === user.password1) {
                delete user.password1;
                UserService.update(user, {
                    id: parseInt(req.session.user.id,10)
                }).then(function(data) {
                    console.log(JSON.stringify(data));
                    var result = data.length > 0 ? {
                        status: 200
                    } : {
                        status: -200
                    };
                    return res.json(result);
                });
            }
        } catch (e) {
            sails.config.log.error('UserController.update():' + e);
        }
    },

    /**
     * `UserController.logout()`
     */
    logout: function(req, res) {

        try {
            delete req.session.user; // delete the user from session
            return res.render('app/signin');
        } catch (e) {
            sails.config.log.error('UserController.logout():' + e);
        }
    },

    /**
     * `UserController.ucenter()`
     */
    ucenter: function(req, res) {

        try {
            return res.render('app/ucenter'); // ucenter
        } catch (e) {
            sails.config.log.error('UserController.ucenter():' + e);
        }
    }
};