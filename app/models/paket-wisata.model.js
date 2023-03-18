module.exports = (sequelize, Sequelize) => {
    const PaketWisata = sequelize.define("tbl_paket_wisata", {
      price: {
        type: Sequelize.INTEGER('long')
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT('long')
      },
      time: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      paketWisataImg: {
        type: Sequelize.BLOB('long')
      },
    });
  
    return PaketWisata;
  };