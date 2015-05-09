app.factory('HttpRequest',['$http', function($http) {

	var http = {
		query: function(url) {
			return $http.get(url).success(function(data) {
				
			});
		},
		save: function(url, data) {
			return $http.post(url, data);
		}
	};

}]);