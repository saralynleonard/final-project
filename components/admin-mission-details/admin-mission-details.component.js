angular.module("adminMissionDetails").
    component("adminMissionDetails", {
        templateUrl: "components/admin-mission-details/admin-mission-details.template.html", 
        controller: ['$http', '$routeParams', 
            function AdminMissionDetailsController($http, $routeParams) {

                let self = this;

                let investments = []

                self.missionId = $routeParams.missionId
                let storedList = window.localStorage.getItem('storedMissions')
                let missions = JSON.parse(storedList)
                self.mission = missions.find(mission => mission.id == self.missionId)
                console.log(self.mission)

                /**Search for investments in local storage */
                let storedInvestments = window.localStorage.getItem('storedInvestments')
                let storedAccounts = window.localStorage.getItem('storedAccounts')
                let parsedAccounts = JSON.parse(storedAccounts)

                if(storedInvestments) {
                    let parsedInvestments = JSON.parse(storedInvestments)
                    for (let i = 0; i < parsedInvestments.length; i++) {
                        if(parsedInvestments[i].missionId == self.missionId) {
                            let account = parsedAccounts.filter(account => account.id === parsedInvestments[i].accountId)
                            let investmentObject = {
                                id: parsedInvestments[i].id,
                                investmentAmount: parsedInvestments[i].investmentAmount,
                                investmentPercent: (parsedInvestments[i].investmentAmount / self.mission.missionCost) * 100,
                                investmentAccount: account[0].firstName + ' ' + account[0].lastName,
                                missionId: self.mission.id
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

                self.totalInvestments = function() {
                    let total = 0; 
                    for (let i = 0; i < self.investments.length; i++) {
                        total += self.investments[i].investmentAmount
                    }
                    return total
                }
            }
        ]
    })