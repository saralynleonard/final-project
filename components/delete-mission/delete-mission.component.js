angular.module("deleteMission").
    component("deleteMission", {
        templateUrl: "components/delete-mission/delete-mission.template.html",
        controller: ['$http', '$routeParams', '$location',
            function DeleteMissionController($http, $routeParams, $location) {
                let self = this
                self.missionId = $routeParams.missionId

                //find and parse the list of missions stored in local storage
                let storedList = window.localStorage.getItem('storedMissions')
                let missions = JSON.parse(storedList)

                //find the mission based on the id parameter
                self.mission = missions.find(mission => mission.id == self.missionId)

                //When the delete button is clicked, find the index of the mission, 
                //remove the mission from the missions array,
                //save the updated array back to local storage,
                //then go back to the admin page
                self.deleteMission = function() {
                    const index = missions.indexOf(self.mission)
                    console.log("Deleting the ", self.mission.name, " mission. Index: ", index)
                    missions.splice(index, 1)
                    localStorage.setItem('storedMissions', JSON.stringify(missions))
                    self.goToPage('/admin')
                }

                self.goToPage = function(page) {
                    $location.path(page)
                }
            }
        ]
        })