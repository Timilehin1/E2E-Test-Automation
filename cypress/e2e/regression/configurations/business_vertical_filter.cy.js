import { adminCustomers } from '../../../support/pageObjects/AdminPortalPageObjects/AdminCustomers'
import { productConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/ProductConfigPage'
import { companyCategoryConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/CompanyCategoryConfigPage'

describe('Business vertical filter actions', () => {
	beforeEach('Visit url', () => {
		cy.login()
	})
	const verticalUrl = '/admin/configuration/company-configuration/business-verticals'
	it('Filter business vertical table by inactive status', () => {
		productConfigPage.clickConfigurationNav()
		companyCategoryConfigPage.clickCompanyNav()
		cy.visit(`${verticalUrl}`)
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Status')
		adminCustomers.clickApplyFilter()
		adminCustomers.filterByColumnAndVerify('INACTIVE', true)
	})
	it('Filter business vertical table by active status', () => {
		productConfigPage.clickConfigurationNav()
		companyCategoryConfigPage.clickCompanyNav()
		cy.visit(`${verticalUrl}`)
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Status')
		adminCustomers.clickApplyFilter()
		adminCustomers.filterByColumnAndVerify('ACTIVE', true)
	})
})
