///<reference types ="Cypress"/>

const configurationNav = 'div[data-amp-testid="sidenav-configuration"]'
const productConfigNav = 'div[data-amp-testid="sidenav-product-configuration"]'
const uomListingTable = 'table[data-amp-testid="product-uoms-list-table"]'
const uomRow = '.mat-mdc-row'
const createUomBtn = 'button[data-amp-testid="create-product__UOM"]'
const uomTitle = '#title'
const uomCode = '#code'
const uomDescription = '#description'
const uomMode = '#mode'
const proceedBtn = 'button[data-amp-testid="submit-UOM-setup-btn"]'
const editUomBtn = 'button[data-amp-testid="edit-uom-button"]'
const uomActionsBtn = 'button[data-amp-testid="product-uoms-action-btn"]'
const activateUomBtn = 'button[data-amp-testid="activate-uom-button"]'

class ProductConfigPage {
	clickConfigurationNav() {
		cy.get(configurationNav).should('be.visible').click()
	}
	clickProductConfigNav() {
		cy.get(productConfigNav).should('be.visible').click()
	}
	verifyUomExists(columnName, uomName) {
		return cy
			.get(uomListingTable)
			.find(`.mat-mdc-cell.mat-column-${columnName.toLowerCase()}`)
			.then(($rows) => {
				// Check if the business name exists in any of the rows
				return Cypress._.some($rows, (row) => row.innerText.trim().includes(uomName))
			})
	}
	clickCreateUom() {
		cy.get(createUomBtn).should('be.visible').click()
	}
	enterUomTitle(title) {
		cy.get(uomTitle).should('be.visible').type(title)
	}
	enterUomCode(code) {
		cy.get(uomCode).should('be.visible').type(code)
	}
	enterUomDescription(content) {
		cy.get(uomDescription).should('be.visible').type(content)
	}
	selectUomMode(mode) {
		cy.get(uomMode).should('contain.text', mode).click()
	}
	clickProceedBtn() {
		cy.get(proceedBtn).should('be.visible').click()
	}

	deactivateUom() {
		cy.get(activateUomBtn).should('exist').click()
	}
	clickActionsBtn(columnName, uomName) {
		cy.get(uomListingTable)
			.find(`.mat-mdc-cell.mat-column-${columnName.toLowerCase()}`)
			.contains(uomName)
			.parents('tr')
			.within(() => {
				cy.get(uomActionsBtn).should('be.visible').click()
			})
	}

	verifyColumnContent(uomName, columnName, keyword, shouldContain = true) {
		cy.get(uomRow)
			.contains(uomName) // Find the row containing the specific `uomName`
			.closest(uomRow) // Ensure we are working with the correct row
			.within(() => {
				cy.get(`.mat-column-${columnName.toLowerCase()}`) // Target the specific column within this row
					.should(shouldContain ? 'have.text' : 'not.have.text', keyword) // Assert the column's content
			})
	}

	clickEditUom() {
		cy.get(editUomBtn).should('exist').click()
	}
}
export const productConfigPage = new ProductConfigPage()
