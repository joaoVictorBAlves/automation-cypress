/// <reference types="cypress" />

// const expect = require('chai').expect;

export class OpenRoute {
    // LOGIN AND LOGOUT
    open(route) {
        cy.visit(`https://openrouteservice.org/${route || ""}`);
    }

    login(name, pass) {
        this._userName(name);
        this._password(pass);
        cy.get('.box-footer > :nth-child(1) > .layout > .flex > .btn > .btn__content').click()
    }

    logout(page) {
        cy.get('.has-icon > .btn__content').should("be.visible").click();
    }

    validateLogin(msg) {
        cy.contains(msg).should("exist");
    }

    validateLogout() {
        cy.url().should('include', '/login');
    }

    _userName(name) {
        if (name)
            cy.get(':nth-child(2) > .input-group__input > input').type(name);
    }

    _password(pass) {
        if (pass)
            cy.get('.input-group--append-icon > .input-group__input > input').type(pass)
    }

    // CRIAR ROTAS
    goToDirections() {
        cy.get(':nth-child(8) > .menu__activator > .app-btn-mh > .btn__content').click();
        cy.contains("API Interactive documentation ready").should("exist").then(() => {
            cy.get('#_v2_directions_profile_get > .resourceActions > .action > .authScheme > .authSchemeDescription').click();
        })
    }

    closeCookies() {
        cy.contains('We use cookies').should("exist").then(() => {
            cy.get('.cc-nb-okagree').click();
        });
    }

    setRoute(start, end) {
        if (start)
            cy.get(':nth-child(4) > .sm7 > .field-input > .input-group__input > input').clear().type(`${start[0]},${start[1]}`);
        else
            cy.get(':nth-child(4) > .sm7 > .field-input > .input-group__input > input').clear();
        if (end)
            cy.get(':nth-child(5) > .sm7 > .field-input > .input-group__input > input').clear().type(`${end[0]},${end[1]}`);
        else
            cy.get(':nth-child(5) > .sm7 > .field-input > .input-group__input > input').clear();

        cy.get(':nth-child(3) > .layout > .flex > .btn > .btn__content').click();
    };

    validateRoute(expected) {
        cy.get('.vue2leaflet-map').should(expected)
    }

    validateEmptyRouteFields() {
        cy.contains("(string) eg.: 8.681495,49.41461 required");
    }

    // PESQUISAR POR LOCAIS
    goToGeocodeLocale() {
        cy.get(':nth-child(8) > .menu__activator > .app-btn-mh > .btn__content').click();
        cy.contains("API Interactive documentation ready").should("exist").then(() => {
            cy.get('#_geocode_autocomplete_get > .resourceActions > .action > .authScheme > .authSchemeDescription').click();
        })
    }

    getLocale(placeName) {
        if (placeName)
            cy.get(':nth-child(4) > .sm7 > .field-input > .input-group__input > input').clear().type(placeName);
        else
            cy.get(':nth-child(4) > .sm7 > .field-input > .input-group__input > input').clear();
        cy.get(':nth-child(3) > .layout > .flex > .btn > .btn__content').click();
    }

    isEmptyMap() {
        cy.get('#call-result > div.box-content > div > div > div.tabs__bar.theme--light > div > div > div:nth-child(2) > a').click().then(() => {
            cy.contains('Rendering finished').should("exist").then(() => {
                cy.get('#call-result > div.box-content > div > div > div.tabs__bar.theme--light > div > div > div:nth-child(2) > a')
                    .click();
                cy.get('#call-result > div.box-content > div > div > div.tabs__items > div:nth-child(1) > div > span > span > span.json-tree-deeper > span:nth-child(3) > span > span.json-tree-row.json-tree-expando > span.json-tree-open')
                    .contains("[").should("exist");
                cy.get('#call-result > div.box-content > div > div > div.tabs__items > div:nth-child(1) > div > span > span > span.json-tree-deeper > span:nth-child(3) > span > span:nth-child(3) > span > span.json-tree-close')
                    .contains("]").should("exist");
            });
        });
    }
}