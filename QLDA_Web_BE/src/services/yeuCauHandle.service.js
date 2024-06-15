const yeuCauHandleModel = require('../models/yeuCauHandle.model')
const getData = require('../utils/formatRes')
const _ = require('lodash');

class YeuCauHandleService {
    static getAllYeuCauHandle = async () => {
        try {
            const yeuCauHandle = await yeuCauHandleModel.find({}).populate('yeuCauId').populate({
                path: "nhanVienId",
                select: '_id ten'
            })

            return yeuCauHandle.map(yc =>
                getData({ fields: ['_id', 'yeuCauId', 'nhanVienId','noiDung', 'pheDuyet', 'phanHoi'], object: yc })
            )
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static getYeuCauHandleById = async ({ id, nhanVienId }) => {
        try {
            if(id){
                const yeuCauHandle = await yeuCauHandleModel.findById(id).populate('yeuCauId').populate({
                    path: "nhanVienId",
                    select: '_id ten'
                })
                
                if (!yeuCauHandle) {
                    return {
                        success: false,
                        message: "wrong request"
                    }
                }
                
                return getData({ fields: ['_id', 'yeuCauId', 'nhanVienId','noiDung', 'pheDuyet', 'phanHoi'], object: yeuCauHandle })
            }

            if(nhanVienId){
                const yeuCauHandle = await yeuCauHandleModel.find({nhanVienId: nhanVienId}).populate('yeuCauId').populate({
                    path: "nhanVienId",
                    select: '_id ten'
                })

                return yeuCauHandle.map(yc =>
                    getData({ fields: ['_id', 'yeuCauId', 'nhanVienId','noiDung', 'pheDuyet', 'phanHoi'], object: yc })
                )
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static addYeuCauHandle = async ({ yeuCauId, nhanVienId, noiDung, pheDuyet, phanHoi }) => {
        try {
            const newYeuCauHandle = new yeuCauHandleModel({
                yeuCauId,
                nhanVienId,
                pheDuyet,
                phanHoi,
                noiDung
            })

            const savedYeuCauHandle = await newYeuCauHandle.save()

            return getData({ fields: ['_id', 'yeuCauId', 'nhanVienId','noiDung', 'pheDuyet', 'phanHoi'], object: savedYeuCauHandle })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static updateYeuCau = async ({ id, pheDuyet, phanHoi }) => {
        try {
            const yeuCauHandle = await yeuCauHandleModel.findById(id)

            if (!yeuCauHandle) {
                return {
                    success: false,
                    message: "wrong request"
                }
            }

            if (pheDuyet != undefined)
                yeuCauHandle.pheDuyet = pheDuyet

            if (phanHoi)
                yeuCauHandle.phanHoi = phanHoi

            const savedYeuCauHandle = await yeuCauHandle.save()

            return getData({ fields: ['_id', 'yeuCauId', 'nhanVienId','noiDung', 'pheDuyet', 'phanHoi'], object: savedYeuCauHandle })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static deleteYeuCauHandle = async ({ id }) => {
        try {
            const yeuCauHandle = await yeuCauHandleModel.findByIdAndDelete(id)

            if (!yeuCauHandle) {
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

module.exports = YeuCauHandleService;