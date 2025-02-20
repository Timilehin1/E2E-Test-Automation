///<reference types = "Cypress" />
const companyNav = '[data-amp-testid="sidenav-company"]'
const createCategoryCTA = '[data-amp-testid="create-company__category"]'
const categoryName = '#name'
const repaymentPeriod = '#repayment_period'
const categoryType = '#category_type'
const submitCategory = '[data-amp-testid="submit-category-setup-btn"]'
const editCompanyCategory = '[data-amp-testid="edit-category-button"]'
const companyCategoryTable = '[data-amp-testid="company-categories-list-table"]'
const compCategoryActionsBtn = '[data-amp-testid="company-category-action-btn"]'

class CompanyCategoryConfigPage {
	clickCompanyNav() {
		cy.get(companyNav).should('be.visible').click()
	}
	clickCreateCategory() {
		cy.get(createCategoryCTA).should('be.visible').click()
	}
	enterCategoryName(name) {
		cy.get(categoryName).should('be.visible').type(name)
	}
	enterRepaymentPeriod(value) {
		cy.get(repaymentPeriod).should('be.visible').clear().type(value)
	}
	selectCategoryType(options) {
		cy.get(categoryType).contains(options).click()
	}
	submitCompanyCategory() {
		cy.get(submitCategory).should('be.visible').click()
	}
	verifyCompanyCategoryExists(columnName, compCategoryName) {
		return cy
			.get(companyCategoryTable)
			.find(`.mat-mdc-cell.mat-column-${columnName.toLowerCase()}`)
			.then(($rows) => {
				// Check if the business name exists in any of the rows
				return Cypress._.some($rows, (row) => row.innerText.trim().includes(compCategoryName))
			})
	}
	clickActionsBtn(columnName, compCategoryName) {
		cy.get(companyCategoryTable)
			.find(`.mat-mdc-cell.mat-column-${columnName.toLowerCase()}`)
			.contains(compCategoryName)
			.parents('tr')
			.within(() => {
				cy.get(compCategoryActionsBtn).should('be.visible').click()
			})
	}
	clickEditCompanyCategory() {
		cy.get(editCompanyCategory).should('be.visible').click()
	}
}

export const companyCategoryConfigPage = new CompanyCategoryConfigPage()
