describe("Let's generate the levels", () => {
    it("Visit", () => {
        cy.visit("http://localhost:2456");
    })
    it("Wait for gameObjectResolvers to be in localStorage", async () => {
        await waitUntilTruthy(() => localStorage.getItem("gameObjectResolvers"));
    })
})

async function waitUntilTruthy(predicate)
{
    let value;
    while (!(value = predicate()))
        await sleep(33);

    return value;
}

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms))
}