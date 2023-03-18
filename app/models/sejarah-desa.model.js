module.exports = (sequelize, Sequelize) => {
  const SejarahDesa = sequelize.define("tbl_sejarah_desa", {
    tahun: {
      type: Sequelize.STRING
    },
    kejadianBaik: {
      type: Sequelize.TEXT('long')
    },
    kejadianBuruk: {
      type: Sequelize.TEXT('long')
    }
  });
  return SejarahDesa;
};