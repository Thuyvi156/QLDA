const yeuCauModel = require('../models/yeuCau.model')
const getData = require('../utils/formatRes')
const _ = require('lodash');

class YeuCauService {
    static getAllYeuCau = async () => {
        try {
            const yeuCau = await yeuCauModel.find({})

            return yeuCau.map(yc =>
                getData({ fields: ['_id', 'ten', 'noiDung'], object: yc })
            )
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static getYeuCauById = async ({ id }) => {
        try {
            const yeuCau = await yeuCauModel.findById(id)

            if (!yeuCau) {
                return {
                    success: false,
                    message: "wrong request"
                }
            }

            return getData({ fields: ['_id', 'ten', 'noiDung'], object: yeuCau })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static addYeuCau = async ({ ten, noiDung }) => {
        try {
            const yeuCau = await yeuCauModel.findOne({ ten: ten })

            if (yeuCau) {
                return {
                    success: false,
                    message: "request exists"
                }
            }

            const newYeuCau = new yeuCauModel({
                ten, 
                noiDung
            })

            const savedYeuCau = await newYeuCau.save()

            return getData({ fields: ['_id', 'ten', 'noiDung'], object: savedYeuCau })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static updateYeuCau = async ({ id, ten, noiDung }) => {
        try {
            const yeuCau = await yeuCauModel.findById(id)

            if (!yeuCau) {
                return {
                    success: false,
                    message: "wrong request"
                }
            }

            if (ten)
                yeuCau.ten = ten

            if (noiDung)
                yeuCau.noiDung = noiDung

            const savedYeuCau = await yeuCau.save()

            return getData({ fields: ['_id', 'ten', 'noiDung'], object: savedYeuCau })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static deleteYeuCau = async ({ id }) => {
        try {
            const yeuCau = await yeuCauModel.findByIdAndDelete(id)

            if (!yeuCau) {
                return {
                    success: false,
                    message: "wrong request"
                }
            }

            return {
                success: true,
                message: "delete successfully"
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}

module.exports = YeuCauService;