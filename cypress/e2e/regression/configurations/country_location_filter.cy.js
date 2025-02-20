import { adminCustomers } from '../../../support/pageObjects/AdminPortalPageObjects/AdminCustomers'
import { productConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/ProductConfigPage'
import { locationConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/LocationConfigPage'

describe('Country filter actions', () => {
	beforeEach('Visit url', () => {
		cy.login()
	})

	it('Filter country by active status', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		locationConfigPage.clickViewCountry()
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Status')
		adminCustomers.clickApplyFilter()
		cy.wait(500)
		adminCustomers.filterByColumnAndVerify('active', true)
	})

	it('Filter country by inactive status', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		locationConfigPage.clickViewCountry()
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Status')
		adminCustomers.clickApplyFilter()
		adminCustomers.filterByColumnAndVerify('inactive', true)
	})
})
