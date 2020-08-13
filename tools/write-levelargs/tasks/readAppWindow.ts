export function readAppWindow<T>(shape: T, consumer: (t: T) => void)
{
    for (const key in shape)
    {
        cy.window().should("have.property", key);
    }
    return cy.window().then(consumer as any);
}