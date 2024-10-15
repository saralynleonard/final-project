angular.module("accountView").
  component('accountView', {
    templateUrl: 'components/account-view/account-view.template.html',
    controller: function AccountViewController($http, $location, $routeParams) {
        let self = this;
        
        let storedAccounts = window.localStorage.getItem('storedAccounts')
        let accounts = JSON.parse(storedAccounts)

        self.accountId = $routeParams.accountId

        self.account = accounts.find(account => account.id == self.accountId)

        console.log(self.account)



        // if(storedAccounts) {
        //     let parsedAccounts = JSON.parse(storedAccounts)

        //     self.accounts = parsedAccounts
        // }
    }
})