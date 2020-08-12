export function requestPublishGameObjectResolvers()
{
    cy.window().then(x => {
        const anyWindow = x as any;
        if (!anyWindow.dev)
            anyWindow.dev = {};
        anyWindow.dev.discoverGameObjectResolvers = true;
    });
}