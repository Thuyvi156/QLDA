const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer');

cloudinary.config({ 
  cloud_name: 'dxtslecpc', 
  api_key: '855769189416733', 
  api_secret: 'P3EPGCdSEa9l3xw-O44YQUuuysg'
});

const storage = new CloudinaryStorage({
  cloudinary,
  folder: 'Avatar', 
  allowedFormats: ['jpg', 'png'],
  filename: function (req, res, cb) {
    cb(null, res.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

module.exports = multer({ storage })