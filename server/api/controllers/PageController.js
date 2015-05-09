/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `PageController.index()`
     */
    index: function(req, res) {
        res.render('app/index');
    }
};
