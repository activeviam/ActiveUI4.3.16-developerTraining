describe('dashboards drawers', () => {
  it('opens and closes the dashboards drawer', () => {
    // Login to the app
    cy.login();

    // Go to the app
    cy.visit('./', {qs: {url: Cypress.env('SERVER_URL')}});

    // There should be initially no tooltip
    cy.get('.ant-tooltip').should('not.exist');

    // Drawer is initially closed
    cy.get('[data-testid="ActiveDrawer:dashboards"]').should('not.exist');

    // Hover on icon
    cy.get('.ant-menu-vertical').within(() => {
      cy.get('[data-testid="DrawersBar:dashboards"]').trigger('mouseover');
    });

    // We see the tooltip
    cy.get('.ant-tooltip').should('contain', 'Dashboards (Alt+D)');

    // Click the icon
    cy.get('.ant-menu-vertical').within(() => {
      cy.get(`[data-testid="DrawersBar:dashboards"]`).click();
    });

    // We don't see any tooltip anymore
    cy.get('.ant-tooltip').should('be.hidden');

    // Drawer is open
    cy.get(`[data-testid="ActiveDrawer:dashboards"]`).should('exist');

    // Click the icon
    cy.get('.ant-menu-vertical').within(() => {
      cy.get(`[data-testid="DrawersBar:dashboards"]`).click();
    });

    // Drawer is closed
    cy.get(`[data-testid="ActiveDrawer:dashboards"]`).should('not.exist');
  });
});
