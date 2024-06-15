const nhanVienModel = require('../models/nhanVien.model')
const quenMatKhauModel = require('../models/quenMatKhau.model')
const getData = require('../utils/formatRes')
const _ = require('lodash');
const nodemailer = require("nodemailer")

class TruyCapService {
    static login = async ({ taiKhoan, matKhau }) => {
        try {
            const nhanVien = await nhanVienModel.findOne({ taiKhoan: taiKhoan })

            if (!nhanVien) {
                return {
                    success: false,
                    message: "wrong username"
                }
            }

            if (nhanVien.matKhau != matKhau) {
                return {
                    success: false,
                    message: "wrong password"
                }
            }

            return {
                success: true,
                message: "login successfully",
                id: nhanVien._id
            }

        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static forgotPassword = async ({ email }) => {
        try {
            const nhanVien = await nhanVienModel.findOne({ email: email })

            if (!nhanVien) {
                return {
                    success: false,
                    message: "wrong email"
                }
            }

            const code = JSON.stringify(Math.floor(Math.random() * 9000 + 1000))

            const quenMatKhau = await quenMatKhauModel.findOne({email: email})

            if(quenMatKhau){  
                await quenMatKhauModel.findOneAndDelete({email: email})
                
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true, 
                    auth: {
                        user: "testqlda123@gmail.com", 
                        pass: "klfv luxp iecv jgbv", 
                    },
                });
    
                let info = await transporter.sendMail({
                    from: 'testqlda123@gmail.com',
                    to: `${email}`,
                    subject: "Mã xác nhận",
                    html: `
                    <h1>Mã xác nhận của bạn là: ${code}</h1>
                    `,
                })

                const newQuenMatKhau = new quenMatKhauModel({
                    "email": email,
                    "code": code,
                })
    
                await newQuenMatKhau.save()

                return {
                    success: true,
                    message: "confirmation code sent"
                }
            }
            else{
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true, 
                    auth: {
                        user: "testqlda123@gmail.com", 
                        pass: "klfv luxp iecv jgbv", 
                    },
                });
    
                let info = await transporter.sendMail({
                    from: 'testqlda123@gmail.com',
                    to: `${email}`,
                    subject: "Mã xác nhận",
                    html: `
                    <h1>Mã xác nhận của bạn là: ${code}</h1>
                    `,
                })

                const newQuenMatKhau = new quenMatKhauModel({
                    "email": email,
                    "code": code,
                })
    
                await newQuenMatKhau.save()

                return {
                    success: true,
                    message: "confirmation code sent",
                }
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static confirmCode = async ({ email, code }) => {
        try {
            const quenMatKhau = await quenMatKhauModel.findOne({ email: email })
            const nhanVien = await nhanVienModel.findOne({ email: email })

            if (!quenMatKhau) {
                return {
                    success: false,
                    message: "wrong email"
                }
            }

            if (quenMatKhau.code == code) {
                const quenMatKhau = await quenMatKhauModel.findOneAndDelete({email: email})
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true, 
                    auth: {
                        user: "testqlda123@gmail.com", 
                        pass: "klfv luxp iecv jgbv", 
                    },
                });
    
                let info = await transporter.sendMail({
                    from: 'testqlda123@gmail.com',
                    to: `${email}`,
                    subject: "Xác nhận thành công",
                    html: `
                    <h1>Tài khoản của bạn là: ${nhanVien.taiKhoan}</h1>
                    <h1>Mật khẩu của bạn là: ${nhanVien.matKhau}</h1> 
                    `,
                })

                return {
                    success: true,
                    message: "email sent",
                }
            }

            return {
                success: false,
                message: "wrong code",
            }

        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}

module.exports = TruyCapService;