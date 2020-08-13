export function requestPublishGameObjectResolvers()
{
    cy.window().then(x => (x as any).__publishGameObjectResolversIsRequested = true);
}