const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'ThongBaoNoiBo'
const COLLECTION_NAME = 'ThongBaoNoiBos'

var thongBaoNoiBoSchema = new Schema({
    nhanVienId: {
        type: Types.ObjectId,
        ref: 'NhanVien',
        require: true
    },
    ten: {
        type: String,
        required: true,
    },
    noiDung: {
        type: String,
        required: true,
    },
    loai: {
        type: String,
        required: true,
        enum: ["Chung", "PhongHop","Nghi"]
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, thongBaoNoiBoSchema);