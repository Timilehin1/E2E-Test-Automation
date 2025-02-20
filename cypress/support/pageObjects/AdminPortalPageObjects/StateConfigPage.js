///<reference types ='Cypress'/>

const viewStateBtn = ':nth-child(2) > .justify-between > .border'
const stateListingTable = '[data-amp-testid="states-list-table"]'
const countrySelect = '[data-amp-testid="country-select"]'
const dropdownList = '.mdc-list-item'
const createStateBtn = '.mdc-button__label > span'
const stateNameInput = '#stateName'
const stateCodeInput = '#stateCode'
const moaInput = '#minimumOrderAmount'
const editStateBtn = '[data-amp-testid="edit-state-button"]'
const activateStateBtn = '[data-amp-testid="activate-state-button"]'
const deactivateStateBtn = '[data-amp-testid="deactivate-state-button"]'
const stateActionsBtn = '[data-amp-testid="state-lists-action-btn"]'

class StateConfigPage {
	clickViewStateBtn() {
		cy.get(viewStateBtn).should('be.visible').click()
	}
	clickCreateStateBtn() {
		cy.get(createStateBtn).should('be.visible').click()
	}
	clickCountryDropdown() {
		cy.get(countrySelect).should('be.visible').click()
		cy.get('#country-panel').should('exist').should('be.visible')
	}
	selectCountry(countryName, countryData) {
		cy.get(dropdownList)
			.should('be.visible')
			.then(($options) => {
				const matchingOption = [...$options].find(
					(option) => option.textContent.trim() === countryName
				)
				if (matchingOption) {
					cy.wrap(matchingOption).click()
				} else {
					cy.createCountry(countryData).then(() => {
						cy.get(dropdownList).contains(countryName).click()
					})
				}
			})
	}
	enterStateName(stateName) {
		cy.get(stateNameInput).should('be.visible').clear().type(stateName)
	}
	enterStateCode(stateCode) {
		cy.get(stateCodeInput).should('be.visible').clear().type(stateCode)
	}
	enterMinimumOrderAmount(moaValue) {
		cy.get(moaInput).should('be.visible').clear().type(moaValue)
	}
	clickActionsBtn(stateName) {
		cy.get(stateListingTable)
			.contains(stateName)
			.parents('tr')
			.within(() => {
				cy.get(stateActionsBtn).should('be.visible').click()
			})
	}
	clickEditActn() {
		cy.get(editStateBtn).should('be.visible').click()
	}
	clickDeactivateBtn() {
		cy.get(deactivateStateBtn).should('be.visible').click()
	}
	clickActivateBtn() {
		cy.get(activateStateBtn).should('be.visible').click()
	}
}

export const stateConfigPage = new StateConfigPage()
