const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

global.__basedir = __dirname;

var corsOptions = {
  // origin: "http://localhost:8081"
  origin: "*"
  
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models");
const Role = db.role;
const User = db.user;
const WebInfo = db.websiteInfos
const Fasilitas = db.Fasilitas
const PaketWisata = db.paketWisata


// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

db.sequelize.sync();


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome sejarah-joang galang API application." });
});


// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/website-info.routes')(app);
require('./app/routes/berita.routes')(app);
require('./app/routes/berita-excl.routes')(app);
require('./app/routes/paket-wisata.routes')(app);
require('./app/routes/kontak.routes')(app);
require('./app/routes/sejarah-desa.routes')(app);
require('./app/routes/fasilitas.routes')(app);


let routerFile = require('./app/routes/file.routes');
app.use(express.static('resources'));                                                                             
app.use('/', routerFile);

// let routerWebsiteInfo = require('./app/routes/website-info.routes');
// app.use(express.static('resources'));                                                                             
// app.use('/', routerWebsiteInfo);


// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



function initial() {
  // PaketWisata.create({
  //   price : 304000,
  //   title : 'Paket Wisata 1',
  //   description : '<ul><li><span style="font-size: 14pt;">Homestay</span></li><li><span style="font-size: 14pt;">Makan 3x</span></li></ul><p><br></p><p style="text-align: center;"><strong style="font-size: 12pt;">Destinasi</strong></p><ul><li style="text-align: left;"><span style="font-size: 14pt;">Kunjungan Budidaya Jamur</span></li><li style="text-align: left;"><span style="font-size: 14pt;">Kunjungan Pabrik Arang</span></li><li style="text-align: left;"><span style="font-size: 14pt;">Kunjungan Kampung Seni</span></li><li style="text-align: left;"><span style="font-size: 14pt;">Praktek Pembuatan Papais Cisaat</span></li></ul><p style="text-align: left;"><br></p>',
  //   time : '2 Day 1 Night',
  //   userId : 1,
  //   paketWisataImg:null,
  // })

  // PaketWisata.create({
  //   price : 342342,
  //   title : 'Paket Wisata 2',
  //   description : '<ul><li><span style="font-size: 14pt;">Homestay</span></li><li><span style="font-size: 14pt;">Makan 3x</span></li></ul><p><br></p><p style="text-align: center;"><strong style="font-size: 12pt;">Destinasi</strong></p><ul><li style="text-align: left;"><span style="font-size: 14pt;">Kunjungan Budidaya Jamur</span></li><li style="text-align: left;"><span style="font-size: 14pt;">Kunjungan Pabrik Arang</span></li><li style="text-align: left;"><span style="font-size: 14pt;">Kunjungan Kampung Seni</span></li><li style="text-align: left;"><span style="font-size: 14pt;">Praktek Pembuatan Papais Cisaat</span></li></ul><p style="text-align: left;"><br></p>',
  //   time : '3 Day 2 Night',
  //   userId : 1,
  //   paketWisataImg:null,
  // })

  // PaketWisata.create({
  //   price : 4562352,
  //   title : 'Paket Wisata 3',
  //   description : '<ul><li><span style="font-size: 14pt;">Homestay</span></li><li><span style="font-size: 14pt;">Makan 3x</span></li></ul><p><br></p><p style="text-align: center;"><strong style="font-size: 12pt;">Destinasi</strong></p><ul><li style="text-align: left;"><span style="font-size: 14pt;">Kunjungan Budidaya Jamur</span></li><li style="text-align: left;"><span style="font-size: 14pt;">Kunjungan Pabrik Arang</span></li><li style="text-align: left;"><span style="font-size: 14pt;">Kunjungan Kampung Seni</span></li><li style="text-align: left;"><span style="font-size: 14pt;">Praktek Pembuatan Papais Cisaat</span></li></ul><p style="text-align: left;"><br></p>',
  //   time : '1 Day 1 Night',
  //   userId : 1,
  //   paketWisataImg:null,
  // })

  // PaketWisata.create({
  //   price : 23422344,
  //   title : 'Paket Wisata 4',
  //   description : '<ul><li><span style="font-size: 14pt;">Homestay</span></li><li><span style="font-size: 14pt;">Makan 3x</span></li></ul><p><br></p><p style="text-align: center;"><strong style="font-size: 12pt;">Destinasi</strong></p><ul><li style="text-align: left;"><span style="font-size: 14pt;">Kunjungan Budidaya Jamur</span></li><li style="text-align: left;"><span style="font-size: 14pt;">Kunjungan Pabrik Arang</span></li><li style="text-align: left;"><span style="font-size: 14pt;">Kunjungan Kampung Seni</span></li><li style="text-align: left;"><span style="font-size: 14pt;">Praktek Pembuatan Papais Cisaat</span></li></ul><p style="text-align: left;"><br></p>',
  //   time : '2 Day 2 Night',
  //   userId : 1,
  //   paketWisataImg:null,
  // })


  // Fasilitas.create({
  //   namaFasilitas : 'Guide',
  //   deskripsi: 'Menyediakan Tour guide local berpengalaman yang dapat membantu wisatawan dalam memperoleh informasi dan edukasi.',
  //   icon : 'fa-home'
  // })

  // Fasilitas.create({
  //   namaFasilitas : 'Homestay',
  //   deskripsi: 'Penginapan Live In berbasis masyarakat juga di sediakan di desa cisaat dengan kapasitas 3-5 orang  meliputi 1 buah rumah siap tinggal berbasis wisatawan.',
  //   icon : 'fa-hotel'
  // })

  // Fasilitas.create({
  //   namaFasilitas : 'Transport',
  //   deskripsi: 'Desa wisata CIsaat juga menyediakan Trasnportasi kendaraan Wara Wiri yang dapat di gunakan untuk berkeliling dan explrasi desa.',
  //   icon : 'fa-motorcycle'
  // })

  // Fasilitas.create({
  //   namaFasilitas : 'Food',
  //   deskripsi: 'Tradisional Food atau menu yang dapat di request juga tersedia setiap paket penginapan Live In serta camilan jamuan berupa Papais khas Cisaat. ',
  //   icon : 'fa-spoon'
  // })

  // WebInfo.create({
  //   websiteName: 'Initial Title Website',
  //   mapLocation :'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15850.148026808574!2d107.65491430065104!3d-6.704115472449884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e691f61489ace7b%3A0x9459ace47ea1f167!2sCisaat%2C%20Ciater%2C%20Subang%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1625909864791!5m2!1sen!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
  //   address : 'iniitial Address'
  // })

  Role.create({
    id: 1,
    name: "user"
  });
  
  Role.create({
    id: 2,
    name: "moderator"
  });
  
  Role.create({
    id: 3,
    name: "admin"
  });

  User.create({
    username: "galang",
    email: "galang@gmail.com",
    password: "$2a$08$y9i3HjTck1hpJhl9OJFTrOj905WUj.BhLmL1nE4F8ZS2Rl6r8kFaq" //123456
  })


}
