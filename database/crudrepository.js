require("dotenv").config();
const mysql = require("mysql");
let translationSchema = require("../translation-schema.js");
const validate = require("../my-validator.js");
const dbconfig = require("./dbconfig");
const connection = mysql.createConnection(dbconfig);
let pool = mysql.createPool(dbconfig);

// Research if necessary
let connectionFunctions = {
  connect: () => {
    return new Promise((resolve, reject) => {
      connection.connect((err, open) => {
        if (err) {
          reject(err);
        }
        resolve(open);
      });
    });
  },
  close: () => {
    return new Promise((resolve, reject) => {
      connection.end((err, closeCon) => {
        if (err) {
          reject(err);
        }
        resolve(closeCon);
      });
    });
  },

  save: (translation) => {
    // translation = { english: "squirrel", finnish: "orava", tag: 3 };
    return new Promise((resolve, reject) => {
      let validation = validate(translation, translationSchema);
      if (validation.errors.length > 0) {
        reject(validation.errors);
        console.log(validation.errors);
      } else {
        let sql = `INSERT INTO translations SET ?`;
        pool.query(sql, translation, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result.insertId);
        });
      }
    });
  },

  findAll: () => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * from translations`, (err, translations) => {
        if (err) {
          reject(err);
        }
        resolve(translations);
      });
    });
  },

  sortByTag: () => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM translations ORDER BY tag_id `,
        (err, translations) => {
          if (err) {
            reject(err);
          }
          resolve(translations);
        }
      );
    });
  },

  sortByTagDesc: () => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM translations ORDER BY tag_id DESC`,
        (err, translations) => {
          if (err) {
            reject(err);
          }
          resolve(translations);
        }
      );
    });
  },

  // findById: (id) => {
  //   let sql = `SELECT * FROM locations WHERE id = ? `;
  //   return new Promise((resolve, reject) => {
  //     connection.query(sql, [id], (err, result) => {
  //       //* @author Tanja Rannikko
  //       // @author Jussi Pohjolainen
  //       if (err) reject(err);
  //       else if (result.length === 0) resolve(null);
  //       else resolve(result[0]);
  //     });
  //   });
  // },

  deleteById: (id) => {
    let sql = `DELETE from translations WHERE id = ? `;
    return new Promise((resolve, reject) => {
      pool.query(sql, [id], (err, result) => {
        err ? reject(err) : resolve(result.affectedRows > 0);
      });
    });
  },

  putById: (translation, id) => {
    console.log(translation);
    console.log(id);
    return new Promise((resolve, reject) => {
      let validation = validate(translation, translationSchema);
      if (validation.errors.length > 0) {
        reject(validation.errors);
        console.log(validation.errors);
      } else {
        pool.query(
          `UPDATE translations SET english = ?, finnish = ?, tag_id = ? WHERE id = ?`,
          [translation.english, translation.finnish, translation.tag_id, id],
          (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result.affectedRows > 0);
          }
        );
      }
    });
  },
};

module.exports = connectionFunctions;
