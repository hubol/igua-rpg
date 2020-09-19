export const environment = {
    get isProduction()
    {
        return process.env.NODE_ENV === "production";
    }
};