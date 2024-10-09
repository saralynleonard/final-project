angular.module("cosmicQuarry")
  .component('appFooter', {
    templateUrl: 'components/footer/footer.template.html',
    controller: function FooterController() {

        this.getCurrentYear = function() {
            return new Date().getFullYear()
        }
        

        // document.addEventListener('DOMContentLoaded', function() {
        //     const yearElement = document.getElementById('year')
        //     const currentYear = new Date().getFullYear()
        //     yearElement.textContent = currentYear
        //     })

        }
    })