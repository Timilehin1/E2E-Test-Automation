import { adminCustomers } from '../../../support/pageObjects/AdminPortalPageObjects/AdminCustomers'
import { productConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/ProductConfigPage'
import { locationConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/LocationConfigPage'
import { stateConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/StateConfigPage'

describe('State filter actions', () => {
	beforeEach('Visit url', () => {
		cy.login()
	})

	it('Filter states by active status', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		stateConfigPage.clickViewStateBtn()
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Status')
		adminCustomers.clickApplyFilter()
		cy.wait(500)
		adminCustomers.filterByColumnAndVerify('active', true)
	})

	it('Filter states by inactive status', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		stateConfigPage.clickViewStateBtn()
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Status')
		adminCustomers.clickApplyFilter()
		adminCustomers.filterByColumnAndVerify('inactive', true)
	})
})
