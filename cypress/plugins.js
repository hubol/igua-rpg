module.exports = (on, config) => {
    on('task', {
        async writeLevelArgsFile (args) {
            await require("./node-only/writeLevelArgsFile").__nodeOnly__writeLevelArgsFile(args);
            return null;
        },
    })
};