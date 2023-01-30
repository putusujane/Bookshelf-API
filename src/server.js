const Hapi = require('@hapi/hapi');
const routes = require('./routes');

// Fungsi init
const init = async () => {
  const server = Hapi.server({
    port: 9_000,
    host: 'localhost',

    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server is ON >> ${server.info.uri}`);
};

init();
