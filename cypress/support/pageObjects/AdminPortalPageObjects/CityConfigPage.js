///<reference types ='Cypress'/>
const viewCityBtn = ':nth-child(3) > .justify-between > .border'
const cityListingTable = '[data-amp-testid="cities-list-table"]'
const stateSelect = ':nth-child(2) > .input-wrapper'
const dropdownList = '.mdc-list-item'
const createCityBtn = '.mdc-button__label > span'
const cityNameInput = '#name'
const cityCodeInput = '#code'
const editCityBtn = '[data-amp-testid="edit-city-button"]'
const activateCityBtn = '[data-amp-testid="activate-city-button"]'
const deactivateCityBtn = '[data-amp-testid="deactivate-city-button"]'
const cityActionsBtn = '[data-amp-testid="cities-list-action-btn"]'

class CityConfigPage {
	clickViewCity() {
		cy.get(viewCityBtn).should('be.visible').click()
	}
	clickCreateCity() {
		cy.get(createCityBtn).should('be.visible').click()
	}
	clickStateDropdown() {
		cy.get(stateSelect).click()
	}
	selectState(stateName, stateData, countryData) {
		cy.get(dropdownList)
			.should('be.visible')
			.then(($options) => {
				const matchingOption = [...$options].find(
					(option) => option.textContent.trim() === stateName
				)
				if (matchingOption) {
					cy.wrap(matchingOption).click()
				} else {
					cy.createState(stateData, countryData).then(() => {
						cy.get(dropdownList).contains(stateName).click()
					})
				}
			})
	}
	enterCityName(cityName) {
		cy.get(cityNameInput).should('be.visible').type(cityName)
	}
	enterCityCode(cityCode) {
		cy.get(cityCodeInput).should('be.visible').clear().type(cityCode)
	}

	clickActionsBtn(cityName) {
		cy.get(cityListingTable)
			.contains(cityName)
			.parents('tr')
			.within(() => {
				cy.get(cityActionsBtn).should('be.visible').click()
			})
	}
	clickEditCity() {
		cy.get(editCityBtn).should('be.visible').click()
	}
	clickDeactivateCity() {
		cy.get(deactivateCityBtn).should('be.visible').click()
	}
	clickActivateCity() {
		cy.get(activateCityBtn).should('be.visible').click()
	}
}

export const cityConfigPage = new CityConfigPage()
