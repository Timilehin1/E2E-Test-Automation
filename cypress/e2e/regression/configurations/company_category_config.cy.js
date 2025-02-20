///<reference types="Cypress"/>

import { companyCategoryConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/CompanyCategoryConfigPage'
import { productCategoryPage } from '../../../support/pageObjects/AdminPortalPageObjects/ProductCategoryConfigPage'
import { productConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/ProductConfigPage'
import configs from '../../../fixtures/configs.json'
import { adminCustomers } from '../../../support/pageObjects/AdminPortalPageObjects/AdminCustomers'

describe('Company category configurations', () => {
	beforeEach('login', () => {
		cy.login()
	})

	const categoryName = configs.companyCategory.name
	it('Create company category', () => {
		productConfigPage.clickConfigurationNav()
		companyCategoryConfigPage.clickCompanyNav()
		adminCustomers.searchListingTable(categoryName)
		cy.wait(1000)
		adminCustomers.checkBusinessExists(categoryName).then((exists) => {
			if (exists) {
				cy.log(`${categoryName} already exists. Skipping creation`)
				return
			} else {
				cy.log(`${categoryName} does not exists. Create company category`)
				companyCategoryConfigPage.clickCreateCategory()
				companyCategoryConfigPage.enterCategoryName(categoryName)
				companyCategoryConfigPage.enterRepaymentPeriod(configs.companyCategory.creditTenure)
				companyCategoryConfigPage.selectCategoryType(configs.companyCategory.type)
				companyCategoryConfigPage.submitCompanyCategory()
				adminCustomers.verifySuccessModal('You have successfully created a category')
				companyCategoryConfigPage
					.verifyCompanyCategoryExists('Name', categoryName)
					.then((exists) => {
						if (exists) {
							cy.log(`${categoryName} exists. Company category created sucessfully`)
						} else {
							cy.log(`${categoryName} does not exist. Company category creation unsucessful`)
						}
					})
			}
		})
	})

	it('Edit company category', () => {
		productConfigPage.clickConfigurationNav()
		companyCategoryConfigPage.clickCompanyNav()
		companyCategoryConfigPage.clickActionsBtn('Name', categoryName)
		companyCategoryConfigPage.clickEditCompanyCategory()
		companyCategoryConfigPage.enterRepaymentPeriod(configs.companyCategory2.creditTenure)
		companyCategoryConfigPage.selectCategoryType(configs.companyCategory2.type)
		companyCategoryConfigPage.submitCompanyCategory()
		adminCustomers.verifySuccessModal('You have successfully edited a category')
	})

	it('Deactivate company category', () => {
		productConfigPage.clickConfigurationNav()
		companyCategoryConfigPage.clickCompanyNav()
		companyCategoryConfigPage.clickActionsBtn('Name', categoryName)
		productCategoryPage.clickDeactivateBtn()
		adminCustomers.confirmDeactivation('Are you sure you want to deactivate this category?')
		adminCustomers.verifySuccessModal('You have successfully deactivated this category')
		productConfigPage.verifyColumnContent(categoryName, 'Status', 'inactive', true)
	})

	it('Activate company category', () => {
		productConfigPage.clickConfigurationNav()
		companyCategoryConfigPage.clickCompanyNav()
		companyCategoryConfigPage.clickActionsBtn('Name', categoryName)
		productCategoryPage.clickActivateBtn()
		adminCustomers.confirmDeactivation('Are you sure you want to activate this category?')
		adminCustomers.verifySuccessModal('You have successfully activated this category')
		productConfigPage.verifyColumnContent(categoryName, 'Status', 'active', true)
	})

	it('Search company category by name', () => {
		productConfigPage.clickConfigurationNav()
		companyCategoryConfigPage.clickCompanyNav()
		adminCustomers.searchListingTable(categoryName)
		companyCategoryConfigPage.verifyCompanyCategoryExists('Name', categoryName).then((exists) => {
			if (exists) {
				cy.log(`${categoryName} exists.`)
			} else {
				cy.log(`${categoryName} does not exist.`)
			}
		})
	})
})
