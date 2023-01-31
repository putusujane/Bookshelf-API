const Hapi = require('@hapi/hapi'); // Impor modul pihak ketiga @hapi/hapi
const routes = require('./routes'); // impor modul lokal routes.js

// Fungsi init
const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',

    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // Response nilai "type" dan "header" otomatis
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    if (!response.headers['Content-Type'] || !response.headers['X-Powered-By']) {
      response.type('application/json');
      response.header('X-Powered-By', 'Hapi');
      response.header('X-Author', 'Putu-Sujane');
    }

    return h.continue;
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
