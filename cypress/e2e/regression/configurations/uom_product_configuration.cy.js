///<reference types='Cypress'/>

import configs from '../../../fixtures/configs.json'
import { adminCustomers } from '../../../support/pageObjects/AdminPortalPageObjects/AdminCustomers'
import { productConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/ProductConfigPage'

describe('Create, edit, activate and deactivate UOM', () => {
	beforeEach(() => {
		cy.login()
	})

	it('Create UOM', () => {
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		adminCustomers.searchListingTable(configs.uom.name)
		cy.wait(2000)
		adminCustomers.checkBusinessExists(configs.uom.name).then((exists) => {
			if (exists) {
				cy.log(`${configs.uom.name} already exists. Skipping creation.`)
				return
			} else {
				cy.log(`${configs.uom.name} does not exist. Creating a new UOM.`)
				productConfigPage.clickCreateUom()
				productConfigPage.enterUomTitle(configs.uom.name)
				productConfigPage.enterUomCode(configs.uom.code)
				productConfigPage.enterUomDescription(configs.uom.description)
				productConfigPage.selectUomMode(configs.uom.mode)
				productConfigPage.clickProceedBtn()
				adminCustomers.verifySuccessModal('You have successfully created a UOM')
			}
		})
	})
	it('Edit UOM', () => {
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		productConfigPage.clickActionsBtn('Name', configs.uom.name)
		productConfigPage.clickEditUom()
		productConfigPage.enterUomDescription(configs.uom2.description)
		productConfigPage.selectUomMode(configs.uom2.mode)
		productConfigPage.clickProceedBtn()
		adminCustomers.verifySuccessModal('You have successfully edited a UOM')
	})

	it('Deactivate UOM', () => {
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		productConfigPage.clickActionsBtn('Name', configs.uom.name)
		productConfigPage.deactivateUom()
		adminCustomers.confirmDeactivation('Are you sure you want to deactivate this UOM?')
		adminCustomers.verifySuccessModal('You have successfully deactivated this UOM')
		productConfigPage.verifyColumnContent(configs.uom.name, 'Status', 'INACTIVE')
	})
	it('Activate UOM', () => {
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		productConfigPage.clickActionsBtn('Name', configs.uom.name)
		productConfigPage.deactivateUom()
		adminCustomers.confirmDeactivation('Are you sure you want to activate this UOM?')
		adminCustomers.verifySuccessModal('You have successfully activated this UOM')
		productConfigPage.verifyColumnContent(configs.uom.name, 'Status', 'ACTIVE')
	})
	it('Search UOM table by name', () => {
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		adminCustomers.searchListingTable(configs.uom.name)
		productConfigPage.verifyUomExists('Name', configs.uom.name)
	})
})
