module.exports = (sequelize, Sequelize) => {
    const Berita = sequelize.define("tbl_berita", {
      title: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      news: {
        type: Sequelize.TEXT
      },
      imageNews: {
        type: Sequelize.BLOB('long')
      },
      tags: {
        type: Sequelize.STRING
      },
      likes: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      }
    });
  
    return Berita;
  };