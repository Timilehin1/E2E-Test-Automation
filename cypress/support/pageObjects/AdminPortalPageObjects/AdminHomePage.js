///<reference types ="Cypress"/>
const menuIcon = 'mat-icon[data-mat-icon-name="icon_menu"]'
const loginBtn = 'button[data-rms-testid="login-btn"]'
const userprofile = 'div[class="flex-auto flex flex-row gap-2 items-center"]'
const logoutBtn = '.rounded-xl > .mdc-button__label > .flex > .font-bold'
const logoutIcon = '.mdc-icon-button > .mat-mdc-button-touch-target'

class AdminHomePage {
	viewUserProfile() {
		cy.get(userprofile).should('be.visible')
	}
	clickLogout() {
		cy.get(logoutIcon).should('be.visible').click()
		cy.contains(logoutBtn, 'Log Out').click()
	}
	clickMenuIcon() {
		cy.get(menuIcon).should('exist').click({ force: true })
	}
	verifyLogout() {
		cy.get(loginBtn).should('exist')
	}
}
export const adminHomePage = new AdminHomePage()
