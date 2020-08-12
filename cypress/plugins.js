module.exports = (on, config) => {
    on('task', {
        async writeLevelArgsFile (args) {
            await require("./nodeOnly/writeLevelArgsFile").__nodeOnly__writeLevelArgsFile(args);
            return null;
        },
    })
};