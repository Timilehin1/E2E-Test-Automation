///<reference types ="Cypress"/>

const locationNav = '[data-amp-testid="sidenav-location"]'
const countryTable = '.mat-mdc-table'
const viewCountryBtn = ':nth-child(1) > .justify-between > .border'
const createCountry = '.mdc-button__label > span'
const submitCountry = '.mdc-button__label > .flex > .text-base'
const countryNameInput = '#countryName'
const countryCodeInput = '#countryCode'
const phoneCodeInput = '#phoneCode'
const currencyInput = '#currency'
const vatInput = '#vat'
const moaInput = '#minimumOrderAmount'
const editCountryBtn = '[data-amp-testid="edit-country-button"]'
const activateCountryBtn = '[data-amp-testid="activate-country-button"]'
const deactivateCountryBtn = '[data-amp-testid="deactivate-country-button"]'
const countryActionsBtn = '[data-amp-testid="countries-action-btn"]'
const countryListing = '[data-amp-testid="countries-list-table"]'
const confirmActivation = '.rounded-xl > .mdc-button__label'
const confirmationModal = 'p[class="text-base text-gray-600"]'
const currencyDrpdwn = '#mat-select-value-1'
const dropdownList = '.mdc-list-item'

class LocationConfigPage {
	clickLocationNav() {
		cy.get(locationNav).should('be.visible').click()
	}
	clickViewCountry() {
		cy.get(viewCountryBtn).should('be.visible').click()
	}
	clickCreateCountry() {
		cy.get(createCountry).should('be.visible').click()
	}
	enterCountryName(countryName) {
		cy.get(countryNameInput).should('be.visible').type(countryName)
	}
	enterCountryCode(countryCode) {
		cy.get(countryCodeInput).should('be.visible').clear().type(countryCode)
	}
	enterPhoneCode(phoneCode) {
		cy.get(phoneCodeInput).should('be.visible').type(phoneCode)
	}
	enterCurrency(currency) {
		cy.get(currencyInput).should('be.visible').type(currency)
	}
	enterVAT(vat) {
		cy.get(vatInput).should('be.visible').clear().type(vat)
	}
	enterMinimumOrderAmount(moa) {
		cy.get(moaInput).should('be.visible').clear().type(moa)
	}
	clickSubmitCountryBtn() {
		cy.get(submitCountry).should('be.visible').click()
	}
	verifyCountryExists(countryName) {
		return cy
			.get(countryTable)
			.contains(countryName)
			.then(($rows) => {
				return Cypress._.some($rows, (row) => row.innerText.trim().includes(countryName))
			})
	}
	clickActionsBtn(countryName) {
		cy.get(countryListing)
			.contains(countryName)
			.parents('tr')
			.within(() => {
				cy.get(countryActionsBtn).should('be.visible').click()
			})
	}
	clickEditCountry() {
		cy.get(editCountryBtn).should('be.visible').click()
	}
	clickDeactivateBtn() {
		cy.get(deactivateCountryBtn).should('be.visible').click()
	}
	clickActivateBtn() {
		cy.get(activateCountryBtn).should('be.visible').click()
	}
	confirmCountryActivation(message) {
		cy.get(confirmationModal).should('contain', message)
		cy.get(confirmActivation).should('be.visible').click({ force: true })
	}
	clickCurrencyDropdown() {
		cy.get(currencyDrpdwn).click()
	}
	selectCurrency(currencyName, currencyData) {
		cy.get(dropdownList)
			.should('be.visible')
			.then(($options) => {
				const matchingOption = [...$options].find(
					(option) => option.textContent.trim() === currencyName
				)
				if (matchingOption) {
					cy.wrap(matchingOption).click()
				} else {
					cy.createCurrency(currencyData).then(() => {
						cy.get(dropdownList).contains(currencyName).click()
					})
				}
			})
	}
}

export const locationConfigPage = new LocationConfigPage()
