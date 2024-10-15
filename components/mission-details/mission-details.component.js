angular.module("missionDetails").
    component("missionDetails", {
        templateUrl: "components/mission-details/mission-details.template.html", 
        controller: ['$http', '$routeParams', 
            function MissionDetailController($http, $routeParams) {
                let self = this;

                let viewedMissions = []

                self.displayMission = function() {
                    self.missionId = $routeParams.missionId

                    // $http.get("../data/missions.json").then(function(response) {
    
                    //     const missions = response.data
    
                    //     self.mission = missions.find(mission => mission.id == self.missionId)
                    //     self.initMap()
                    // })

                    /**Get missions from local storage then find the selected mission */
                    let storedList = window.localStorage.getItem('storedMissions')
                    let missions = JSON.parse(storedList)

                    self.mission = missions.find(mission => mission.id == self.missionId)

                    //check local storage for viewedMissions array
                    let exists = false

                    let storedViewedMissions = window.localStorage.getItem('viewedMissions')
                    if(storedViewedMissions) {
                        let parsedViewedList = JSON.parse(storedViewedMissions)

                        for (let i = 0; i < parsedViewedList.length; i++) {
                            if(parsedViewedList[i].id == self.missionId) {
                                exists = true
                                break
                            }
                        }

                        if(exists) {
                            console.log("this mission has already been added to the viewdMissions array.")
                        }
                        if(!exists) {
                            let viewedMission = {
                                id: self.mission.id,
                                name: self.mission.name,
                                launchDate: self.mission.launchDate,
                                aboutMission: self.mission.aboutMission,
                                missionCost: self.mission.missionCost,
                                targetAsteroid: self.mission.targetAsteroid,
                                isFeatured: self.mission.isFeatured,
                                launchLocation: self.mission.launchLocation,
                                launchLat: self.mission.launchLat,
                                launchLong: self.mission.launchLong,
                                viewedDate: new Date()
                            }

                            parsedViewedList.push(viewedMission)
                            console.log(parsedViewedList)
                            window.localStorage.setItem('viewedMissions', JSON.stringify(parsedViewedList))
                        }

                    }
                    if(!storedViewedMissions) {
                        let viewedMission = {
                            id: self.mission.id,
                            name: self.mission.name,
                            launchDate: self.mission.launchDate,
                            aboutMission: self.mission.aboutMission,
                            missionCost: self.mission.missionCost,
                            targetAsteroid: self.mission.targetAsteroid,
                            isFeatured: self.mission.isFeatured,
                            launchLocation: self.mission.launchLocation,
                            launchLat: self.mission.launchLat,
                            launchLong: self.mission.launchLong,
                            viewedDate: new Date()
                        }
                        // let parsedViewedList = JSON.parse(storedViewedMissions)
                        viewedMissions.push(viewedMission)

                        window.localStorage.setItem('viewedMissions', JSON.stringify(viewedMissions))

                    }

                    self.initMap()
                }


                self.initMap = function() {

                    let googlePosition = new google.maps.LatLng(self.mission.launchLat, self.mission.launchLong)

                    let mapOptions = {
                        center: googlePosition,
                        zoom: 10,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    }

                    let map = new google.maps.Map(document.getElementById('map'), mapOptions)

                    bounds = new google.maps.LatLngBounds()
                    bounds.extend(googlePosition)

                    let title = "Launch Site Details"
                    let content = "Lat: " + self.mission.launchLat + ", Long: " + self.mission.launchLong

                    self.addMarker(map, googlePosition, title, content)
                }

                self.addMarker = function(map, latLongPosition, title, content) {
                    let options = {
                        position: latLongPosition, 
                        map: map, 
                        title: title, 
                        clickable: true
                    }

                    let marker = new google.maps.Marker(options)

                    let popupWindowOptions = {
                        content: content, 
                        position: latLongPosition 
                    }

                    let popupWindow = new google.maps.InfoWindow(popupWindowOptions)

                    google.maps.event.addListener(marker, 'click', function() {
                        popupWindow.open(map)
                    })

                    return marker
                }

                self.displayMission()
            }
        ]
    })