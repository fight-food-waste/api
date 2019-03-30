module.exports = {
    ops: {
        interval: 1000,
    },
    // https://github.com/hapijs/good/blob/master/API.md#reporter-interface
    reporters: {
        myConsoleReporter: [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*' }],
            },
            {
                module: 'good-console',
            },
            'stdout',
        ],
    },
};
