///<reference types ="Cypress"/>

const createVerticalCTA = '[data-amp-testid="create-business__verticals"]'
const subMenu = '[data-amp-testid="business-sales-orders"]'
const verticalName = '#name'
const description = '#description'
const assignOrder = '#assign_order'
const submitVertical = '[data-amp-testid="submit-vertical-setup-btn"]'
const editVerticalsBtn = '[data-amp-testid="edit-vertical-button"]'
const verticalsTable = '[data-amp-testid="business-verticals-list-table"]'
const verticalsActionsBtn = '[data-amp-testid="business-vertical-action-btn"]'
const deactivateBtn = '[data-amp-testid="deactivate-vertical-button"]'
const activateBtn = '[data-amp-testid="activate-vertical-button"]'

class BusinessVerticalConfigPage {
	clickSubMenu(menuName) {
		cy.get(subMenu).contains(menuName).click()
	}
	clickCreateBusinessVertical() {
		cy.get(createVerticalCTA).should('be.visible').click()
	}
	enterVerticalName(name) {
		cy.get(verticalName).should('be.visible').type(name)
	}
	enterDescription(text) {
		cy.get(description).should('be.visible').clear().type(text)
	}
	automaticallyAssignOrder(options) {
		cy.get(assignOrder).contains(options).click()
	}
	submitBusinessVertical() {
		cy.get(submitVertical).should('be.visible').click()
	}
	verifyBusinessVerticalExists(columnName, verticalName) {
		return cy
			.get(verticalsTable)
			.find(`.mat-mdc-cell.mat-column-${columnName.toLowerCase()}`)
			.then(($rows) => {
				// Check if the business name exists in any of the rows
				return Cypress._.some($rows, (row) => row.innerText.trim().includes(verticalName))
			})
	}
	clickActionsBtn(columnName, verticalName) {
		cy.get(verticalsTable)
			.find(`.mat-mdc-cell.mat-column-${columnName.toLowerCase()}`)
			.contains(verticalName)
			.parents('tr')
			.within(() => {
				cy.get(verticalsActionsBtn).should('be.visible').click()
			})
	}
	clickEditBusinessVertical() {
		cy.get(editVerticalsBtn).should('be.visible').click()
	}
	clickDeactivateBtn() {
		cy.get(deactivateBtn).should('be.visible').click()
	}
	clickActivateBtn() {
		cy.get(activateBtn).should('be.visible').click()
	}
}

export const businessVerticalConfigPage = new BusinessVerticalConfigPage()
