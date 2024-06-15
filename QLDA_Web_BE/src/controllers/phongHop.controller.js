const PhongHopService = require('../services/phongHop.service')

class PhongHopController {
    getAllPhongHop = async (req, res, next) => {
        try {
            return res.status(201).json(await PhongHopService.getAllPhongHop())
        } catch (error) {
            next(error)
        }
    }

    getPhongHopById = async (req, res, next) => {
        try {
            return res.status(201).json(await PhongHopService.getPhongHopById(req.query))
        } catch (error) {
            next(error)
        }
    }

    addPhongHop = async (req, res, next) => {
        try {
            return res.status(201).json(await PhongHopService.addPhongHop(req.body))
        } catch (error) {
            next(error)
        }
    }

    updatePhongHop = async (req, res, next) => {
        try {
            return res.status(201).json(await PhongHopService.updatePhongHop(req.body))
        } catch (error) {
            next(error)
        }
    }

    deletePhongHop = async (req, res, next) => {
        try {
            return res.status(201).json(await PhongHopService.deletePhongHop(req.body))
        } catch (error) {
            next(error)
        }
    }

    addNgayPhongHop = async (req, res, next) => {
        try {
            return res.status(201).json(await PhongHopService.addNgayPhongHop(req.body))
        } catch (error) {
            next(error)
        }
    }

    deleteNgayPhongHop = async (req, res, next) => {
        try {
            return res.status(201).json(await PhongHopService.deleteNgayPhongHop(req.body))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PhongHopController();