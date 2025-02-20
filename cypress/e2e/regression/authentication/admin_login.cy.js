///<reference types="Cypress"/>

import { adminLoginPage } from '../../../support/pageObjects/AdminPortalPageObjects/AdminLoginPage'
import { adminHomePage } from '../../../support/pageObjects/AdminPortalPageObjects/AdminHomePage'

const getUsersByEnvironment = () => {
	const env = Cypress.env('environment') || 'dev' // Default to 'dev' if environment is not set
	const userMapping = {
		dev: Cypress.env('DEV_USER'),
		staging: Cypress.env('STAGING_USER'),
		prod: Cypress.env('PROD_USER'),
	}
	return userMapping[env]
}

describe('Admin Login', () => {
	let adminusers

	beforeEach('Visit url', () => {
		adminusers = getUsersByEnvironment()
		expect(adminusers).to.exist // Ensure the users object is loaded
		cy.visit('/')
	})

	it('Verify admin is unable to login with invalid email', () => {
		adminLoginPage.enterEmail(adminusers.invalidEmail)
		adminLoginPage.enterPassword(adminusers.password)
		adminLoginPage.clickLogin()
		adminLoginPage.verifyUnsuccessfulLogin('Incorrect [email/phonenumber]/password')
	})

	it('Verify Admin is unable to login with wrong password but correct username', () => {
		adminLoginPage.enterEmail(adminusers.emailOrPhoneNumber)
		adminLoginPage.enterPassword(adminusers.invalidPassword)
		adminLoginPage.clickLogin()
		adminLoginPage.verifyUnsuccessfulLogin('password is invalid')
	})

	it('Login with valid credentails', () => {
		adminLoginPage.enterEmail(adminusers.emailOrPhoneNumber)
		adminLoginPage.enterPassword(adminusers.password)
		adminLoginPage.clickLogin()
		adminLoginPage.verifySuccessfulLogin()
	})

	it('Verify admin is able to logout', () => {
		adminLoginPage.enterEmail(adminusers.emailOrPhoneNumber)
		adminLoginPage.enterPassword(adminusers.password)
		adminLoginPage.clickLogin()
		adminLoginPage.verifySuccessfulLogin()
		adminHomePage.clickMenuIcon()
		adminHomePage.clickLogout()
		adminHomePage.verifyLogout()
	})
})
