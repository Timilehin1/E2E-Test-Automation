///<reference types = "Cypress" />
import { productConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/ProductConfigPage'
import { locationConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/LocationConfigPage'
import { cityConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/CityConfigPage'
import { adminCustomers } from '../../../support/pageObjects/AdminPortalPageObjects/AdminCustomers'
import { lgaConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/LgaConfigPage'
import { stateConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/StateConfigPage'
import locationConfigs from '../../../fixtures/locationConfigs.json'

describe('LocationConfig', () => {
	const state = locationConfigs.automationState
	const country = locationConfigs.country1
	const city = locationConfigs.automationCity
	const lga = locationConfigs.automationLga

	before('Activate country and state via API', () => {
		cy.updateCountryStatus(country)
		cy.updateStateStatus(state)
	})
	beforeEach('login', () => {
		cy.login()
	})

	after('Deactivate country and state via API', () => {
		cy.updateCountryStatus(country)
		cy.updateStateStatus(state)
	})

	it('Create LGA', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		lgaConfigPage.clickViewLga()
		adminCustomers.searchListingTable(lga.name)
		cy.wait(2000)
		adminCustomers.checkBusinessExists(lga.name).then((exists) => {
			if (exists) {
				cy.log(`${lga.name} already exists. Skip creation`)
				return
			} else {
				lgaConfigPage.clickCreateLga()
				stateConfigPage.clickCountryDropdown()
				stateConfigPage.selectCountry(country.name, country)
				cy.wait(500)
				cityConfigPage.clickStateDropdown()
				cityConfigPage.selectState(state.name, state, country)
				cy.wait(500)
				lgaConfigPage.clickCityDropdown()
				lgaConfigPage.selectCity(city.name, state)
				lgaConfigPage.enterLgaName(lga.name)
				lgaConfigPage.enterLgaCode(lga.code)
				locationConfigPage.clickSubmitCountryBtn()
				adminCustomers.verifySuccessModal('You have successfully created a new LGA')
				locationConfigPage.verifyCountryExists(lga.name)
			}
		})
	})

	it('Verify User is unable to create duplicate LGA', () => {
		const errorMessage = 'Duplicate record with same name/cityId/code already exists.'
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		lgaConfigPage.clickViewLga()
		lgaConfigPage.clickCreateLga()
		stateConfigPage.clickCountryDropdown()
		stateConfigPage.selectCountry(country.name, country)
		cy.wait(500)
		cityConfigPage.clickStateDropdown()
		cityConfigPage.selectState(state.name, state, country)
		cy.wait(500)
		lgaConfigPage.clickCityDropdown()
		lgaConfigPage.selectCity(city.name, state)
		lgaConfigPage.enterLgaName(lga.name)
		lgaConfigPage.enterLgaCode(lga.code)
		locationConfigPage.clickSubmitCountryBtn()
		lgaConfigPage.verifyErrorMessage(errorMessage)
	})

	it('Edit a LGA', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		lgaConfigPage.clickViewLga()
		adminCustomers.searchListingTable(lga.name)
		lgaConfigPage.clickActionsBtn(lga.name)
		lgaConfigPage.clickEditLga()
		lgaConfigPage.enterLgaCode(lga.code)
		locationConfigPage.clickSubmitCountryBtn()
		adminCustomers.verifySuccessModal('You have successfully edited this LGA')
		locationConfigPage.verifyCountryExists(lga.name)
	})

	it('Activate a LGA', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		lgaConfigPage.clickViewLga()
		adminCustomers.searchListingTable(lga.name)
		lgaConfigPage.clickActionsBtn(lga.name)
		lgaConfigPage.clickActivateLga()
		locationConfigPage.confirmCountryActivation('Are you sure you want to activate this LGA?')
		adminCustomers.verifySuccessModal('You have successfully activated this LGA')
		productConfigPage.verifyColumnContent(lga.name, 'Status', 'active', true)
	})

	it('Filter LGA by active status', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		lgaConfigPage.clickViewLga()
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Status')
		adminCustomers.clickApplyFilter()
		adminCustomers.filterByColumnAndVerify('active', true)
	})

	it('Deactivate a LGA', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		lgaConfigPage.clickViewLga()
		adminCustomers.searchListingTable(lga.name)
		lgaConfigPage.clickActionsBtn(lga.name)
		lgaConfigPage.clickDeactivateLga()
		locationConfigPage.confirmCountryActivation('Are you sure you want to deactivate this LGA?')
		adminCustomers.verifySuccessModal('You have successfully deactivated this LGA')
		productConfigPage.verifyColumnContent(lga.name, 'Status', 'inactive', true)
	})

	it('Filter LGA by inactive status', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		lgaConfigPage.clickViewLga()
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Status')
		adminCustomers.clickApplyFilter()
		adminCustomers.filterByColumnAndVerify('inactive', true)
	})

	it('Search by LGA name', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		lgaConfigPage.clickViewLga()
		adminCustomers.searchListingTable(lga.name)
		locationConfigPage.verifyCountryExists('Name', lga.name).then((exists) => {
			if (exists) {
				cy.log(`${lga.name} exists.`)
			} else {
				cy.log(`${lga.name} does not exist.`)
			}
		})
	})
})
