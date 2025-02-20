///<reference types ="Cypress"/>

import { adminCustomers } from '../../../support/pageObjects/AdminPortalPageObjects/AdminCustomers'
import locationConfigs from '../../../fixtures/locationConfigs.json'
import { stateConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/StateConfigPage'
import { productConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/ProductConfigPage'
import { locationConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/LocationConfigPage'
import { cityConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/CityConfigPage'

describe('City configurations', () => {
	const state = locationConfigs.automationState
	const country = locationConfigs.country1
	const city = locationConfigs.automationCity

	before('Activate country and state status via API', () => {
		cy.updateCountryStatus(country)
		cy.updateStateStatus(state)
	})

	beforeEach('login', () => {
		cy.login()
	})

	after('Deactivate country and state status via API', () => {
		cy.updateCountryStatus(country)
		cy.updateStateStatus(state)
	})

	it('Create a city', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		cityConfigPage.clickViewCity()
		adminCustomers.searchListingTable(city.name)
		cy.wait(2000)
		adminCustomers.checkBusinessExists(city.name).then((exists) => {
			if (exists) {
				cy.log(`${state.name} already exists. Skip creation`)
				return
			} else {
				cityConfigPage.clickCreateCity()
				stateConfigPage.clickCountryDropdown()
				stateConfigPage.selectCountry(country.name, country)
				cy.wait(1000)
				cityConfigPage.clickStateDropdown()
				cityConfigPage.selectState(state.name, state, country)
				cityConfigPage.enterCityName(city.name)
				cityConfigPage.enterCityCode(city.code)
				locationConfigPage.clickSubmitCountryBtn()
				adminCustomers.verifySuccessModal('You have successfully created a new city')
				locationConfigPage.verifyCountryExists(city.name)
			}
		})
	})

	it('Edit a city', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		cityConfigPage.clickViewCity()
		adminCustomers.searchListingTable(city.name)
		cityConfigPage.clickActionsBtn(city.name)
		cityConfigPage.clickEditCity()
		cityConfigPage.enterCityCode('IKE')
		locationConfigPage.clickSubmitCountryBtn()
		adminCustomers.verifySuccessModal('You have successfully edited this city')
		locationConfigPage.verifyCountryExists(state.name)
	})

	it('Deactivate a city', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		cityConfigPage.clickViewCity()
		adminCustomers.searchListingTable(city.name)
		cityConfigPage.clickActionsBtn(city.name)
		cityConfigPage.clickDeactivateCity()
		locationConfigPage.confirmCountryActivation('Are you sure you want to deactivate this city?')
		adminCustomers.verifySuccessModal('You have successfully deactivated this city')
		productConfigPage.verifyColumnContent(city.name, 'Status', 'inactive', true)
	})

	it('Activate a city', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		cityConfigPage.clickViewCity()
		adminCustomers.searchListingTable(city.name)
		cityConfigPage.clickActionsBtn(city.name)
		cityConfigPage.clickActivateCity()
		locationConfigPage.confirmCountryActivation('Are you sure you want to activate this city?')
		adminCustomers.verifySuccessModal('You have successfully activated this city')
		productConfigPage.verifyColumnContent(city.name, 'Status', 'active', true)
	})

	it('Search by city name', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		cityConfigPage.clickViewCity()
		adminCustomers.searchListingTable(city.name)
		locationConfigPage.verifyCountryExists('Name', city.name).then((exists) => {
			if (exists) {
				cy.log(`${city.name} exists.`)
			} else {
				cy.log(`${city.name} does not exist.`)
			}
		})
	})
})
