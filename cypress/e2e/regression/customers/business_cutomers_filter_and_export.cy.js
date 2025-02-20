///<reference types ='Cypress'/>
import { adminCustomers } from '../../../support/pageObjects/AdminPortalPageObjects/AdminCustomers'

describe('Business customers filter & export', () => {
	beforeEach('Visit url', () => {
		cy.login()
	})

	it('Filter business table by inactive status', () => {
		adminCustomers.viewBusinessCustomers()
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Status')
		adminCustomers.clickApplyFilter()
		adminCustomers.filterByColumnAndVerify('INACTIVE', true)
	})
	it('Filter business table by active status', () => {
		adminCustomers.viewBusinessCustomers()
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Status')
		adminCustomers.clickApplyFilter()
		adminCustomers.filterByColumnAndVerify('ACTIVE', true)
	})

	it('Export business list', () => {
		adminCustomers.viewBusinessCustomers()
		adminCustomers.exportBusinessCustomers()
	})
})
