///<reference types ="Cypress"/>

const categoryTab = 'a[routerlinkactive="bg-primary-100"]'
const categoryListTable = 'table[data-amp-testid="product-categories-list-table"]'
const createCategoryBtn = 'button[data-amp-testid="create-product__category"]'
const categoryName = '#name'
const categoryCode = '#code'
const categorydescription = '#description'
const isVatable = '#isVatable'
const fileUploadInput = 'a[class="text-sm font-medium cursor-pointer"]'
const createCategory = '.justify-center > .mdc-button > .mdc-button__label > .flex > .text-sm'
const addSubCategoryBtn = 'span[class="mdc-button__label"]'
const subCategoryName = '#subCategoryName'
const categoryActionsBtn = 'button[data-amp-testid="product-category-action-btn"]'
const editBtn = '[data-amp-testid="edit-category-button"]'
const editCategoryBtn = '.mdc-button__label'
const activateDiscountBtn = '#mat-mdc-slide-toggle-1'
const discountField = 'input[formcontrolname="discount_percent"]'
const deleteSubcategory = '[data-mat-icon-name="icon_delete"]'
const subCategoryInput = '.flex.ng-invalid > .w-full > .flex-col > #subCategoryName'
const deactivateBtn = '[data-amp-testid="deactivate-category-button"]'
const activateBtn = '[data-amp-testid="activate-category-button"]'

class ProductCategoryPage {
	clickCategoryTab() {
		cy.get(categoryTab).contains('Category').click()
	}
	verifyCategoryExists(uomName) {
		return cy.get(categoryListTable).then(($rows) => {
			// Check if the business name exists in any of the rows
			return Cypress._.some($rows, (row) => row.innerText.trim().includes(uomName))
		})
	}
	clickCreateCategoryCTA() {
		cy.get(createCategoryBtn).should('be.visible').click()
	}
	enterCategoryName(name) {
		cy.get(categoryName).should('be.visible').type(name)
	}
	enterCategoryCode(code) {
		cy.get(categoryCode).should('be.visible').type(code)
	}
	enterCategoryDescription(text) {
		cy.get(categorydescription).should('be.visible').clear().type(text)
	}
	selectIsVatable(option) {
		cy.get(isVatable).contains(option).click()
	}
	uploadFile(fileName) {
		cy.get(fileUploadInput).click()
		cy.get('input[type="file"]').should('exist').attachFile(fileName)
	}
	clickAddSubcategory() {
		cy.get(addSubCategoryBtn).contains('Add sub category').click()
	}
	enterSubcategoryName(name) {
		cy.get(subCategoryName).parent() // Navigate to the parent container if needed
		cy.get(subCategoryInput).scrollIntoView().type(name)
	}

	editSubcategoryName(name) {
		cy.get(subCategoryName).scrollIntoView().clear().type(name)
	}

	clickCreateCategory() {
		cy.get(createCategory).contains('Create category').click()
	}
	clickActionsBtn(columnName, categoryName) {
		cy.get(categoryListTable)
			.find(`.mat-mdc-cell.mat-column-${columnName.toLowerCase()}`)
			.contains(categoryName)
			.parents('tr')
			.within(() => {
				cy.get(categoryActionsBtn).should('be.visible').click()
			})
	}
	clickEditBtn() {
		cy.get(editBtn).should('be.visible').click()
	}
	clickEditCategory() {
		cy.get(editCategoryBtn).contains('Edit category').click()
	}
	clickActivateDiscountBtn() {
		cy.get(activateDiscountBtn).scrollIntoView().should('be.visible').click()
	}
	enterDiscountValue(value) {
		cy.get(discountField).should('be.visible').clear().type(value)
	}
	clearDiscountValue() {
		cy.get(discountField).scrollIntoView().should('be.visible').clear()
	}
	validateDeactivatatedDiscount() {
		cy.get(discountField).should('not.exist')
	}
	clickDeleteSubcategory() {
		cy.get(subCategoryName).scrollIntoView()
		cy.get(deleteSubcategory).should('be.visible').last().click()
	}

	validatedDeletedSubcategory(subcategoryTitle) {
		cy.contains(subCategoryName, subcategoryTitle).should('not.exist')
	}
	clickDeactivateBtn() {
		cy.get(deactivateBtn).should('be.visible').click()
	}
	clickActivateBtn() {
		cy.get(activateBtn).should('be.visible').click()
	}
}

export const productCategoryPage = new ProductCategoryPage()
