///<reference types ="Cypress"/>

import { productCategoryPage } from '../../../support/pageObjects/AdminPortalPageObjects/ProductCategoryConfigPage'
import { productConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/ProductConfigPage'
import configs from '../../../fixtures/configs.json'
import { adminCustomers } from '../../../support/pageObjects/AdminPortalPageObjects/AdminCustomers'

describe('Product category configurations', () => {
	beforeEach('login', () => {
		cy.login()
	})
	const filePath = 'agroImage.png'
	const filepath2 = 'automationIcon.png'

	it('Create product category', () => {
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		productCategoryPage.clickCategoryTab()
		cy.wait(1000)
		adminCustomers.searchListingTable(configs.category.name)
		adminCustomers.checkBusinessExists(configs.category.name).then((exists) => {
			if (exists) {
				cy.log(`${configs.category.name} already exists. Skip creation`)
				return
			} else {
				cy.log(`${configs.category.name} does not exist. Create a new category`)
				productCategoryPage.clickCreateCategoryCTA()
				productCategoryPage.enterCategoryName(configs.category.name)
				productCategoryPage.enterCategoryCode(configs.category.code)
				productCategoryPage.enterCategoryDescription(configs.category.description)
				productCategoryPage.selectIsVatable(configs.category.isVatable)
				productCategoryPage.uploadFile(filePath)
				productCategoryPage.clickAddSubcategory()
				productCategoryPage.enterSubcategoryName(configs.category.subCategories[0].name)
				productCategoryPage.clickCreateCategory()
				adminCustomers.verifySuccessModal('You have successfully created this category')
				productCategoryPage.verifyCategoryExists('Name', configs.category.name).then((exists) => {
					if (exists) {
						cy.log(`${configs.category.name} exists. Category created sucessfully`)
					} else {
						cy.log(`${configs.category.name} does not exist. Category creation unsucessful`)
					}
				})
			}
		})
	})

	it('Edit a category', () => {
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		productCategoryPage.clickCategoryTab()
		productCategoryPage.clickActionsBtn('Name', configs.category.name)
		productCategoryPage.clickEditBtn()
		productCategoryPage.enterCategoryDescription(`Edited ${configs.category.description}`)
		productCategoryPage.selectIsVatable(configs.category2.isVatable)
		productCategoryPage.uploadFile(filepath2)
		productCategoryPage.editSubcategoryName(configs.category.subCategories[2].name)
		productCategoryPage.clickEditCategory()
		adminCustomers.verifySuccessModal('You have successfully edited this category')
	})

	it('Add Subcategory', () => {
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		productCategoryPage.clickCategoryTab()
		productCategoryPage.clickActionsBtn('Name', configs.category.name)
		productCategoryPage.clickEditBtn()
		productCategoryPage.clickAddSubcategory()
		productCategoryPage.enterSubcategoryName(configs.category.subCategories[1].name)
		productCategoryPage.clickEditCategory()
		adminCustomers.verifySuccessModal('You have successfully edited this category')
	})

	it('Activate discount for a subcategory', () => {
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		productCategoryPage.clickCategoryTab()
		productCategoryPage.clickActionsBtn('Name', configs.category.name)
		productCategoryPage.clickEditBtn()
		productCategoryPage.clickActivateDiscountBtn()
		productCategoryPage.enterDiscountValue(500)
		productCategoryPage.clickEditCategory()
		adminCustomers.verifySuccessModal('You have successfully edited this category')
	})

	it('Deactivate discount for a subcategory', () => {
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		productCategoryPage.clickCategoryTab()
		productCategoryPage.clickActionsBtn('Name', configs.category.name)
		productCategoryPage.clickEditBtn()
		productCategoryPage.clearDiscountValue()
		productCategoryPage.clickActivateDiscountBtn()
		productCategoryPage.validateDeactivatatedDiscount()
		productCategoryPage.clickEditCategory()
		adminCustomers.verifySuccessModal('You have successfully edited this category')
	})

	it('Delete subcategory', () => {
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		productCategoryPage.clickCategoryTab()
		productCategoryPage.clickActionsBtn('Name', configs.category.name)
		productCategoryPage.clickEditBtn()
		productCategoryPage.clickDeleteSubcategory()
		productCategoryPage.validatedDeletedSubcategory(configs.category.subCategories[1].name)
		productCategoryPage.clickEditCategory()
		adminCustomers.verifySuccessModal('You have successfully edited this category')
	})

	it('Search for a category', () => {
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		productCategoryPage.clickCategoryTab()
		cy.wait(500)
		adminCustomers.searchListingTable(configs.category.name)
		productCategoryPage.verifyCategoryExists(configs.category.name).then((exists) => {
			if (exists) {
				cy.log(`${configs.category.name} exists.`)
			} else {
				cy.log(`${configs.category.name} does not exist.`)
			}
		})
	})

	it('Deactivate a category', () => {
		const categoryName = configs.category.name
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		productCategoryPage.clickCategoryTab()
		productCategoryPage.clickActionsBtn('Name', categoryName)
		productCategoryPage.clickDeactivateBtn()
		adminCustomers.confirmDeactivation('Are you sure you want to deactivate this category?')
		adminCustomers.verifySuccessModal('You have successfully deactivated this category')
		productConfigPage.verifyColumnContent(categoryName, 'Status', 'inactive', true)
	})
	it('Activate a category', () => {
		const categoryName = configs.category.name
		productConfigPage.clickConfigurationNav()
		productConfigPage.clickProductConfigNav()
		productCategoryPage.clickCategoryTab()
		productCategoryPage.clickActionsBtn('Name', categoryName)
		productCategoryPage.clickActivateBtn()
		adminCustomers.confirmDeactivation('Are you sure you want to activate this category?')
		adminCustomers.verifySuccessModal('You have successfully activated this category')
		productConfigPage.verifyColumnContent(categoryName, 'Status', 'active', true)
	})
})
