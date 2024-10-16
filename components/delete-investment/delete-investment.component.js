angular.module('deleteInvestment').
    component('deleteInvestment', {
        templateUrl: 'components/delete-investment/delete-investment.template.html',
        controller: function DeleteInvestmentController($routeParams, $location) {
            this.investmentId = $routeParams.investmentId
            let storedInvestments = window.localStorage.getItem('storedInvestments')
            let investments = JSON.parse(storedInvestments)

            this.investment = investments.find(investment => investment.id == this.investmentId)

            this.deleteInvestment = function() {
                const index = investments.indexOf(this.investment)

                console.log('Deleting investment of ', this.investment.investmentAmount)

                investments.splice(index, 1)
                localStorage.setItem('storedInvestments', JSON.stringify(investments))
                this.goToPage()
            }

            this.goToPage = function() {
                $location.path(`/user/${this.investment.accountId}`)
            }
        }
    })