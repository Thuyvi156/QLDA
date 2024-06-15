const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'NhanVien'
const COLLECTION_NAME = 'NhanViens'

var nhanVienSchema = new Schema({
    taiKhoan: {
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    matKhau: {
        type: String,
        required: true,
        trim: true,
        default: '123456',
        minLength: 6
    },
    ten: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String,
        default: 'https://nupet.vn/wp-content/uploads/2023/10/anh-avatar-cute-meo-nupet-2.jpg'
    },
    ngaySinh: {
        type: Date,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    soDienThoai: {
        type: String,
        required: true
    },
    phongBan: {
        type: String,
        enum: ["NhanSu", "HanhChinh"],
        required: true,
    },
    truongPhong: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, nhanVienSchema);