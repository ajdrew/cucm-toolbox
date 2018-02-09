/**
 * Main AngularJS Web Application
 */
var app = angular.module('tutorialWebApp', [
    'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        // Home
        .when("/", {
            templateUrl: "partials/home.html",
            controller: "PageCtrl"
        })
        // Pages
        .when("/books", {
            templateUrl: "partials/books.html",
            controller: "PageCtrl"
        })
        .when("/cigars", {
            templateUrl: "partials/cigars.html",
            controller: "PageCtrl"
        })
        .when("/quotes", {
            templateUrl: "partials/quotes.html",
            controller: "PageCtrl"
        })
        .when("/tools", {
            templateUrl: "partials/tools.html",
            controller: "PageCtrl"
        })
        .when("/podcasts", {
            templateUrl: "partials/podcasts.html",
            controller: "PageCtrl"
        })
        .when("/landing", {
            templateUrl: "partials/coming-soon.html",
            controller: "PageCtrl"
        })
        .when("/coming-soon", {
            templateUrl: "partials/coming-soon.html",
            controller: "PageCtrl"
        })
        // Evernote
        .when("/evernote", {
            templateUrl: "partials/evernote.html",
            controller: "PageCtrl"
        })
        // Batcave
        .when("/batcave", {
            templateUrl: "partials/batcave.html",
            controller: "PageCtrl"
        })
        // else 404
        .otherwise("/404", {
            templateUrl: "partials/404.html",
            controller: "PageCtrl"
        });
}]);

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function ( /* $scope, $location, $http */ ) {
    console.log("Blog Controller reporting for duty.");
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ( /* $scope, $location, $http */ ) {
    console.log("Page Controller reporting for duty.");

    // Activates the Carousel
    $('.carousel').carousel({
        interval: 5000
    });

    // Activates Tooltips for Social Links
    $('.tooltip-social').tooltip({
        selector: "a[data-toggle=tooltip]"
    })
});