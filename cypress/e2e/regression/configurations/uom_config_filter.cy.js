///<reference types="Cypress"/>
import { adminCustomers } from '../../../support/pageObjects/AdminPortalPageObjects/AdminCustomers'
import { productConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/ProductConfigPage'

describe('UOM filter actions', () => {
	beforeEach('Visit url', () => {
		cy.login()
	})

	it('Filter UOM table by inactive status', () => {
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		cy.visit(`/admin/configuration/product-configuration/uom-configuration`)
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Status')
		adminCustomers.clickApplyFilter()
		adminCustomers.filterByColumnAndVerify('INACTIVE', true)
	})
	it('Filter UOM table by active status', () => {
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		cy.visit(`/admin/configuration/product-configuration/uom-configuration`)
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Status')
		adminCustomers.clickApplyFilter()
		adminCustomers.filterByColumnAndVerify('ACTIVE', true)
	})

	it('Filter UOM table by internal mode', () => {
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		cy.visit(`/admin/configuration/product-configuration/uom-configuration`)
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Mode')
		adminCustomers.clickApplyFilter()
		adminCustomers.filterByColumnAndVerify('Internal', true)
	})

	it('Filter UOM table by external mode', () => {
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		cy.visit(`/admin/configuration/product-configuration/uom-configuration`)
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Mode')
		adminCustomers.clickApplyFilter()
		adminCustomers.filterByColumnAndVerify('External', true)
	})
})
