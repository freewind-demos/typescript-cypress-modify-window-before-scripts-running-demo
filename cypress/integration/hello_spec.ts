import './declarations';

describe('cypress', () => {

  it('can modify window object before other loaded javascript code running', () => {
    cy.visit({
      url: 'public/index.html',
      onBeforeLoad(win: Window): void {
        console.log(win.featureToggles);

        // Notice:
        // we only define `get`, so other places to call `window.featureToggles.toggle1 = ...` will have no effect
        Object.defineProperty(win, 'featureToggles', {
          get: () => {
            return {
              'toggle1': true
            }
          }
        })

        console.log(win.featureToggles);
      },
    })
    cy.get('#main').should('have.text', 'Hello, toggle1 enabled!');
  })

})
