angular.module("adminPanel")
  .component('adminPanel', {
    templateUrl: 'components/admin-panel/admin-panel.template.html',
    controller: function AdminPanelController($http, $location) {
        
        let accounts = []

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

        this.asteroids = Array.from(new Set(this.missions.map(function(mission) {
          return mission.targetAsteroid
        })))

        console.log(this.asteroids)

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


        this.goToPage = function(page) {
            $location.path(page)
        }

        console.log(missions)

        }
    })