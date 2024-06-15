const nhanVienModel = require('../models/nhanVien.model')
const getData = require('../utils/formatRes')
const _ = require('lodash');

class NhanVienService {
    static getAllNhanVien = async () => {
        try {
            const nhanVien = await nhanVienModel.find({})

            return nhanVien.map(nv =>
                getData({ fields: ['_id', 'ten', 'avatar', 'ngaySinh', 'soDienThoai','email', 'phongBan', 'truongPhong'], object: nv })
            )

        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static getNhanVienById = async ({ id }) => {
        try {
            const nhanVien = await nhanVienModel.findById(id)

            if (!nhanVien) {
                return {
                    success: false,
                    message: "wrong employee"
                }
            }

            return getData({ fields: ['_id', 'ten', 'avatar', 'ngaySinh', 'soDienThoai','email', 'phongBan', 'truongPhong'], object: nhanVien })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static addNhanVien = async (file, { taiKhoan, matKhau,email, ten, ngaySinh, soDienThoai, phongBan, truongPhong }) => {
        try {
            const time = ngaySinh.split('/')
            const ngaySinhTemp = new Date(time[2], time[1] - 1, time[0])

            const nhanVien = await nhanVienModel.findOne({ taiKhoan: taiKhoan })
            const emailExist = await nhanVienModel.findOne({ email: email })

            if (nhanVien) {
                return {
                    success: false,
                    message: "username exists"
                }
            }

            if (emailExist) {
                return {
                    success: false,
                    message: "email exists"
                }
            }

            const newNhanVien = new nhanVienModel({
                "taiKhoan": taiKhoan,
                "matKhau": matKhau,
                "ten": ten,
                "avatar": file?file.path:undefined,
                "ngaySinh": ngaySinhTemp,
                "soDienThoai": soDienThoai,
                "phongBan": phongBan,
                "truongPhong": truongPhong,
                email
            })

            const savedNhanVien = await newNhanVien.save()

            return getData({ fields: ['_id', 'ten', 'avatar', 'ngaySinh', 'soDienThoai','email', 'phongBan', 'truongPhong'], object: savedNhanVien })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static updateNhanVien = async (file, { id, oldMatKhau, newMatKhau, ten, ngaySinh, soDienThoai,email, phongBan, truongPhong }) => {
        try {
            const nhanVien = await nhanVienModel.findById(id)

            const emailExist = await nhanVienModel.findOne({ email: email })

            if (emailExist && nhanVien.email !=email) {
                return {
                    success: false,
                    message: "email exists"
                }
            }

            if (!nhanVien) {
                return {
                    success: false,
                    message: "wrong employee"
                }
            }

            if (oldMatKhau && newMatKhau) {
                if (oldMatKhau != nhanVien.matKhau) {
                    return {
                        success: false,
                        message: "wrong old password"
                    }
                }
                else
                    nhanVien.matKhau = newMatKhau
            }

            if (ten)
                nhanVien.ten = ten

            if (file)
                nhanVien.avatar = file.path

            if (ngaySinh) {
                const time = ngaySinh.split('/')
                const ngaySinhTemp = new Date(time[2], time[1] - 1, time[0])
                nhanVien.ngaySinh = ngaySinhTemp
            }

            if (soDienThoai)
                nhanVien.soDienThoai = soDienThoai

            if (email)
                nhanVien.email = email

            if (phongBan)
                nhanVien.phongBan = phongBan

            if (truongPhong != undefined)
                nhanVien.truongPhong = truongPhong

            const savedNhanVien = await nhanVien.save()

            return getData({ fields: ['_id', 'ten', 'avatar', 'ngaySinh', 'soDienThoai','email', 'phongBan', 'truongPhong'], object: savedNhanVien })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static deleteNhanVien = async ({ id }) => {
        try {
            const nhanVien = await nhanVienModel.findByIdAndDelete(id)

            if (!nhanVien) {
                return {
                    success: false,
                    message: "wrong employee"
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

module.exports = NhanVienService;