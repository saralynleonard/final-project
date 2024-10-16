angular.module('editInvestment').
    component('editInvestment', {
        templateUrl: 'components/edit-investment/edit-investment.template.html',
        controller: function EditInvestmentController($location, $routeParams) {
            this.investmentId = $routeParams.investmentId
            let storedInvestments = window.localStorage.getItem('storedInvestments')
            let investments = JSON.parse(storedInvestments)

            this.investment = investments.find(investment => investment.id == this.investmentId)

            this.saveAccount = function() {
                localStorage.setItem('storedInvestments', JSON.stringify(investments))
                this.goToPage()
            }

            this.goToPage = function() {
                $location.path(`/user/${this.investment.accountId}`)
            }
        }
    })