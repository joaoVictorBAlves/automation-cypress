import { OpenRoute } from "../page-object/open-route"
const openroute = new OpenRoute();

describe('Login', () => {
    beforeEach(() => {
        openroute.open('dev/#/login');
        openroute.closeCookies();
    });
    context('Successful Login', () => {
        afterEach(() => {
            openroute.validateLogin('Dev dashboard');
        })
        it('should log in successfully with valid username and password', () => {
            // Testa o login com um nome de usuário válido e senha 
            openroute.login("joaovba.dev", "teste1234");
        });

        it('should log in successfully with valid email and password', () => {
            // Testa o login com um email válido e senha válida
            openroute.login("joaovba.dev@gmail.com", "teste1234");
        });
    });

    context('Failed Login', () => {
        it('should fail to log in with invalid username or email', () => {
            // Testa o login com um nome de usuário ou email inválido
            openroute.login("jooa@gmail.com.br", "teste1234");
            openroute.validateLogin("Unknown email address. Check again or try your username.");
        });

        it('should fail to log in with incorrect password', () => {
            // Testa o login com uma senha incorreta
            const email = "joaovba.dev@gmail.com";
            openroute.login(email, "123456");
            openroute.validateLogin(`Error: The password you entered for the email address ${email} is incorrect. Lost your password?`);
        });

        it('should fail to log in with empty username or email field', () => {
            // Testa o login com o campo de nome de usuário ou email vazio
            openroute.login("", "teste1234");
            openroute.validateLogin("Invalid credentials");
        });

        it('should fail to log in with empty password field', () => {
            // Testa o login com o campo de senha vazio
            openroute.login("joaovba.dev@gmail.com", "");
            openroute.validateLogin("Invalid credentials");
            openroute.validateLogin("Password is required");
        });
    });
});

describe('Route Generation', () => {
    before(() => {
        openroute.open('dev/#/login');
        openroute.login("joaovba.dev", "teste1234");
    });
    describe('Success Route', () => {
        it('should generate a route with valid start and destination coordinates', () => {
            cy.contains("Dev dashboard").should("exist").then(() => {
                openroute.closeCookies();
                openroute.goToDirections();
            });
            openroute.setRoute([-122.4194, 37.7749], [-118.2437, 34.0522]);
            openroute.validateRoute("exist");
        });
    });

    describe('Failure Route', () => {
        it('should display an error message for invalid start coordinates', () => {
            openroute.setRoute([-190.5678, 91.1234], [-118.2437, 34.0522]);
            openroute.validateRoute("not.exist");
        });

        it('should display an error message for invalid destination coordinates', () => {
            openroute.setRoute([-122.4194, 37.7749], [200.9876, -100.4321]);
            openroute.validateRoute("not.exist");
        });

        it('should display an error message for unspecified start and destination', () => {
            openroute.setRoute(null, [-118.2437, 34.0522]);
            openroute.validateEmptyRouteFields();
        });
    });
});

describe("Logout", () => {
    before(() => {
        openroute.open('dev/#/login');
        openroute.login("joaovba.dev", "teste1234");
        openroute.closeCookies();
    })
    it("Logout should work", () => {
        openroute.logout();
        openroute.validateLogout();
    });
});

describe('API Location Search', () => {
    before(() => {
        openroute.open('dev/#/login');
        openroute.login("joaovba.dev", "teste1234");
    });
    it('should return results for valid text input', () => {
        cy.contains("Dev dashboard").should("exist").then(() => {
            openroute.closeCookies();
            openroute.goToGeocodeLocale();
        });
        openroute.getLocale("Uruburetama, Ceará");
        openroute.validateRoute("exist");
    });

    it('should return results for valid text input', () => {
        openroute.getLocale("Urub");
        openroute.validateRoute("exist");
    });

    it('should return no results for invalid text inputs', () => {
        openroute.getLocale("InvalidText");
        openroute.isEmptyMap();
    });

    it('should handle missing inputs gracefully', () => {
        openroute.getLocale("");
    });
});




