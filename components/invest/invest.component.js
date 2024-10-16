angular.module("invest")
  .component('invest', {
    templateUrl: 'components/invest/invest.template.html',
    controller: function InvestController($http, $routeParams, $location) {
        let storedMissions = window.localStorage.getItem('storedMissions')
        let storedInvestments = window.localStorage.getItem('storedInvestments')

        let investments = []

        let nextId

        /**Find the mission based on parameter */
        let missions = JSON.parse(storedMissions)

        this.missionId = $routeParams.missionId

        this.mission = missions.find(mission => mission.id == this.missionId)
        console.log(this.mission)


        /**if investments array is not found in local storage, iterate through investments.json and add to local storage */
        if(storedInvestments) {
            investments = JSON.parse(storedInvestments)
        } else if (!storedInvestments) {
            $http.get("data/investments.json").then(function(response) {
                for(let i = 0; i< response.data.length; i++) {
                    investments.push(response.data[i])
                }
                window.localStorage.setItem('storedInvestments', JSON.stringify(investments))
            })
        }

        /**Check local storage for storedAccounts; if found, parse the returned array then assign to this.accounts
         * If not found, iterate through accounts.json and add each account to accounts[] 
         */
        let storedAccounts = window.localStorage.getItem('storedAccounts')

        if(storedAccounts) {
          this.accounts = JSON.parse(storedAccounts)
        } else if (!storedAccounts) {
          $http.get("data/accounts.json").then(function(response) {
            for(let i = 0; i < response.data.length; i++) {
                accounts.push(response.data[i])
            }
            window.localStorage.setItem('storedAccounts', JSON.stringify(accounts))
          })

        console.log(accounts)

        this.accounts = accounts
        }        

        /**object to hold the new investment*/
        this.newInvestment = {
            id: nextId,
            investmentAmount: 0,
            accountId: 0,
            missionId: this.mission.id
        }

        this.getNextId = function() {
            let maxId = 0

            for(let i = 0; i < investments.length; i++) {
                if(investments[i].id > maxId) {
                    maxId = investments[i].id
                }
            }
            console.log(maxId)
            return maxId
        }

        this.addInvestment = function(investment) {
            console.log(investment.accountId.id)
            if(investment.investmentAmount > 0 && investment.accountId.id > 0) {
                nextId = this.getNextId(investments) + 1

                investments.push({
                    id: nextId, 
                    investmentAmount: investment.investmentAmount,
                    accountId: investment.accountId.id,
                    missionId: investment.missionId
                })
                window.localStorage.setItem('storedInvestments', JSON.stringify(investments))
                this.goToPage()
            }
        }

        this.getROI = function() {
            let percent = this.newInvestment.investmentAmount / this.mission.missionCost
            let materialsSold = this.mission.missionCost * 1.5
            let materialsSoldPercent = (this.newInvestment.investmentAmount / materialsSold) * 100

            return materialsSold * percent
        }

        this.goToPage = function() {
            $location.path(`/mission/${this.missionId}`)
        }
    } 
})