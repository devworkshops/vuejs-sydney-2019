describe('Suppliers', () => {
    beforeEach(() => {
        cy.visit('/suppliers')
        cy.contains('h1', 'Suppliers')
    })

    it('Should open list of suppliers', () => {
        cy.get('table thead th').should('have.length', 4)
    })

    it('Should have 29 suppliers', () => {
        cy.get('table tbody tr').should('have.length', 29)
    })

    it('Should update existing supplier', () => {
        cy.get('table tbody tr:first button:first').click()
        cy.contains('h1', 'Supplier #')
        cy.get('input#companyNameField').type('NEW COMPANY')
        cy.get('button#saveButton').click()

        cy.get('table tbody td:first').should($td => {
            expect($td).to.contain('NEW COMPANY')
        })
    })

    it('Should create new supplier', () => {
        cy.get('button#addSupplier').click()
        cy.get('input#companyNameField').type('NEW COMPANY')
        cy.get('input#contactNameField').type('NEW CONTACT')
        cy.get('input#contactTitleField').type('CONTACT TITLE')
        cy.get('button#saveButton').click()
        cy.get('table tbody tr:last td:first').should($td => {
            expect($td).to.contain('NEW COMPANY')
        })
    })
})
