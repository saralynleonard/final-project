angular.module("featuredMissions")
  .component('featuredMissions', {
    templateUrl: 'components/featured-missions/featured-missions.template.html',
    controller: function FeaturedMissionsController($http) {
        
        let featuredMissions = []
        let storedMissions = []

        // $http.get("../data/missions.json").then(function(response) {
        //     for(let i = 0; i< response.data.length; i++) {
        //         if(response.data[i].isFeatured) {
        //             featuredMissions.push(response.data[i])
        //         }
        //     }
        // })

        // this.missions = featuredMissions



        this.$onInit = function() {
            let storedList = window.localStorage.getItem('storedMissions')

            if(storedList) {
                let parsedList = JSON.parse(storedList)
                this.allMissions = parsedList
                console.log("Retrieved missions from local storage: ", parsedList)

                for(let i = 0; i < parsedList.length; i++) {
                    if(parsedList[i].isFeatured) {
                        featuredMissions.push(parsedList[i])
                    }
                }

            } else if (!storedList) {

                $http.get("data/missions.json").then(function(response) {
                    for(let i = 0; i< response.data.length; i++) {
                        storedMissions.push(response.data[i])
                        if(storedMissions[i].isFeatured) {
                            featuredMissions.push(storedMissions[i])
                        }
                    }
                    this.missions = featuredMissions
                    window.localStorage.setItem('storedMissions', JSON.stringify(storedMissions))
                    console.log("Saved missions to local storage: ", storedMissions)
                })
                // for(let i = 0; i < storedMissions.length; i++) {
                //     if(storedMissions[i].isFeatured) {
                //         featuredMissions.push(storedMissions[i])
                //     }
                // }
                // this.missions = featuredMissions

            }

            this.missions = featuredMissions

        }

      

        // this.missions = []

        // fetch("js/missionList.json").then(response => {
        //     return response.json()
        // }).then(data => {
        //     console.log(data)

        //     for (let i = 0; i < data.missions.length; i++) {
        //         this.missions.push(data.missions[i])
        //     }
        //     console.log(this.missions)
        // })
    


        // console.log(featuredMissionsArray)

        // this.missions = featuredMissionsArray

        // console.log(this.missions)

        }
    })