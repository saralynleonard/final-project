angular.module("previouslyViewed")
  .component('previouslyViewed', {
    templateUrl: 'components/previously-viewed/previously-viewed.template.html',
    controller: function PreviouslyViewedController($http) {
        // let viewedMissions = []
        let self = this
        let viewedMissions = window.localStorage.getItem('viewedMissions')
        if(viewedMissions) {
            let parsedViewedList = JSON.parse(viewedMissions)

            self.missions = parsedViewedList

            console.log("found viewed missions array: ", parsedViewedList)
        } else if (!viewedMissions) {
            // window.localStorage.setItem('viewedMissions', JSON.stringify(viewedMissions))
            console.log('No recently viewed missions.')
        }

    } 
})