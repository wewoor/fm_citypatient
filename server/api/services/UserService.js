/**
 * UserService.js 
 */
var q = require('q');

module.exports = {

	/**
	 * 增加用户
	 * @param  {[type]} user [description]
	 * @return {[type]}      [description]
	 */
	post: function(user) {

	},

	/**
	 * 删除
	 * @param  {[type]} user [description]
	 * @return {[type]}      [description]
	 */
	delete: function(user) {

	},

	/**
	 * 更新用户
	 * @param  {[type]} user [description]
	 * @return {[type]}      [description]
	 */
	update: function(user, option) {
		var deferred = require('q').defer();
        User.update(user, option).exec(function(err, updated) {
            console.log(JSON.stringify(updated));
            if (err) return err;
            deferred.resolve(updated);
        });
        return deferred.promise;
	},

	/**
	 * 查询用户
	 * @param  {[type]} user [description]
	 * @return {[type]}      [description]
	 */
	query: function(user) {

	}

};