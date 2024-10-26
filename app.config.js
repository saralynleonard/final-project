angular.module("cosmicQuarry")
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<featured-missions></featured-missions>'
            })
            .when('/missions', {
                template: '<all-missions></all-missions>'
            })
            .when('/mission/:missionId', {
                template: '<mission-details></mission-details>'
            })
            .when('/admin', {
                template: '<admin-panel></admin-panel>'
            })
            .when('/admin/mission/:missionId', {
                template: '<admin-mission-details></admin-mission-details>'
            })
            .when('/edit/:missionId', {
                template: '<edit-mission></edit-mission>'
            })
            .when('/add/mission', {
                template: '<add-mission></add-mission>'
            })
            .when('/mission/delete/:missionId', {
                template: '<delete-mission></delete-mission>'
            })
            .when('/recent', {
                template: '<previously-viewed></previously-viewed>'
            })
            .when('/user/:accountId', {
                template: '<account-view></account-view>'
            })
            .when('/invest/:missionId', {
                template: '<invest></invest>'
            })
            .when('/account/login', {
                template: '<account-login></account-login>'
            })
            .when('/account/edit/:accountId', {
                template: '<edit-account></edit-account>'
            })
            .when('/investment/edit/:investmentId', {
                template: '<edit-investment></edit-investment>'
            })
            .when('/investment/delete/:investmentId', {
                template: '<delete-investment></delete-investment>'
            })
            .otherwise({
                redirectTo: '/error'
            })
            .when('/error', {
                template: '<error></error>'
            })
    }])