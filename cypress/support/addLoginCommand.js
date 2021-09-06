let token;

const setToken = () =>
  cy.window({log: false}).then((window) => {
    window.localStorage.setItem('activeui-auth-full', JSON.stringify(token));
    window.localStorage.setItem('activeui-auth-login', 'admin');
  });

/**
 * This custom cypress command logs into an AcitvePivot server by making an HTTP request.
 * Then it stores the login token in the local storage of the browser,
 * so that the browser knows we're already logged in when future calls to cy.login() are be made.
 */
Cypress.Commands.add('login', () => {
  if (token) {
    return setToken();
  } else {
    Cypress.log({
      name: 'LOGIN',
    });
    return cy
      .request({
        url: `${Cypress.env('SERVER_URL')}/jwt/rest/v1/token`,
        headers: {
          // https://stackoverflow.com/a/23097961
          Authorization: `Basic ${Buffer.from(
            `${Cypress.env('USERNAME')}:${Cypress.env('PASSWORD')}`,
          ).toString('base64')}`,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(
            `Authentication failed: ${response.status} - ${response.statusText}`,
          );
        }
        token = response.body.data.token;
        return setToken();
      });
  }
});
