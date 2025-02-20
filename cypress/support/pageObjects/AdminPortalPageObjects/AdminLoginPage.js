/// <reference types = "Cypress"/>
const emailField = '#emailOrPhoneNumber'
const passwordField = '#password'
const loginBtn = 'button[data-rms-testid="login-btn"]'
const errorMessage = 'p.text-xs.text-error-700'
const loginSuccessPopup = '#mat-snack-bar-container-live-0'

class AdminLoginPage {
	enterEmail(email) {
		cy.get(emailField).should('be.visible').type(email)
	}
	enterPassword(password) {
		cy.get(passwordField).should('be.visible').type(password)
	}
	clickLogin() {
		cy.get(loginBtn).should('be.visible').click()
	}
	verifySuccessfulLogin() {
		cy.contains(loginSuccessPopup, 'Login Successful')
	}
	verifyUnsuccessfulLogin(errorText) {
		cy.get(errorMessage).should('contain.text', errorText)
	}
}
export const adminLoginPage = new AdminLoginPage()
