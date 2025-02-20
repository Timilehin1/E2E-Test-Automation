///<reference types ="Cypress"/>

import { adminCustomers } from '../../../support/pageObjects/AdminPortalPageObjects/AdminCustomers'
import locationConfigs from '../../../fixtures/locationConfigs.json'
import { stateConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/StateConfigPage'
import { productConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/ProductConfigPage'
import { locationConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/LocationConfigPage'

describe('State configurations', () => {
	const state = locationConfigs.automationState
	const country = locationConfigs.country1
	before('Update country status via API', () => {
		cy.updateCountryStatus(country)
	})

	beforeEach('login', () => {
		cy.login()
	})

	after(() => {
		cy.updateCountryStatus(country)
	})

	it('Create a state', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		stateConfigPage.clickViewStateBtn()
		adminCustomers.searchListingTable(state.name)
		cy.wait(2000)
		adminCustomers.checkBusinessExists(state.name).then((exists) => {
			if (exists) {
				cy.log(`${state.name} already exists. Skip creation`)
				return
			} else {
				stateConfigPage.clickCreateStateBtn()
				stateConfigPage.clickCountryDropdown()
				stateConfigPage.selectCountry(country.name, country)
				stateConfigPage.enterStateName(state.name)
				stateConfigPage.enterStateCode(state.code)
				stateConfigPage.enterMinimumOrderAmount(state.minimumOrderAmount)
				locationConfigPage.clickSubmitCountryBtn()
				adminCustomers.verifySuccessModal('You have successfully created a state')
				locationConfigPage.verifyCountryExists(state.name)
			}
		})
	})

	it('Edit a state', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		stateConfigPage.clickViewStateBtn()
		adminCustomers.searchListingTable(state.name)
		stateConfigPage.clickActionsBtn(state.name)
		stateConfigPage.clickEditActn()
		stateConfigPage.enterStateCode('LAU')
		stateConfigPage.enterMinimumOrderAmount(500)
		locationConfigPage.clickSubmitCountryBtn()
		adminCustomers.verifySuccessModal('You have successfully edited this state')
		locationConfigPage.verifyCountryExists(state.name)
	})

	it('Activate a state', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		stateConfigPage.clickViewStateBtn()
		adminCustomers.searchListingTable(state.name)
		stateConfigPage.clickActionsBtn(state.name)
		cy.wait(1000)
		stateConfigPage.clickActivateBtn()
		locationConfigPage.confirmCountryActivation('Are you sure you want to activate this state?')
		adminCustomers.verifySuccessModal('You have successfully activated this state')
		productConfigPage.verifyColumnContent(state.name, 'Status', 'active', true)
	})

	it('Deactivate a state', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		stateConfigPage.clickViewStateBtn()
		adminCustomers.searchListingTable(state.name)
		stateConfigPage.clickActionsBtn(state.name)
		stateConfigPage.clickDeactivateBtn()
		locationConfigPage.confirmCountryActivation('Are you sure you want to deactivate this state?')
		adminCustomers.verifySuccessModal('You have successfully deactivated this state')
		productConfigPage.verifyColumnContent(state.name, 'Status', 'inactive', true)
	})

	it('Search by state name', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		stateConfigPage.clickViewStateBtn()
		adminCustomers.searchListingTable(state.name)
		locationConfigPage.verifyCountryExists('Name', state.name).then((exists) => {
			if (exists) {
				cy.log(`${state.name} exists.`)
			} else {
				cy.log(`${state.name} does not exist.`)
			}
		})
	})
})
