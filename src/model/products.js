const Pool = require('../config/db');

const selectAllProduct = (limit, offset, searchParam, sortBY, sort) => {
  return Pool.query(`SELECT product.*, seller.fullname AS seller_name, category.name AS category_name  
  FROM product 
  INNER JOIN seller ON seller.id_seller = product.id_seller
  INNER JOIN category ON category.id_category = product.id_category 
  WHERE product.name LIKE '%${searchParam}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectProduct = (id) => {
  return Pool.query(`SELECT product.*, seller.fullname AS seller_name, category.name AS category_name  
    FROM product 
    INNER JOIN seller ON seller.id_seller = product.id_seller
    INNER JOIN category ON category.id_category = product.id_category 
    WHERE id_produk='${id}'`);
  // return Pool.query(`SELECT * FROM product WHERE id_produk=${id}`);
};

const insertProduct = (data) => {
  const { id, name, price, deskripsi, stock, rating, color, size, photo, id_category, id_seller } = data;
  return Pool.query(
    `INSERT INTO product(id_produk,name,price,deskripsi,stock,rating,color,size, photo,id_category,id_seller) VALUES('${id}','${name}',${price},'${deskripsi}',${stock},${rating}, '${color}',${size}, '${photo}',${id_category},'${id_seller}')`
  );
};

const updateProduct = (data) => {
  const { id, name, price, deskripsi, stock, rating, color, size, photo, id_category, id_seller } = data;
  return Pool.query(
    `UPDATE product SET name='${name}', price=${price}, deskripsi='${deskripsi}',stock=${stock},rating=${rating}, color='${color}', size=${size}, photo='${photo}', id_category=${id_category}, id_seller='${id_seller}' WHERE id_produk='${id}'`
  );
};

const deleteProduct = (id) => {
  return Pool.query(`DELETE FROM product WHERE id_produk='${id}'`);
};

const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM product');
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id_produk FROM product WHERE id_produk='${id}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const findAll = () => {
  return Pool.query(`SELECT * FROM product`);
};

module.exports = {
  selectAllProduct,
  selectProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  countData,
  findId,
  countData,
  findAll,
};
