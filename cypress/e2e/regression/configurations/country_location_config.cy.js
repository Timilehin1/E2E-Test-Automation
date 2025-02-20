///<reference types ="Cypress"/>

import { locationConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/LocationConfigPage'
import { productConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/ProductConfigPage'
import locationConfigs from '../../../fixtures/locationConfigs.json'
import { adminCustomers } from '../../../support/pageObjects/AdminPortalPageObjects/AdminCustomers'
import currency from '../../../fixtures/currency.json'

describe('Country location config', () => {
	beforeEach('Login', () => {
		cy.login()
	})
	const country = locationConfigs.country1.name

	it('Create a country', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		locationConfigPage.clickViewCountry()
		adminCustomers.searchListingTable(country)
		cy.wait(2000)
		adminCustomers.checkBusinessExists(country).then((exists) => {
			if (!exists) {
				cy.log(`${country} does not exist. Create a new country`)
				locationConfigPage.clickCreateCountry()
				locationConfigPage.enterCountryName(country)
				locationConfigPage.enterCountryCode(locationConfigs.country1.code)
				locationConfigPage.enterPhoneCode(locationConfigs.country1.phoneCode)
				locationConfigPage.clickCurrencyDropdown()
				locationConfigPage.selectCurrency(locationConfigs.country1.currencyId, currency.nigeria)
				locationConfigPage.enterVAT(locationConfigs.country1.valueAddedTax)
				locationConfigPage.enterMinimumOrderAmount(locationConfigs.country1.minimumOrderAmount)
				locationConfigPage.clickSubmitCountryBtn()
				adminCustomers.verifySuccessModal('You have successfully created a country')
				locationConfigPage.verifyCountryExists(country)
			} else {
				cy.log(`${country} already exists. Skip creation`)
				return
			}
		})
	})

	it('Edit a country', () => {
		const country2 = locationConfigs.country2
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		locationConfigPage.clickViewCountry()
		adminCustomers.searchListingTable(country)
		locationConfigPage.clickActionsBtn(country)
		locationConfigPage.clickEditCountry()
		locationConfigPage.enterCountryCode(country2.code)
		locationConfigPage.enterVAT(country2.valueAddedTax)
		locationConfigPage.enterMinimumOrderAmount(country2.minimumOrderAmount)
		locationConfigPage.clickSubmitCountryBtn()
		adminCustomers.verifySuccessModal('You have successfully edited this country')
	})

	it('Activate a country', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		locationConfigPage.clickViewCountry()
		adminCustomers.searchListingTable(country)
		locationConfigPage.clickActionsBtn(country)
		cy.wait(500)
		locationConfigPage.clickActivateBtn()
		locationConfigPage.confirmCountryActivation('Are you sure you want to activate this country?')
		adminCustomers.verifySuccessModal('You have successfully activated this country')
		productConfigPage.verifyColumnContent(country, 'Status', 'active', true)
	})

	it('Deactivate a country', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		locationConfigPage.clickViewCountry()
		adminCustomers.searchListingTable(country)
		cy.wait(500)
		locationConfigPage.clickActionsBtn(country)
		locationConfigPage.clickDeactivateBtn()
		locationConfigPage.confirmCountryActivation('Are you sure you want to deactivate this country?')
		adminCustomers.verifySuccessModal('You have successfully deactivated this country')
		productConfigPage.verifyColumnContent(country, 'Status', 'inactive', true)
	})

	it('Search by country name', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		locationConfigPage.clickViewCountry()
		adminCustomers.searchListingTable(country)
		locationConfigPage.verifyCountryExists('Name', country).then((exists) => {
			if (exists) {
				cy.log(`${country} exists.`)
			} else {
				cy.log(`${country} does not exist.`)
			}
		})
	})
})
