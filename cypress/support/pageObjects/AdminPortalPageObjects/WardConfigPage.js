///<reference types ="Cypress"/>

const viewWardBtn = ':nth-child(5) > .justify-between > .border'
const wardListingTable = '[data-amp-testid="wards-list-table"]'
const createWardBtn = '.mdc-button__label > span'
const lgaSelect = '[data-amp-testid="lga-select"]'
const dropdownList = '.mdc-list-item'
const wardNameInput = '#name'
const wardCodeInput = '#code'
const activateWardBtn = '[data-amp-testid="activate-ward-button"]'
const deactivateWardBtn = '[data-amp-testid="deactivate-ward-button"]'
const editWardBtn = '[data-amp-testid="edit-ward-button"]'
const wardActionsBtn = '[data-amp-testid="wards-list-action-btn"]'

class WardConfigPage {
	clickViewWard() {
		cy.get(viewWardBtn).should('be.visible').click()
	}
	clickCreateWard() {
		cy.get(createWardBtn).should('be.visible').click()
	}
	clickLgaDropdown() {
		cy.get(lgaSelect).click()
	}
	selectLGA(lgaName, cityData) {
		cy.get(dropdownList)
			.should('be.visible')
			.then(($options) => {
				const matchingOption = [...$options].find((option) => option.textContent.trim() === lgaName)
				if (matchingOption) {
					cy.wrap(matchingOption).click()
				} else {
					cy.createLGA(lgaData, cityData).then(() => {
						cy.get(dropdownList).contains(lgaName).click()
					})
				}
			})
	}
	enterWardName(wardName) {
		cy.get(wardNameInput).should('be.visible').type(wardName)
	}
	enterWardCode(wardCode) {
		cy.get(wardCodeInput).should('be.visible').clear().type(wardCode)
	}

	clickActionsBtn(wardName) {
		cy.get(wardListingTable)
			.contains(wardName)
			.parents('tr')
			.within(() => {
				cy.get(wardActionsBtn).should('be.visible').click()
			})
	}
	clickEditWard() {
		cy.get(editWardBtn).should('be.visible').click()
	}
	clickDeactivateWard() {
		cy.get(deactivateWardBtn).should('be.visible').click()
	}
	clickActivateWard() {
		cy.get(activateWardBtn).should('be.visible').click()
	}
}

export const wardConfigPage = new WardConfigPage()
