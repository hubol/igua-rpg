module.exports = (on, config) => {
    on('task', {
        // deconstruct the individual properties
        getAllFiles (directoryPath) {
            return require("pissant-node").getAllFiles(directoryPath);;
        },
        async writeLevelArgsFile (args) {
            await require("./nodeOnlyWriteLevelArgsFile").__nodeOnly__writeLevelArgsFile(args);
            return null;
        },
    })
};