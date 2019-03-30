const Hapi = require('hapi');
const good = require('good');
const goodConfig = require('./config/good');
const routes = require('./routes');

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
});

server.route(routes);

const init = async () => {
    await server.register({
        plugin: good,
        options: goodConfig,
    });

    await server.start();
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
