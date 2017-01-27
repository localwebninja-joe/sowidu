/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, $ionicSideMenuDelegate) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

    $scope.clearLanguageFab = function() {
        var fabs = document.getElementById('fab-language');
        if (fabs  !== null) fabs.remove();
    };
    // $scope.$on('update_checkbox_on_registration', function (event, data) {
    //   // $scope.$broadcast('update_checkbox_on_registration', someValue(s));
    // }); 
        // $scope.$emit('update_checkbox_on_registration', $scope.acceptCheckbox);

    $scope.onOpenSideMenu = function () {
         $ionicSideMenuDelegate.toggleRight();
    };

})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $state, $ionicSideMenuDelegate, $ionicPopup, api) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
    $ionicSideMenuDelegate.canDragContent(false);
    $scope.forgotPass = function (argument) {
        $state.go('app.forgot-password');
    };
    
    $scope.gotoRegistration = function () {
        $state.go('app.registration');
    };

    $scope.onLoginClick = function () {

        api.login({
            username: this.username ,
            password: this.password 
        }).then(function (data) {
            console.log(data);
            $state.go('app.privatedesktop');
        }, function (data) {
            console.log(data);
            var alertPopup = $ionicPopup.alert({
                cssClass: 'jml-login-notification light',      
                title: 'Opps!',
                template: 'Invalid credentials.',
                buttons: [
                    { 
                        text: 'Ok',
                        type: 'button-royal',
                        onTap: function(e) {
                            // console.log('Thank you for not eating my delicious ice cream cone');
                        }
                    }
                ]
            });
        });

        // $state.go('app.privatedesktop');
    };
})

.controller('RegistrationCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $state, $ionicModal, $ionicSideMenuDelegate, $document, $ionicPopup, api) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();

    $scope.forgotPass = function (argument) {
        alert(123);  
    };
    $ionicSideMenuDelegate.canDragContent(false);
    $ionicModal.fromTemplateUrl('templates/modal-agreement.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.showAgreement = function (argument) {
        $scope.modal.show();console.log($scope.acceptCheckbox);
        document.getElementById('modal-agreement-registration').checked = document.getElementById('registration-agreement').checked;
    };

    $scope.yesAction = function (argument) {
        $scope.modal.hide(); 
        document.getElementById('registration-agreement').checked = document.getElementById('modal-agreement-registration').checked;
    };

    $scope.noAction = function (argument) {
        $scope.modal.hide();
        document.getElementById('registration-agreement').checked = document.getElementById('modal-agreement-registration').checked;
    };


    $scope.gotoLogin = function () {
        $state.go('app.login');
    };

    $scope.onSelectGender = function () {

        var alertPopup = $ionicPopup.alert({
            cssClass: 'jml-login-notification light',      
            title: 'Gender',
            template: '<label class="item item-radio"> '+
                        '<input type="radio" name="group" value="Male" >' +
                        '<div class="item-content">' +
                            'Male' +
                        '</div>' +
                        '<i class="radio-icon ion-checkmark"></i>' +
                    '</label>' +
                    '<label class="item item-radio">' +
                        '<input type="radio" name="group" value="Female" >' +
                        '<div class="item-content">' +
                            'Female' +
                        '</div>' +
                        '<i class="radio-icon ion-checkmark"></i>' +
                    '</label>',
            buttons: [
                { 
                    text: 'Ok',
                    type: 'button-royal',
                    onTap: function(e) {
                        var radiobuttons = e.target.parentElement.parentElement.getElementsByTagName('input');
                        if (radiobuttons[0].checked) {
                            return radiobuttons[0].value;
                        }
                        if (radiobuttons[1].checked) {
                            return radiobuttons[1].value;  
                        }
                    }
                }
            ]
        });
        
        alertPopup.then(function(res) {
            var element = document.getElementById('registration-input-gender');
            var label = element.parentElement.getElementsByClassName('input-label')[0];
            if (!res) {    
                res = '';
                label.classList.remove('has-input');
            } else {
                if (!label.classList.contains('has-input')) {
                    label.classList.add('has-input');    
                }
            }
            element.value = res;
        });

    };


    $scope.onRegister = function () {

        if (this.first_name === '' || this.first_name === undefined ||
            this.last_name === '' || this.last_name ===  undefined ||
            this.email === '' || this.email === undefined || 
            this.password === '' || this.password === undefined ||
            this.username === '' || this.username === undefined ||
            document.getElementById('registration-input-gender').value === '') {
            var alertPopup = $ionicPopup.alert({
                cssClass: 'jml-login-notification light',      
                title: 'Opps!',
                template: 'Please fill up all required fields.',
                buttons: [
                    { 
                        text: 'Ok',
                        type: 'button-royal',
                        onTap: function(e) {
                            // console.log('Thank you for not eating my delicious ice cream cone');
                        }
                    }
                ]
            });
            return false;
        } 

        if (!document.getElementById('registration-agreement').checked) {
            var alertPopup = $ionicPopup.alert({
                cssClass: 'jml-login-notification light',      
                title: 'Opps!',
                template: 'Please signify your agreement with our terms.',
                buttons: [
                    { 
                        text: 'Ok',
                        type: 'button-royal',
                        onTap: function(e) {
                            // console.log('Thank you for not eating my delicious ice cream cone');
                        }
                    }
                ]
            });

            return false;
        }
        if (this.password === '' && this.passwordConfirm === '') {
            return false;
        } 

        if (this.password !== this.passwordConfirm) {
            var alertPopup = $ionicPopup.alert({
                cssClass: 'jml-login-notification light',      
                title: 'Opps!',
                template: 'Password not matched.',
                buttons: [
                    { 
                        text: 'Ok',
                        type: 'button-royal',
                        onTap: function(e) {
                            // console.log('Thank you for not eating my delicious ice cream cone');
                        }
                    }
                ]
            });
            return false;
        } 
    
        api.register({
            first_name: this.first_name ,
            last_name: this.last_name ,
            email: this.email ,
            password: this.password ,
            username: this.username,
            gender: document.getElementById('registration-input-gender').value
        }).then(function (data) {
            console.log(data);
            var alertPopup = $ionicPopup.alert({
                cssClass: 'jml-login-notification light',      
                title: 'Success!',
                template: 'Registration Successfully Created.',
                buttons: [
                    { 
                        text: 'Ok',
                        type: 'button-balanced',
                        onTap: function(e) {
                            $state.go('app.privatedesktop');
                        }
                    }
                ]
            });
        }, function (data) {
            console.log(data);
            var alertPopup = $ionicPopup.alert({
                cssClass: 'jml-login-notification light',      
                title: 'Opps!',
                template: 'Error 500.',
                buttons: [
                    { 
                        text: 'Ok',
                        type: 'button-royal',
                        onTap: function(e) {
                            // console.log('Thank you for not eating my delicious ice cream cone');
                        }
                    }
                ]
            });
        });
    };

})

.controller('ForgotPasswordCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $state, $ionicSideMenuDelegate) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
    $ionicSideMenuDelegate.canDragContent(false);
    $scope.gotoLogin = function (argument) {
        $state.go('app.login');
    };
    $scope.gotoRegistration = function () {
        $state.go('app.registration');
    };
})

.controller('PrivateDesktopCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $state, $ionicSideMenuDelegate) {
    $scope.$parent.clearLanguageFab();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

;
