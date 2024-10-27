angular.module("editMission").
    component("editMission", {
        templateUrl: "components/edit-mission/edit-mission.template.html",
        controller: ['$http', '$routeParams', '$location',
            function EditMissionController($http, $routeParams, $location) {
                let self = this
                self.missionId = $routeParams.missionId

                let storedList = window.localStorage.getItem('storedMissions')
                let missions = JSON.parse(storedList)
                console.log(missions)

                self.mission = missions.find(mission => mission.id == self.missionId)

                //convert the mission.launchDate to a date object
                dateObj = new Date(self.mission.launchDate)
                self.mission.launchDate = dateObj

                
                console.log(self.mission.launchDate)
                let missionName 
                missionName = self.mission.name
                console.log(missionName)


                self.saveEdits = function() {
                    console.log("Saving to local storage...")
                    localStorage.setItem('storedMissions', JSON.stringify(missions))
                    self.goToPage('/admin')
                }

                self.goToPage = function(page) {
                    $location.path(page)
                }
            }
        ]
    })
