angular.module("allMissions")
  .component('allMissions', {
    templateUrl: 'components/all-missions/all-missions.template.html',
    controller: function MissionsController($http) {
        let missions = []
        let storedList = window.localStorage.getItem('storedMissions')

        if(storedList) {
          let parsedList = JSON.parse(storedList)
          for(let i = 0; i < parsedList.length; i++) {
            missions.push(parsedList[i])
          }
        } else if (!storedList) {
          $http.get("data/missions.json").then(function(response) {
              for(let i = 0; i< response.data.length; i++) {
                      missions.push(response.data[i])
              }
              window.localStorage.setItem('storedMissions', JSON.stringify(missions))
          })
        }
        this.missions = missions
        }
    })