angular.module("error")
  .component('error', {
    templateUrl: 'components/error/error.template.html',
    controller: function ErrorController() {
        this.title = "Oops! "
    } 
})