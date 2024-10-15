angular.module("accountView").
  component('accountView', {
    templateUrl: 'components/account-view/account-view.template.html',
    controller: function AccountViewController($http, $location, $routeParams) {
        let self = this;

        let investments = []
        
        let storedAccounts = window.localStorage.getItem('storedAccounts')
        let accounts = JSON.parse(storedAccounts)

        self.accountId = $routeParams.accountId

        self.account = accounts.find(account => account.id == self.accountId)

        console.log(self.account)


        let storedInvestments = window.localStorage.getItem('storedInvestments')
        let storedMissions = window.localStorage.getItem('storedMissions')
        let missions = JSON.parse(storedMissions)

        if(storedInvestments) {
            let parsedInvestments = JSON.parse(storedInvestments)
            for (let i = 0; i < parsedInvestments.length; i++) {
                if(parsedInvestments[i].accountId == self.accountId) {
                    let mission = missions.filter(mission => mission.id === parsedInvestments[i].missionId)
                    let investmentObject = {
                        id: parsedInvestments[i].id,
                        investmentAmount: parsedInvestments[i].investmentAmount,
                        investmentPercent: (parsedInvestments[i].investmentAmount / mission.missionCost) * 100,
                        investmentAccount: self.account.firstName + ' ' + self.account.lastName,
                        investmentMission: mission[0].name,
                        missionId: mission[0].id
                    }
                    console.log(investmentObject)
                    investments.push(investmentObject)
                }
            }
            self.investments = investments
        } else if (!storedInvestments) {

        $http.get("../data/investments.json").then(function(response) {
            const investments = response.data

            console.log(investments)

            self.investments = investments.filter(investment => investment.missionId === self.mission.id)

            console.log(self.investments)

            window.localStorage.setItem('storedInvestments', JSON.stringify(investments))
        })                    

        }



        // if(storedAccounts) {
        //     let parsedAccounts = JSON.parse(storedAccounts)

        //     self.accounts = parsedAccounts
        // }
    }
})