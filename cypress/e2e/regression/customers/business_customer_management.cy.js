///<reference types = "Cypress"/>
import users from '../../../fixtures/users.json'
import businessCustomers from '../../../fixtures/businessCustomers.json'
import { adminCustomers } from '../../../support/pageObjects/AdminPortalPageObjects/AdminCustomers'
import { customerInformationPage } from '../../../support/pageObjects/AdminPortalPageObjects/CustomerInformationPage'

const business = users.testAutomationUser.name
const companyId = users.testAutomationUser.code

describe('Manage business customers', () => {
	beforeEach('admin login', () => {
		cy.login()
	})

	it('Create a business if it does not exist', () => {
		adminCustomers.viewBusinessCustomers()
		adminCustomers.searchListingTable(businessCustomers.business1.businessName)
		cy.wait(2000)
		adminCustomers.checkBusinessExists(businessCustomers.business1.businessName).then((exists) => {
			if (exists) {
				cy.log(`${businessCustomers.business1.businessName} exists. Skipping creation.`)
				return
			} else {
				cy.log(`${businessCustomers.business1.businessName} does not exist. Proceeding to create.`)
				adminCustomers.clickCreateBusinessBtn()
				adminCustomers.enterFullName(businessCustomers.business1.fullName)
				adminCustomers.enterBusinessEmail(businessCustomers.business1.email)
				adminCustomers.enterBusinessPhoneNumber(businessCustomers.business1.phoneNumber)
				adminCustomers.enterBusinessName(businessCustomers.business1.businessName)
				adminCustomers.clickBusinesscategoryDrpdown()
				adminCustomers.selectBusinesscategory(businessCustomers.business1.businessType)
				adminCustomers.createBusiness()
				adminCustomers.verifySuccessModal('You have successfully created a business')
				adminCustomers.clickToViewBusinessExist(businessCustomers.business1.businessName)
			}
		})
	})

	it('Edit the business information successfully', () => {
		const createdBusiness = businessCustomers.business1.businessName
		const businessCategory = 'Procurement2'
		adminCustomers.viewBusinessCustomers()
		adminCustomers.searchListingTable(business)
		adminCustomers.clickToViewBusinessExist(createdBusiness)
		customerInformationPage.clickActionsBtn()
		customerInformationPage.clickEditBtn()
		adminCustomers.enterBusinessName(createdBusiness)
		adminCustomers.clickBusinesscategoryDrpdown()
		adminCustomers.selectBusinesscategory(businessCategory)
		customerInformationPage.editBusinessInformation()
		cy.visit(`/admin/customers/business`)
		adminCustomers.searchListingTable(business)
		adminCustomers.clickToViewBusinessExist(createdBusiness)
	})

	it('Search for a business by company name', () => {
		adminCustomers.viewBusinessCustomers()
		adminCustomers.searchListingTable(business)
		adminCustomers.clickToViewBusinessExist(business)
		customerInformationPage.viewAdminInfo(users.testAutomationUser)
	})

	it('Search for a business by company id', () => {
		adminCustomers.viewBusinessCustomers()
		adminCustomers.searchListingTable(companyId)
		adminCustomers.clickToViewBusinessExist(business)
		customerInformationPage.viewAdminInfo(users.testAutomationUser)
	})
	it('Deactivate the business successfully', () => {
		const status = 'INACTIVE'
		const createdBusiness = businessCustomers.business1.businessName
		adminCustomers.viewBusinessCustomers()
		adminCustomers.searchListingTable(createdBusiness)
		adminCustomers.clickBusinessOptions(createdBusiness)
		adminCustomers.clickDeactivateBtn()
		adminCustomers.confirmDeactivation('Are you sure you want to deactivate this business?')
		adminCustomers.verifySuccessModal('Business deactivated successfully')
		adminCustomers.validateBusinessStatus(createdBusiness, status)
	})
	it('Activate the business successfully', () => {
		const status = 'ACTIVE'
		const createdBusiness = businessCustomers.business1.businessName
		adminCustomers.viewBusinessCustomers()
		adminCustomers.searchListingTable(createdBusiness)
		adminCustomers.clickBusinessOptions(createdBusiness)
		adminCustomers.clickDeactivateBtn()
		adminCustomers.confirmDeactivation('Are you sure you want to activate this business?')
		adminCustomers.verifySuccessModal('Business activated successfully')
		adminCustomers.validateBusinessStatus(createdBusiness, status)
	})

	it('Filter business table business types', () => {
		adminCustomers.viewBusinessCustomers()
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Business Type')
		adminCustomers.clickApplyFilter()
		adminCustomers.filterByBusinessType(users.testAutomationUser.businessType.name)
		adminCustomers.clickToViewBusinessExist(business)
		customerInformationPage.viewAdminInfo(users.testAutomationUser)
	})
})
