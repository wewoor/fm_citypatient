app.controller('PlayerController', ['$scope', 'PlayerService', function($scope, PlayerService) {

    var audio = document.getElementById('myPlayer'),
        playing = true, // Default status of player is playing
        page = {}; // pagenate 

    $scope.next = function() {
        if (page.page != page.pages) {
            page.page = parseInt(page.page, 10) + 1;
        } else {
            page.page = 0;
        }
        playNormal(page);
    };

    $scope.last = function() {
        if (page.page != 1) {
            page.page = parseInt(page.page, 10) - 1;
        } else {
            page.page = page.total;
        }
        playNormal(page);
    };

    $scope.control = function() {
        if (playing) {
            audio.pause();
            $("#PS").addClass("fi-play").removeClass("fi-pause");
            playing = false;
        } else {
            audio.play();
            $("#PS").addClass("fi-pause").removeClass("fi-play");
            playing = true;
        }
    };

    $scope.select = function(id) {
        PlayerService.getSongById(id).success(function(song, status, headers, config) {
            initparms(song[0]);
            setTimeout(function(){
                $("#ConList").animate({
                    top: -999
                }, 500);
            },500);
        });
    };

    $scope.init = function(params) {
        var hash = window.location.hash;
        if (hash.length > 1) {
            playByHash(hash);
        } else {
            playNormal(params);
        }
    };

    function initparms(song) {
        $scope.song = song;
        window.location.hash = song.id; // set song hash
        audio.src = song.addr;
    }

    function playNormal(params) {
        PlayerService.getSong(params).success(function(data, status, headers, config) {
            initparms(data.song[0]);
            $scope.page = data.page;
            angular.copy(data.page, page); // Copy pagenate object
            if (page.currentPage == page.total) {
                $(".page-next").addClass("disable");
            } else if (page.currentPage === 0) {
                $(".page-last").addClass("disable");
            } else {
                $(".page-next").removeClass("disable");
                $(".page-last").removeClass("disable");
            }
            PlayerService.count(data.song[0]);
        }).error(function(data, status, headers, config) { // Handle the error
            console.log(JSON.stringify(status));
        });
    }

    function playByHash(hash) {
        var id = parseInt(hash.substring(1, hash.length),10);
        PlayerService.getSongById(id).success(function(data, status, headers, config) {
            initparms(data[0]);
            PlayerService.count(data[0]); // count
        }).error(function(data, status, headers, config) { // Handle the error
            console.log(JSON.stringify(status));
        });
    }

    audio.addEventListener('ended', function() {
        $scope.next();
    });

    audio.addEventListener('loadstart', function() {
        $("#loading").show().addClass("doloading");
    });

    audio.addEventListener('play', function() {
        $("#loading").hide().removeClass("doloading");
        $("#PS").show();
    });

    audio.addEventListener('error', function() {
        myAlert("网络出错，无法正常播放当前节目。", "auto");
    });

    // Listen to the play time update    
    audio.addEventListener('timeupdate', function() {
        var distance = parseInt($("#DurPro").width(), 10);
        var width = (audio.currentTime / audio.duration * distance);
        $("#CurPro").css("width", width);
    });
}]);