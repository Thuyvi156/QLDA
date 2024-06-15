const ThongBaoNoiBoService = require('../services/thongBaoNoiBo.service')

class ThongBaoNoiBoController {
    getAllThongBao = async (req, res, next) => {
        try {
            return res.status(201).json(await ThongBaoNoiBoService.getAllThongBao())
        } catch (error) {
            next(error)
        }
    }
    
    getThongBaoById = async (req, res, next) => {
        try {
            return res.status(201).json(await ThongBaoNoiBoService.getThongBaoById(req.params))
        } catch (error) {
            next(error)
        }
    }
    
    addThongBao = async (req, res, next) => {
        try {
            return res.status(201).json(await ThongBaoNoiBoService.addThongBao(req.body))
        } catch (error) {
            next(error)
        }
    }
    
    updateThongBao = async (req, res, next) => {
        try {
            return res.status(201).json(await ThongBaoNoiBoService.updateThongBao(req.body))
        } catch (error) {
            next(error)
        }
    }
    
    deleteThongBao = async (req, res, next) => {
        try {
            return res.status(201).json(await ThongBaoNoiBoService.deleteThongBao(req.body))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ThongBaoNoiBoController();