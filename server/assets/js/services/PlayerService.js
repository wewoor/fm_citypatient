app.factory('PlayerService', ['$http', function($http) {

    var player = {
        getSong: function(params) {
            var url = "/songs/songPagenate";
            if (params && params.page) {
                url += "?page=" + params.page;
            }
            return $http.get(url);
        },
        getSongById: function(id) {
            var url = "/songs/get";
            if (id) {
                url += "?id=" + id;
                return $http.get(url);
            }
        },
        getSongs: function(params) {
            var url = "/songs/songsPagenate";
            if (params && params.page) {
                url += "?page=" + params.page;
            }
            return $http.get(url);
        },
        count: function(params) {
            var url = "/songs/count";
            if (params.id) {
                var c = params.count + 1;
                url += "?c=" + c + "&id="+params.id;
                return $http.get(url);
            }
        }
    };
    return player;
}]);