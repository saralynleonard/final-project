angular.module("addMission").
    component("addMission", {
        templateUrl: "components/add-mission/add-mission.template.html",
        controller: ['$http', '$routeParams', '$location',
            function AddMissionController($http, $routeParams, $location) {
                let self = this
                let nextId

                //get the missions array from local storage and parse it
                let storedList = window.localStorage.getItem('storedMissions')
                let missions = JSON.parse(storedList)
                console.log(missions)

                //create a new mission to hold values from inputs
                self.newMission = {
                    id: nextId,
                    name: '', 
                    launchDate: '', 
                    missionCost: 0,
                    aboutMission: '', 
                    isFeatured: false,
                    launchLat: 32.9901, 
                    launchLong: -106.9751
                }
                //get the next available id
                self.getNextId = function() {
                    let maxId = 0

                    for(let i = 0; i < missions.length; i++) {
                        if(missions[i].id > maxId) {
                            maxId = missions[i].id
                        }
                    }
                    console.log(maxId)
                    return maxId
                    
                }
                //push the newMission object to the missions array, then save the array to local storage.
                self.addMission = function(mission) {
                    if(mission.name && mission.launchDate && mission.missionCost && mission.aboutMission) {
                        nextId = self.getNextId(missions) + 1

                        missions.push({
                            id: nextId, 
                            name: mission.name, 
                            launchDate: mission.launchDate, 
                            missionCost: mission.missionCost, 
                            aboutMission: mission.aboutMission,
                            isFeatured: mission.isFeatured,
                            launchLocation: "Spaceport America",
                            launchLat: mission.launchLat,
                            launchLong: mission.launchLong
                        })
                        window.localStorage.setItem('storedMissions', JSON.stringify(missions))
                        self.goToPage('/admin')
                    }
                }

                self.goToPage = function(page) {
                    $location.path(page)
                }
            }
        ]
    })