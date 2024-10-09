angular.module("missionDetails").
    component("missionDetails", {
        templateUrl: "components/mission-details/mission-details.template.html", 
        controller: ['$http', '$routeParams', 
            function MissionDetailController($http, $routeParams) {


                let self = this;


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