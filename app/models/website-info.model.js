module.exports = (sequelize, Sequelize) => {
    const WebsiteInfo = sequelize.define("tbl_website_info", {
      websiteName: {
        type: Sequelize.STRING
      },
      websiteImageName: {
        type: Sequelize.STRING
      },
      websiteImage: {
        type: Sequelize.BLOB('long')
      },
      type: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      mapLocation: {
        type: Sequelize.TEXT
      }
    });
  
    return WebsiteInfo;
  };