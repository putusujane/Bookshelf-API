const { nanoid } = require('nanoid'); // Impor module pihak ketiga nanoid versi 3.3.4

const books = require('./books'); // Impor module lokal books.js
// ==================================================

// MENYIMPAN BUKU
const simpanBukuHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // Kondisi jika tidak melampirkan nama buku.
  if (name === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  // Kondisi nilai readPage lebih dari nilai pageCount.
  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  // Kondisi apakah buku selesai dibaca atau belum.
  const finished = (readPage === pageCount);

  // nanoid
  const id = nanoid(10);

  // Tanggal ditambahkan (insertedAt) dan diperbarui (updatedAt) buku.
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    }).code(201);
  }

  // Jika gagal Memasukkan buku
  return h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  }).code(500);
};
// ==================================================

// MENAMPILKAN SEMUA BUKU
const tampilkanSemuaBukuHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let filterBooks = books;

  // Kueri name
  if (name !== undefined) {
    // eslint-disable-next-line max-len
    filterBooks = filterBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  // Kueri reading
  if (reading !== undefined) {
    filterBooks = filterBooks.filter((book) => book.reading === !!Number(reading));
  }

  // Kueri finished
  if (finished !== undefined) {
    filterBooks = filterBooks.filter((book) => book.finished === !!Number(finished));
  }

  return h.response({
    status: 'success',
    data: {
      books: filterBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  }).code(200);
};
// ==================================================

// MENAMPILKAN DETAIL BUKU
const detailBukuHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((n) => n.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
};
// ==================================================

// MENGUBAH DATA BUKU
const ubahBukuHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    if (name === undefined) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      }).code(400);
    }

    if (readPage > pageCount) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400);
    }

    const finished = (readPage === pageCount);

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
};
// ==================================================

// MENGHAPUS BUKU
const hapusBukuHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);

    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
};

module.exports = { // Ekspor handler.
  simpanBukuHandler,
  tampilkanSemuaBukuHandler,
  detailBukuHandler,
  ubahBukuHandler,
  hapusBukuHandler,
};
