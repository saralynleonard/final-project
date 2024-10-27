angular.module("accountLogin").
  component('accountLogin', {
    templateUrl: 'components/account-login/account-login.template.html',
    controller: function AccountLoginController($http, $location, $routeParams) {
        let storedAccounts = window.localStorage.getItem('storedAccounts')

        let accounts = []

        if(storedAccounts) {
          this.accounts = JSON.parse(storedAccounts)
        } else if (!storedAccounts) {
          $http.get("data/accounts.json").then(function(response) {
            for(let i = 0; i < response.data.length; i++) {
                accounts.push(response.data[i])
            }
            window.localStorage.setItem('storedAccounts', JSON.stringify(accounts))
          })

        this.accounts = accounts
        }

        this.login = function(id) {
            $location.path(`/user/${id}`)
        }

        this.cancel = function() {
            $location.path('/')
        }
    } 
})