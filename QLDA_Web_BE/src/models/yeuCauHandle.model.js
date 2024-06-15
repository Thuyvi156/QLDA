const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'YeuCauHandle'
const COLLECTION_NAME = 'YeuCauHandles'

var yeuCauHandleSchema = new Schema({
    yeuCauId: {
        type: Types.ObjectId,
        ref: 'YeuCau',
        require: true
    },
    nhanVienId: {
        type: Types.ObjectId,
        ref: 'NhanVien',
        require: true
    },
    noiDung:{
        type: String,
        require: true
    },
    pheDuyet: {
        type: Boolean,
        default: undefined,
    },
    phanHoi: {
        type: String,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, yeuCauHandleSchema);