///<reference types="Cypress"/>
import { companyCategoryConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/CompanyCategoryConfigPage'
import { productConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/ProductConfigPage'
import configs from '../../../fixtures/configs.json'
import { adminCustomers } from '../../../support/pageObjects/AdminPortalPageObjects/AdminCustomers'
import { businessVerticalConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/BusinessVerticalConfigPage'

describe('Business vertical configurations', () => {
	beforeEach('login', () => {
		cy.login()
	})
	const verticalName = configs.buisnessVertical.name

	it('Create business vertical', () => {
		productConfigPage.clickConfigurationNav()
		companyCategoryConfigPage.clickCompanyNav()
		businessVerticalConfigPage.clickSubMenu('Business vertical')
		adminCustomers.searchListingTable(verticalName)
		cy.wait(2000)
		adminCustomers.checkBusinessExists(verticalName).then((exists) => {
			if (exists) {
				cy.log(`${verticalName} already exists. Skipping creation`)
				return
			} else {
				cy.log(`${verticalName} does not exists. Create company category`)
				businessVerticalConfigPage.clickCreateBusinessVertical()
				businessVerticalConfigPage.enterVerticalName(verticalName)
				businessVerticalConfigPage.enterDescription(configs.buisnessVertical.description)
				businessVerticalConfigPage.automaticallyAssignOrder(configs.buisnessVertical.autoAssign)
				businessVerticalConfigPage.submitBusinessVertical()
				adminCustomers.verifySuccessModal('You have successfully created a vertical')
				businessVerticalConfigPage
					.verifyBusinessVerticalExists('Name', verticalName)
					.then((exists) => {
						if (exists) {
							cy.log(`${verticalName} exists. Business vertical created sucessfully`)
						} else {
							cy.log(`${verticalName} does not exist. Business vertical creation unsucessful`)
						}
					})
			}
		})
	})

	it('Edit business vertical', () => {
		productConfigPage.clickConfigurationNav()
		companyCategoryConfigPage.clickCompanyNav()
		businessVerticalConfigPage.clickSubMenu('Business vertical')
		businessVerticalConfigPage.clickActionsBtn('Name', verticalName)
		businessVerticalConfigPage.clickEditBusinessVertical()
		businessVerticalConfigPage.enterDescription(configs.buisnessVertical2.description)
		businessVerticalConfigPage.automaticallyAssignOrder(configs.buisnessVertical2.autoAssign)
		businessVerticalConfigPage.submitBusinessVertical()
		adminCustomers.verifySuccessModal('You have successfully edited a vertical')
	})

	it('Deactivate business vertical', () => {
		productConfigPage.clickConfigurationNav()
		companyCategoryConfigPage.clickCompanyNav()
		businessVerticalConfigPage.clickSubMenu('Business vertical')
		businessVerticalConfigPage.clickActionsBtn('Name', verticalName)
		businessVerticalConfigPage.clickDeactivateBtn()
		adminCustomers.confirmDeactivation('Are you sure you want to deactivate this vertical?')
		adminCustomers.verifySuccessModal('You have successfully deactivated this vertical')
		productConfigPage.verifyColumnContent(verticalName, 'Status', 'INACTIVE', true)
	})

	it('Activate business vertical', () => {
		productConfigPage.clickConfigurationNav()
		companyCategoryConfigPage.clickCompanyNav()
		businessVerticalConfigPage.clickSubMenu('Business vertical')
		businessVerticalConfigPage.clickActionsBtn('Name', verticalName)
		businessVerticalConfigPage.clickActivateBtn()
		adminCustomers.confirmDeactivation('Are you sure you want to activate this vertical?')
		adminCustomers.verifySuccessModal('You have successfully activated this vertical')
		productConfigPage.verifyColumnContent(verticalName, 'Status', 'ACTIVE', true)
	})

	it('Search business vertical by name', () => {
		productConfigPage.clickConfigurationNav()
		companyCategoryConfigPage.clickCompanyNav()
		businessVerticalConfigPage.clickSubMenu('Business vertical')
		cy.wait(500)
		adminCustomers.searchListingTable(verticalName)
		businessVerticalConfigPage.verifyBusinessVerticalExists('Name', verticalName).then((exists) => {
			if (exists) {
				cy.log(`${verticalName} exists.`)
			} else {
				cy.log(`${verticalName} does not exist.`)
			}
		})
	})
})
