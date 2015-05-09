var ng = angular.module('login', []);

ng.controller('LoginController', ['$scope', '$http', function($scope, $http) {

    $scope.login = function() {

        var params = {
            name: $("#UserName").val(),
            password: $("#Password").val()
        };
        $http.post("/user/login", params).success(function(data, status, headers, config) {
            if (data.msg == "succ") {
                window.location.href = "/user/ucenter";
            } else if (data.msg == "fail") {
                alert("请检查您的账号名和密码~");
            } else {
                alert("登录错误~");
            }
        }).error(function(data, status, headers, config) { // Handle the error
            console.log(JSON.stringify(status));
        });
    };

}]);