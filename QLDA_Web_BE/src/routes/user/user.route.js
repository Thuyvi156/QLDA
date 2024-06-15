const express = require('express')
const NhanVienController = require('../../controllers/nhanVien.controller')
const truyCapController = require('../../controllers/truyCap.controller')
const phongHopController = require('../../controllers/phongHop.controller')
const thongBaoNoiBoController = require('../../controllers/thongBaoNoiBo.controller')
const yeuCauController = require('../../controllers/yeuCau.controller')
const yeuCauHandleController = require('../../controllers/yeuCauHandle.controller')

const uploader = require('../../configs/config.cloudinary.js')

const router = express.Router()

//DANGNHAP
router.post('/login', truyCapController.login)

//FORGOTPASSWORD
router.post('/forgotPassword', truyCapController.forgotPassword)

//CONFIRMCODE
router.post('/confirmCode', truyCapController.confirmCode)

//NHANVIEN
//[GET] Lay nhan vien theo id
router.get('/getNhanVien/:id', NhanVienController.getNhanVienById)

//[GET] Lay tat ca nhan vien
router.get('/getAllNhanVien', NhanVienController.getAllNhanVien)

//[POST] Them nhan vien
router.post('/addNhanVien', uploader.single('avatar'), NhanVienController.addNhanVien)

//[PUT] Sua nhan vien
router.put('/updateNhanVien',uploader.single('avatar'),  NhanVienController.updateNhanVien)

//[DELETE] Xoa nhan vien
router.delete('/deleteNhanVien', NhanVienController.deleteNhanVien)

//PhongHop
//[GET] Lay tat ca phong hop
router.get('/getAllPhongHop', phongHopController.getAllPhongHop)

//[GET] Lay phong hop theo id
router.get('/getPhongHop', phongHopController.getPhongHopById)

//[POST] Them phong hop
router.post('/addPhongHop', phongHopController.addPhongHop)

//[PUT] Sua phong hop
router.put('/updatePhongHop', phongHopController.updatePhongHop)

//[DELETE] Xoa phong hop
router.delete('/deletePhongHop', phongHopController.deletePhongHop)

//[POST] Them ngay phong hop
router.post('/addNgayPhongHop', phongHopController.addNgayPhongHop)

//[DELETE] Xoa phong hop
router.delete('/deleteNgayPhongHop', phongHopController.deleteNgayPhongHop)

//THONGBAONOIBO
//[GET] Lay tat ca thong bao
router.get('/getAllThongBao', thongBaoNoiBoController.getAllThongBao)

//[GET] Lay thong bao theo id
router.get('/getThongBao/:id', thongBaoNoiBoController.getThongBaoById)

//[POST] Them thong bao
router.post('/addThongBao', thongBaoNoiBoController.addThongBao)

//[PUT] Sua thong bao
router.put('/updateThongBao', thongBaoNoiBoController.updateThongBao)

//[DELETE] Xoa thong bao
router.delete('/deleteThongBao', thongBaoNoiBoController.deleteThongBao)

//YEUCAU
//[GET] Lay tat ca yeu cau
router.get('/getAllYeuCau', yeuCauController.getAllYeuCau)

//[GET] Lay yeu cau theo id
router.get('/getYeuCau/:id', yeuCauController.getYeuCauById)

//[POST] them yeu cau
router.post('/addYeuCau', yeuCauController.addYeuCau)

//[PUT] sua yeu cau
router.put('/updateYeuCau', yeuCauController.updateYeuCau)

//[DELETE] xoa yeu cau
router.delete('/deleteYeuCau', yeuCauController.deleteYeuCau)

//YEUCAUHANDLE
//[GET] Lay tat ca yeu cau dang xu ly
router.get('/getAllYeuCauHandle', yeuCauHandleController.getAllYeuCauHandle)

//[GET] Lay yeu cau dang xu ly theo id
router.get('/getYeuCauHandle', yeuCauHandleController.getYeuCauHandleById)

//[POST] them yeu cau can xu ly
router.post('/addYeuCauHandle', yeuCauHandleController.addYeuCauHandle)

//[PUT] sua yeu cau dang xu ly
router.put('/updateYeuCauHandle', yeuCauHandleController.updateYeuCau)

//[DELETE] xoa yeu cau dang xu ly
router.delete('/deleteYeuCauHandle', yeuCauHandleController.deleteYeuCauHandle)

module.exports = router
