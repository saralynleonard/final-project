angular.module("accountView").
  component('accountView', {
    templateUrl: 'components/account-view/account-view.template.html',
    controller: function AccountViewController($http, $location, $routeParams) {
        let self = this;

        let investments = []
        let initialInvestments = []
        
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
            $http.get("data/investments.json").then(function(response) {
            const investments = response.data
            console.log(investments)
            window.localStorage.setItem('storedInvestments', JSON.stringify(investments))

            for(let i = 0; i < investments.length; i++) {
                if(investments[i].accountId == self.accountId) {
                    let mission = missions.filter(mission => mission.id === investments[i].missionId)
                    let investmentObject = {
                        id: investments[i].id, 
                        investmentAmount: investments[i].investmentAmount, 
                        investmentPercent: (investments[i].investmentAmount / mission.missionCost) * 100, 
                        investmentAccount: self.account.firstName + ' ' + self.account.lastName, 
                        investmentMission: mission[0].name,
                        missionId: mission[0].id
                    }
                    initialInvestments.push(investmentObject)
                }
            }
            self.investments = initialInvestments
        })                    

        }
    }
})