///<reference types="Cypress"/>
import { adminCustomers } from '../../../support/pageObjects/AdminPortalPageObjects/AdminCustomers'
import { productConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/ProductConfigPage'

describe('Category filter actions', () => {
	beforeEach('Visit url', () => {
		cy.login()
	})

	it('Filter category table by inactive status', () => {
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		cy.visit(`/admin/configuration/product-configuration/category-configuration
        `)
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Status')
		adminCustomers.clickApplyFilter()
		adminCustomers.filterByColumnAndVerify('inactive', true)
	})
	it('Filter category table by active status', () => {
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		cy.visit(`/admin/configuration/product-configuration/category-configuration
        `)
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Status')
		adminCustomers.clickApplyFilter()
		adminCustomers.filterByColumnAndVerify('active', true)
	})
})
