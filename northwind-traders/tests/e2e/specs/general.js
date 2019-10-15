describe('General', () => {
    it('404 route should kick off', () => {
        cy.visit('/non-existing-route')
        cy.contains('h1', 'Oops')
    })

    it('home page shows welcome', () => {
        cy.visit('/')
        cy.contains('h1', 'Welcome')
    })
})