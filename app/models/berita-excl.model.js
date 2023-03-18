module.exports = (sequelize, Sequelize) => {
    const BeritaExcl = sequelize.define("tbl_berita_excl", {
      title: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      news: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.STRING
      },
      imageNews: {
        type: Sequelize.BLOB('long')
      },
      groups: {
        type: Sequelize.ENUM,
        values : ['sejarah', 'umum', 'kalender-event','potensi-desa-wisata','daya-tarik','bentang-alam','budaya','papais','cisaat','attraction','paket-wisata']
      },
      userId: {
        type: Sequelize.INTEGER
      }
    });
  
    return BeritaExcl;
  };