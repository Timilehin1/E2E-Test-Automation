///<reference types ="Cypress"/>

import { adminCustomers } from '../../../support/pageObjects/AdminPortalPageObjects/AdminCustomers'
import { productConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/ProductConfigPage'
import { companyCategoryConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/CompanyCategoryConfigPage'

describe('Company category filter actions', () => {
	beforeEach('Visit url', () => {
		cy.login()
	})

	it('Filter company category table by inactive status', () => {
		productConfigPage.clickConfigurationNav()
		companyCategoryConfigPage.clickCompanyNav()
		cy.visit(`/admin/configuration/company-configuration/company-category`)
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Status')
		adminCustomers.clickApplyFilter()
		adminCustomers.filterByColumnAndVerify('inactive', true)
	})
	it('Filter company category table by active status', () => {
		productConfigPage.clickConfigurationNav()
		companyCategoryConfigPage.clickCompanyNav()
		cy.visit(`/admin/configuration/company-configuration/company-category
        `)
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Status')
		adminCustomers.clickApplyFilter()
		adminCustomers.filterByColumnAndVerify('active', true)
	})
})
