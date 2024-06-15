import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
const RoomTimeTable = () => {
    // const rooms = ["Phòng 1", "Phòng 2", "Phòng 3", "Phòng 4", "Phòng 5"];
    const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

    // const schedule = {
    //     "Phòng 3": ["Thứ 5"],
    //     "Phòng 2": ["Thứ 6"],
    //     "Phòng 5": ["Thứ 2", "Thứ 4", "Thứ 7"]
    // };

    const [phongHop, setPhongHop] = useState([])
    const [thuHaiHienTai, setThuHaiHienTai] = useState()

    const getRoomTime = () => {
        let ngayHienTai = new Date(Date.now())
        ngayHienTai = new Date(ngayHienTai.getFullYear(), ngayHienTai.getMonth(), ngayHienTai.getDate())

        if (ngayHienTai.getDay() == 0) {
            setThuHaiHienTai(ngayHienTai.getTime() - 6 * 24 * 60 * 60 * 1000)
        }
        else {
            setThuHaiHienTai(ngayHienTai.getTime() - (ngayHienTai.getDay() - 1) * 24 * 60 * 60 * 1000)
        }

        fetch('http://localhost:8081/v1/api/getAllPhongHop')
            .then(res => res.json())
            .then(data => {
                setPhongHop(data)
                console.log(data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getRoomTime()
    }, [])

    return (

        <div className="flex flex-col min-h-screen relative">
            <Header />
            <div className="pt-28 pb-96 flex flex-col flex-grow w-full items-center justify-center">
                <div className="flex flex-row w-4/5 py-3 px-2">
                    <div className="flex justify-start basis-1/2">
                        <p
                            onClick={() => {
                                setThuHaiHienTai(prev => prev - 7 * 24 * 60 * 60 * 1000)
                            }}
                            className="text-cyan-800 hover:text-blue-700 cursor-pointer"> Tuần trước đó</p>
                    </div>
                    <div className="flex  justify-end basis-1/2">
                        <p
                            onClick={() => {
                                setThuHaiHienTai(prev => prev + 7 * 24 * 60 * 60 * 1000)
                            }}
                            className="text-cyan-800 hover:text-blue-700 cursor-pointer">Tuần kế tiếp</p>
                    </div>

                </div>
                <div className="w-4/5 bg-[#FFE4E1] rounded-xl p-5">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Phòng / Ngày</th>
                                {daysOfWeek.map((day, index) => {
                                    let ngay = new Date(thuHaiHienTai + index * 24 * 60 * 60 * 1000)
                                    ngay = '(' + ngay.getDate() + '/' + (ngay.getMonth()+1) + '/' + ngay.getFullYear() + ')'

                                    return (
                                        <th key={index} className="border px-4 py-2">
                                            <p>{day}</p>
                                            <p>{ngay}</p>
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {phongHop.map((ph, rowIndex) => {
                                let dayHave = []

                                for (let i = 0; i < ph.lichDangKy.length; i++) {
                                    let ngayDangKy = new Date(ph.lichDangKy[i].ngayDangKy)
                                    ngayDangKy = new Date(ngayDangKy.getFullYear(), ngayDangKy.getMonth(), ngayDangKy.getDate())

                                    if (ngayDangKy.getTime() >= thuHaiHienTai
                                        && ngayDangKy.getTime() <= thuHaiHienTai + 6 * 24 * 60 * 60 * 1000
                                    ) {
                                        if (ngayDangKy.getDay() >= 1) {
                                            dayHave.push(ngayDangKy.getDay() - 1)
                                        }
                                        else {
                                            dayHave.push(6)
                                        }
                                    }
                                }

                                return (
                                    <tr key={rowIndex}>
                                        <td className="border px-4 py-2">{ph.ten}</td>
                                        {
                                            daysOfWeek.map((day, index) => {
                                                if (dayHave.some(dayNum => dayNum == index)) {
                                                    return (
                                                        <td
                                                            key={index}
                                                            className={`border px-4 py-2 bg-[#7FFFD4]`}
                                                        >
                                                            {'Đã được đăng ký'}
                                                        </td>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <td
                                                            key={index}
                                                            className={`border px-4 py-2`}
                                                        >
                                                            {'-'}
                                                        </td>
                                                    )
                                                }
                                            })
                                        }
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RoomTimeTable;

