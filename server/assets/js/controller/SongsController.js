app.controller('SongsController', ['$scope', 'PlayerService', function($scope, PlayerService) {

    var page = {}; // pagenate 

    $scope.next = function() {
        if (page.page != page.pages) {
            page.page = parseInt(page.page, 10) + 1;
            $scope.init(page);
        } else {
            $(".page-next").addClass("disable").removeClass("active");
        }
    };

    $scope.last = function() {
        if (page.page != 1) {
            page.page = parseInt(page.page, 10) - 1;
            $scope.init(page);
        } else {
            $(".page-last").addClass("disable").removeClass("active");
        }
    };

    $scope.init = function(params) {

        PlayerService.getSongs(params).success(function(data, status, headers, config) {

            $scope.page = data.page;
            $("#SL").fadeIn(3000);
            $scope.songs = data.song;
            angular.copy(data.page, page); // Copy pagenate object

            if (page.currentPage == page.total) {
                $(".page-next").addClass("disable");
            } else if (page.currentPage === 0) {
                $(".page-last").addClass("disable");
            } else {
                $(".page-next").removeClass("disable");
                $(".page-last").removeClass("disable");
            }

        }).error(function(data, status, headers, config) { // Handle the error
            console.log(JSON.stringify(status));
        });
    };

}]);