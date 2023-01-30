const Hapi = require('@hapi/hapi'); // Impor modul pihak ketiga @hapi/hapi
const routes = require('./routes'); // impor modul loka routes.js

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

process.on('unhandledRejection', ((error) => {
  console.log(error);
  process.exit(1);
}));

init();
