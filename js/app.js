window.$ = Zepto;
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.privatedesktop', {
        url: '/privatedesktop',
        views: {
            'menuContent': {
                templateUrl: 'templates/privatedesktop.html',
                controller: 'PrivateDesktopCtrl'
            }/*,
            'fabContent': {
                template: '<button id="fab-privatedesktop" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-privatedesktop').classList.toggle('on');
                    }, 600);
                }
            }*/
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: '<button id="fab-language" ng-click="onShowLanguageAvailable($event)"  class="button button-fab button-fab-top-left expanded button-stable-900 drop"><i class="icon mdi-action-language"></i></button>',
                controller: function ($timeout, $ionicPopover, $scope) {
                    $ionicPopover.fromTemplateUrl('templates/popup-language.html', {
                        scope: $scope
                    }).then(function(popover) {
                        $scope.popover = popover;
                    });
                    $scope.choice = 'english';
                    $scope.onShowLanguageAvailable = function($event) {
                        $scope.popover.show($event);

                    };

                    $timeout(function () {
                        document.getElementById('fab-language').classList.toggle('on');
                    }, 600);
                }
            }
        }
    })


    .state('app.registration', {
        url: '/registration',
        views: {
            'menuContent': {
                templateUrl: 'templates/registration.html',
                controller: 'RegistrationCtrl'
            },
            'fabContent': {
                template: '<button id="fab-language" ng-click="onShowLanguageAvailable($event)" class="button button-fab button-fab-top-left expanded button-stable-900 drop"><i class="icon mdi-action-language"></i></button>',
                controller: function ($timeout , $ionicPopover, $scope) {
                    $ionicPopover.fromTemplateUrl('templates/popup-language.html', {
                        scope: $scope   
                    }).then(function(popover) {
                        $scope.popover = popover;
                    });
                    $scope.choice = 'english';
                    $scope.onShowLanguageAvailable = function($event) {
                        $scope.popover.show($event);
                    };

                    $timeout(function () {
                        document.getElementById('fab-language').classList.toggle('on');
                    }, 600);

                }
            }
        }
    })
    .state('app.forgot-password', {
        url: '/forgot-password',
        views: {
            'menuContent': {
                templateUrl: 'templates/forgot-password.html',
                controller: 'ForgotPasswordCtrl'
            },
            'fabContent': {
                template: '<button id="fab-language" ng-click="onShowLanguageAvailable($event)" class="button button-fab button-fab-top-left expanded button-stable-900 drop"><i class="icon mdi-action-language"></i></button>',
                controller: function ($timeout , $ionicPopover, $scope) {
                    $ionicPopover.fromTemplateUrl('templates/popup-language.html', {
                        scope: $scope   
                    }).then(function(popover) {
                        $scope.popover = popover;
                    });
                    $scope.choice = 'english';
                    $scope.onShowLanguageAvailable = function($event) {
                        $scope.popover.show($event);
                    };

                    $timeout(function () {
                        document.getElementById('fab-language').classList.toggle('on');
                    }, 600);

                }
            }
        }
    })

    // .state('app.profile', {
    //     url: '/profile',
    //     views: {
    //         'menuContent': {
    //             templateUrl: 'templates/profile.html',
    //             controller: 'ProfileCtrl'
    //         },
    //         'fabContent': {
    //             template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
    //             controller: function ($timeout) {
    //                 /*$timeout(function () {
    //                     document.getElementById('fab-profile').classList.toggle('on');
    //                 }, 800);*/
    //             }
    //         }
    //     }
    // })

    // .state('app.activity', {
    //     url: '/activity',
    //     views: {
    //         'menuContent': {
    //             templateUrl: 'templates/activity.html',
    //             controller: 'ActivityCtrl'
    //         },
    //         'fabContent': {
    //             template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
    //             controller: function ($timeout) {
    //                 $timeout(function () {
    //                     document.getElementById('fab-activity').classList.toggle('on');
    //                 }, 200);
    //             }
    //         }
    //     }
    // })

    // .state('app.friends', {
    //     url: '/friends',
    //     views: {
    //         'menuContent': {
    //             templateUrl: 'templates/friends.html',
    //             controller: 'FriendsCtrl'
    //         },
    //         'fabContent': {
    //             template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
    //             controller: function ($timeout) {
    //                 $timeout(function () {
    //                     document.getElementById('fab-friends').classList.toggle('on');
    //                 }, 900);
    //             }
    //         }
    //     }
    // })

    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
})

.factory('tools', function() {
    return {
        guid: function (data) {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return 'u' + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
    };
 })

.factory('api', function($q, tools) {
    var baseUrl = 'https://gui-dev.sowidu.de/api/';
    var ajax = function (subUrl, data) {
        var deferred = $q.defer();
        $.ajax({
            type: 'POST',
            url: baseUrl + subUrl,
            data: data,
            dataType: 'json',
            // beforeSend: function(xhr) { xhr.withCredentials = true },
            success: function(data){
                deferred.resolve(data);
            },
            error: function(xhr, type){
                deferred.reject({xhr:xhr , type: type});
                // alert('Ajax error!');
            }
        });

        return deferred.promise;
    };
    return {
        login: function (data) {
            return ajax('login', data);
        },
        register: function (data) {
            data.source_id = tools.guid();
            return ajax('register', data);  
        }
    };
 })

.directive('animate1', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
    
      element.bind('click', function (e) {
        
        //create .ink element if it doesn't exist
        if(e.target.children.length == 0) {
            var ink = document.createElement('span');
            ink.setAttribute('class', 'ink');
            e.target.prepend(ink)
        }
        
        ink = e.target.firstChild;
        //incase of quick double clicks stop the previous animation
        ink.classList.remove('animate')
        
        //set size of .ink
        if(!ink.clientHeight && !ink.clientWidth)
        {
            //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
            d = Math.max(e.target.clientWidth, e.target.clientHeight);
            ink.setAttribute('style', 'height: ' + d + 'px; width: ' + d + 'px');
        }
        
        //get click coordinates
        //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
        x = e.pageX - e.target.offsetLeft - ink.clientWidth /2;
        y = e.pageY - e.target.offsetTop - ink.clientHeight /2;
        
        //set the position and add class .animate
        ink.style.top = y+'px';
        ink.style.left = x+'px';
        ink.classList.add('animate');

      });

    }
  };
});

