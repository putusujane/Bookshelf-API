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
    handler: (request, h) => h.response(home).code(200),
  },

  // Jika akses menggunakan method lainnya pada path '/' (Home Page)
  {
    method: '*',
    path: '/',
    handler: (request, h) => h.response({ status: 'fail', message: 'Tidak bisa akses menggunakan method ini!' }).code(400),
  },

  // Jika akses method dan path lain
  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => h.response({ status: 'fail', message: 'Halaman tidak ditemukan!' }).code(404),
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
