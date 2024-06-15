const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'YeuCau'
const COLLECTION_NAME = 'YeuCaus'

var yeuCauSchema = new Schema({
    ten: {
        type: String,
        required: true,
    },
    noiDung: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, yeuCauSchema);