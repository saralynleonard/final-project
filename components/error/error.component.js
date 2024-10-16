angular.module("error")
  .component('error', {
    templateUrl: 'components/error/error.template.html',
    controller: function ErrorController($window) {
        this.title = "Oops! "

        this.back = function() {
          $window.history.back()
        }
    } 
})