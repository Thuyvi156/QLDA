const NhanVienService = require('../services/nhanVien.service')

class NhanVienController {
    getAllNhanVien = async (req, res, next) => {
        try {
            return res.status(201).json(await NhanVienService.getAllNhanVien())
        } catch (error){
            next(error)
        }
    }

    getNhanVienById = async (req, res, next) => {
        try {
            return res.status(201).json(await NhanVienService.getNhanVienById(req.params))
        } catch (error){
            next(error)
        }
    }

    addNhanVien = async (req, res, next) => {
        try {
            return res.status(201).json(await NhanVienService.addNhanVien(req.file, req.body))
        } catch (error){
            next(error)
        }
    }

    updateNhanVien = async (req, res, next) => {
        try {
            return res.status(201).json(await NhanVienService.updateNhanVien(req.file, req.body))
        } catch (error){
            next(error)
        }
    }

    deleteNhanVien = async (req, res, next) => {
        try {
            return res.status(201).json(await NhanVienService.deleteNhanVien(req.body))
        } catch (error){
            next(error)
        }
    }
}

module.exports = new NhanVienController();