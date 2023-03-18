module.exports = (sequelize, Sequelize) => {
    const Fasilitas = sequelize.define("tbl_fasilitas", {
      namaFasilitas: {
        type: Sequelize.STRING
      },
      deskripsi: {
        type: Sequelize.TEXT('long')
      },
      icon: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      }
    });
  
    return Fasilitas;
  };