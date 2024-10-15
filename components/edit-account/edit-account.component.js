angular.module('editAccount').
    component('editAccount', {
        templateUrl: 'components/edit-account/edit-account.template.html',
        controller: function editAccountController($http, $location, $routeParams) {
            this.accountId = $routeParams.accountId
            let storedAccounts = window.localStorage.getItem('storedAccounts')
            let accounts = JSON.parse(storedAccounts)

            this.account = accounts.find(account => account.id == this.accountId)

            this.saveAccount = function() {
                localStorage.setItem('storedAccounts', JSON.stringify(accounts))
                this.goToPage()
            }

            this.goToPage = function() {
                $location.path(`/user/${this.accountId}`)
            }
        }
    })