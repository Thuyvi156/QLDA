const YeuCauService = require('../services/yeuCau.service')

class YeuCauController {
    getAllYeuCau = async (req, res, next) => {
        try {
            return res.status(201).json(await YeuCauService.getAllYeuCau())
        } catch (error) {
            next(error)
        }
    }
    
    getYeuCauById = async (req, res, next) => {
        try {
            return res.status(201).json(await YeuCauService.getYeuCauById(req.params))
        } catch (error) {
            next(error)
        }
    }
    
    addYeuCau = async (req, res, next) => {
        try {
            return res.status(201).json(await YeuCauService.addYeuCau(req.body))
        } catch (error) {
            next(error)
        }
    }
    
    updateYeuCau = async (req, res, next) => {
        try {
            return res.status(201).json(await YeuCauService.updateYeuCau(req.body))
        } catch (error) {
            next(error)
        }
    }
    
    deleteYeuCau = async (req, res, next) => {
        try {
            return res.status(201).json(await YeuCauService.deleteYeuCau(req.body))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new YeuCauController();