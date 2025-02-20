///<reference types ="Cypress"/>

const viewLgaBtn = ':nth-child(4) > .justify-between > .border'
const lgaListingTable = '[data-amp-testid="lgas-list-table"]'
const createLgaBtn = '.mdc-button__label > span'
const citySelect = '#city > .mat-mdc-select-trigger'
const dropdownList = '.mdc-list-item'
const lgaNameInput = '#name'
const lgaCodeInput = '#code'
const activateLgaBtn = '[data-amp-testid="activate-lga-button"]'
const deactivateLgaBtn = '[data-amp-testid="deactivate-lga-button"]'
const editLgaBtn = '[data-amp-testid="edit-lga-button"]'
const lgaActionsBtn = '[data-amp-testid="lgas-list-action-btn"]'
const errorModal = ':nth-child(3) > amp-error-display > .bg-error-50'

class LgaConfigPage {
	clickViewLga() {
		cy.get(viewLgaBtn).should('be.visible').click()
	}
	clickCreateLga() {
		cy.get(createLgaBtn).should('be.visible').click()
	}
	clickCityDropdown() {
		cy.get(citySelect).click()
	}
	selectCity(cityName, stateData) {
		cy.get(dropdownList)
			.should('be.visible')
			.then(($options) => {
				const matchingOption = [...$options].find(
					(option) => option.textContent.trim() === cityName
				)
				if (matchingOption) {
					cy.wrap(matchingOption).click()
				} else {
					cy.createCity(cityData, stateData).then(() => {
						cy.get(dropdownList).contains(cityName).click()
					})
				}
			})
	}
	enterLgaName(lgaName) {
		cy.get(lgaNameInput).should('be.visible').type(lgaName)
	}
	enterLgaCode(lgaCode) {
		cy.get(lgaCodeInput).should('be.visible').clear().type(lgaCode)
	}

	clickActionsBtn(lgaName) {
		cy.get(lgaListingTable)
			.contains(lgaName)
			.parents('tr')
			.within(() => {
				cy.get(lgaActionsBtn).should('be.visible').click()
			})
	}
	clickEditLga() {
		cy.get(editLgaBtn).should('be.visible').click()
	}
	clickDeactivateLga() {
		cy.get(deactivateLgaBtn).should('be.visible').click()
	}
	clickActivateLga() {
		cy.get(activateLgaBtn).should('be.visible').click()
	}

	verifyErrorMessage(message) {
		cy.get(errorModal).contains(message)
	}
}

export const lgaConfigPage = new LgaConfigPage()
