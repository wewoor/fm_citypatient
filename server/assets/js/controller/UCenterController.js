var ng = angular.module('ucenter', ['ngRoute']);

ng.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/song/:id', {
            controller: 'SongController',
            templateUrl: '/templates/song-update.html'
        })
        .when('/add', {
            controller: 'SongController',
            templateUrl: '/templates/song-add.html'
        })
        .when('/user/update', {
            controller: 'UserControler',
            templateUrl: '/templates/user-update.html'
        })
        .otherwise({
            redirectTo: '/',
            templateUrl: '/templates/song-list.html',
            controller: 'SongController'
        });
}]);

ng.controller('SongController', function($scope, $http, $route, $compile) {

    $scope.init = function() {
        $('#SongsTb').dataTable({
            "processing": true,
            ajax: "/songs/getAll",
            columns: [{
                "data": "name"
            }, {
                "data": "online"
            }, {
                "data": "created"
            }, {
                "data": "id"
            }],
            columnDefs: [{
                targets: 1,
                render: function(data, type, full, meta) {
                    var n = data;
                    return n === 0 ? "上线" : "下线";
                }
            }, {
                targets: 3,
                render: function(data, type, full, meta) {
                    var id = data;
                    var html = "<a class=\"edit btn\" href=\"#song/" + id + "\" >编辑</a>" +
                        "<a class=\"btn\" href=\"javascript:del_fun(" + id + ")\">删除</a>";
                    return html;
                }
            }]
        });
    };

    $scope.updateInit = function() {
        $http.get("/songs/" + $route.current.params.id)
            .success(function(data, status, headers, config) {
                $scope.song = data;
            }).error(function(data, status, headers, config) { // Handle the error
                console.log(JSON.stringify(status));
            });
    };

    $scope.update = function() {
        var song = {
            song: $scope.song
        };
        $http.post("/songs/update/", song)
            .success(function(data, status, headers, config) {
                if (data.status == 200) {
                    alert("更新成功！");
                }
            }).error(function(data, status, headers, config) { // Handle the error
                console.log(JSON.stringify(status));
            });
    };

    $scope.add = function() {
        var song = {
            song: $scope.song
        };
        $http.post("/songs/add", song).success(
            function(data, status, headers, config) {
                if (data) {
                    alert("添加成功!");
                }
            }).error(function(data, status, headers, config) { // Handle the error
        });
    };
});

ng.controller('UserControler', function($scope, $http, $route) {

    $scope.user = {
        password: "",
        password1: ""
    };

    $scope.update = function() {

        var pwd1 = $.trim($scope.user.password),
            pwd2 = $.trim($scope.user.password1);

        if (pwd1 === pwd2) {
            var user = {
                user: $scope.user
            };
            $http.post("/user/update/", user)
                .success(function(data, status, headers, config) {
                    if (data.status == 200) {
                        alert("更新成功！");
                    } else {
                        alert("更新失败！");
                    }
                }).error(function(data, status, headers, config) { // Handle the error
                    console.log(JSON.stringify(status));
                });
        } else {
            alert("两次输入的密码不一致！");
        }

    };
});

function del_fun(id) {
    $.get("/songs/delete/" + id, function(data) {
        if (data.length > 0) {
            console.log('success');
            alert("删除成功！");
            window.location.reload();
        }
    });
}