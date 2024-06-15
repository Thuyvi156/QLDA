const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'PhongHop'
const COLLECTION_NAME = 'PhongHops'

var phongHopSchema = new Schema({
    ten: {
        type: String,
        required: true,
    },
    lichDangKy: [
        {
            nhanVienId: {
                type: Types.ObjectId,
                ref: 'NhanVien',
                require: true
            },
            ngayDangKy: {
                type: Date,
                require: true
            }
        }
    ]
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, phongHopSchema);