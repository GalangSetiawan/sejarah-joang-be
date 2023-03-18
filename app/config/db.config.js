// for localhost
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "sejarah-joang",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};


//hosting 
// module.exports = {
//   HOST: "localhost",
//   USER: "desawi20",
//   PASSWORD: "@27GalangCpanel",
//   DB: "desawi20_wisatacisaat",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };