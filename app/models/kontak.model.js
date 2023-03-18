module.exports = (sequelize, Sequelize) => {
  const Kontak = sequelize.define("tbl_kontak", {
    nama: {
      type: Sequelize.STRING
    },
    sosialMedia: {
      type: Sequelize.STRING
    },
    link: {
      type: Sequelize.STRING
    }
  });
  return Kontak;
};