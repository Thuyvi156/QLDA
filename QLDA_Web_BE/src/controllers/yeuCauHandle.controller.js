const YeuCauHandleService = require('../services/yeuCauHandle.service')

class YeuCauHandleController {
    getAllYeuCauHandle = async (req, res, next) => {
        try {
            return res.status(201).json(await YeuCauHandleService.getAllYeuCauHandle())
        } catch (error) {
            next(error)
        }
    }
    
    getYeuCauHandleById = async (req, res, next) => {
        try {
            return res.status(201).json(await YeuCauHandleService.getYeuCauHandleById(req.query))
        } catch (error) {
            next(error)
        }
    }
    
    addYeuCauHandle = async (req, res, next) => {
        try {
            return res.status(201).json(await YeuCauHandleService.addYeuCauHandle(req.body))
        } catch (error) {
            next(error)
        }
    }
    
    updateYeuCau = async (req, res, next) => {
        try {
            return res.status(201).json(await YeuCauHandleService.updateYeuCau(req.body))
        } catch (error) {
            next(error)
        }
    }
    
    deleteYeuCauHandle = async (req, res, next) => {
        try {
            return res.status(201).json(await YeuCauHandleService.deleteYeuCauHandle(req.body))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new YeuCauHandleController();