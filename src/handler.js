// Impor module pihak ketiga nanoid versi 3.3.4
const { nanoid } = require('nanoid');

// Impor module lokal books.js
const books = require('./books');
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
  if ((!name) || (name === undefined) || (name === null)) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku!',
    });
    response.code(400);
    return response;
  }

  // Kondisi nilai readPage lebih dari nilai pageCount.
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // Kondisi apakah buku selesai dibaca atau belum.
  const finished = (pageCount === readPage);

  // nanoid
  const id = nanoid(10);

  // Insert & Update
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
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  // Jika gagal Memasukkan buku
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};
// ==================================================

// MENAMPILKAN SELURUH BUKU
const tampilkanSeluruhBukuHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  // Name
  if (name !== undefined) {
    const booksName = name.toLowerCase();

    const response = h.response({
      status: 'success',
      data: {
        books: books.filter((n) => n.name === booksName).map((booksX) => ({
          id: booksX.id,
          name: booksX.name,
          publisher: booksX.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  // Reading
  if (reading !== undefined) {
    const booksReading = books.filter((booksY) => Number(booksY.reading) === Number(reading));

    const response = h.response({
      status: 'success',
      data: {
        books: booksReading.map((booksY) => ({
          id: booksY.id,
          name: booksY.name,
          publisher: booksY.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  // Finished
  if (finished !== undefined) {
    const booksFinished = books.filter((booksZ) => booksZ.finished === finished);
    const response = h.response({
      status: 'success',
      data: {
        books: booksFinished.map((booksZ) => ({
          id: booksZ.id,
          name: booksZ.name,
          publisher: booksZ.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: books.map((x) => ({
        id: x.id,
        name: x.name,
        publisher: x.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};
// ==================================================

// MENAMPILKAN DETAIL BUKU
const detailBukuHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};
// ==================================================

// MENGUBAH DATA BUKU
const ubahBukuHandler = (request, h) => {
  const { id } = request.params;

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

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    if ((name === null) || (name === undefined)) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
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

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
// ==================================================

// MENGHAPUS BUKU
const hapusBukuHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  simpanBukuHandler,
  tampilkanSeluruhBukuHandler,
  detailBukuHandler,
  ubahBukuHandler,
  hapusBukuHandler,
};
