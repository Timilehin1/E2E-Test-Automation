///<reference types ="Cypress"/>

import { adminCustomers } from '../../../support/pageObjects/AdminPortalPageObjects/AdminCustomers'
import { productConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/ProductConfigPage'
import { locationConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/LocationConfigPage'
import { cityConfigPage } from '../../../support/pageObjects/AdminPortalPageObjects/CityConfigPage'

describe('City filter actions', () => {
	beforeEach('Visit url', () => {
		cy.login()
	})

	it('Filter city by active status', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		cityConfigPage.clickViewCity()
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Status')
		adminCustomers.clickApplyFilter()
		adminCustomers.filterByColumnAndVerify('active', true)
	})

	it('Filter city by inactive status', () => {
		productConfigPage.clickConfigurationNav()
		locationConfigPage.clickLocationNav()
		cityConfigPage.clickViewCity()
		adminCustomers.clickOnFilterBtn()
		adminCustomers.chooseFilterOption('Status')
		adminCustomers.clickApplyFilter()
		adminCustomers.filterByColumnAndVerify('inactive', true)
	})
})
