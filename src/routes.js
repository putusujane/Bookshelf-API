const { // Impor fungsi handler.js
  simpanBukuHandler,
  tampilkanSemuaBukuHandler,
  detailBukuHandler,
  ubahBukuHandler,
  hapusBukuHandler,
} = require('./handler');

const home = require('./home'); // Impor variabel home di home.js

const routes = [
  // Home Page
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      const response = h.response(home);
      response.code(200);
      response.type('text/html');
      response.header('X-Powered-By', 'NodeJS');
      return response;
    },
  },

  // Jika akses menggunakan method lainnya pada path '/' (Home Page)
  {
    method: '*',
    path: '/',
    handler: (request, h) => {
      const response = h.response({
        status: 'fail',
        message: 'Tidak bisa akses menggunakan method ini!',
      });
      response.code(400);
      response.type('application/json');
      response.header('X-Powered-By', 'NodeJS');
      return response;
    },
  },

  // Jika akses method dan path lain
  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => {
      const response = h.response({
        status: 'fail',
        message: 'Halaman tidak ditemukan!',
      });
      response.code(404);
      response.type('application/json');
      response.header('X-Powered-By', 'NodeJS');
      return response;
    },
  },

  // MENYIMPAN BUKU
  {
    method: 'POST',
    path: '/books',
    handler: simpanBukuHandler,
  },

  // MENAMPILKAN SEMUA BUKU
  {
    method: 'GET',
    path: '/books',
    handler: tampilkanSemuaBukuHandler,
  },

  // MENAMPILKAN DETAIL BUKU
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: detailBukuHandler,
  },

  // MENGUBAH DATA BUKU
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: ubahBukuHandler,
  },

  // MENGHAPUS BUKU
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: hapusBukuHandler,
  },
];

module.exports = routes; // Ekspor variabel routes.
