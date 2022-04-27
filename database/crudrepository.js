// .env
require("dotenv").config();
const mysql = require("mysql");
let translationSchema = require("../translation-schema.js");
// const rangeSchema = require("../range-schema.js");
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
      // console.log(translation);
      let validation = validate(translation, translationSchema);
      // console.log(translationSchema);
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

  // filterByLat: (latitudeRange) => {
  //   return new Promise((resolve, reject) => {
  //     let validation = validate(latitudeRange, rangeSchema);
  //     if (validation.errors.length > 0) {
  //       reject(validation.errors);
  //       console.log(validation.errors);
  //     } else {
  //       let sql = `SELECT * FROM locations WHERE latitude BETWEEN ? AND ?`;
  //       connection.query(
  //         sql,
  //         [latitudeRange.lower, latitudeRange.upper],
  //         (err, result) => {
  //           //* @author Tanja Rannikko
  //           // @author Jussi Pohjolainen
  //           if (err) reject(err);
  //           else if (result.length === 0) resolve(null);
  //           else resolve(result);
  //         }
  //       );
  //     }
  //   });
  // },

  // sortByLat: () => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       `SELECT * FROM locations ORDER BY latitude `,
  //       (err, locations) => {
  //         if (err) {
  //           reject(err);
  //         }
  //         resolve(locations);
  //       }
  //     );
  //   });
  // },

  // sortByLong: () => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       `SELECT * FROM locations ORDER BY longitude `,
  //       (err, locations) => {
  //         if (err) {
  //           reject(err);
  //         }
  //         resolve(locations);
  //       }
  //     );
  //   });
  // },
};

module.exports = connectionFunctions;
