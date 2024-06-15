import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import { AppContexts } from "../contexts/AppContexts";
import birthDayImg from "../assets/birthday.gif"

const Home = () => {
    const userID = localStorage.getItem("id")

    // ngayHienTai = new Date(ngayHienTai.getFullYear(), ngayHienTai.getMonth(), ngayHienTai.getDate())
    const [sinhNhat, setSinhNhat] = useState(false)


    useEffect(() => {
        axios.get(`http://localhost:8081/v1/api/getNhanVien/` + userID)
            .then(res => {
                let ngayHienTai = new Date(Date.now())
                let date = new Date(res.data.ngaySinh);
                if (date.getDate() == ngayHienTai.getDate() && date.getMonth() && ngayHienTai.getMonth()) {
                    setSinhNhat(true);
                }
                else {
                    setSinhNhat(false)
                }
            })
            .catch(err => {
                console.log(err)
            })


    }, [userID]);
    const { anns } = useContext(AppContexts);
    return (
        <div className="flex flex-col min-h-screen relative">
            <Header />
            <div className="pt-28 pb-96 flex flex-col flex-grow w-full items-center ">
                <div className={"w-full flex flex-col justify-center items-center pb-5" + `${sinhNhat? "": " hidden"}`}>
                    <div>
                    <h1 className="text-blue-800 font-bold text-xl ">Chúc mừng sinh nhật</h1>
                    </div>
                    <div className="">
                        <img className="w-[300px] h-[200px]" src={birthDayImg} alt="Loading..."/>
                    </div>
                    
                </div>
                <div className="flex justify-center pb-5">
                    <h1 className="text-black font-bold text-2xl ">Bảng thông báo</h1>
                </div>
                <div className="flex flex-col w-[60%]">
                    <div className="">
                        <h3 className="text-xl font-medium py-2 bg-[#E6E6FA] px-4">Thông báo chung</h3>
                    </div>
                    <div>
                        <Announcement options={anns} type={'Chung'} />
                    </div>
                </div>

                <div className="flex flex-col w-[60%]">
                    <div className="">
                        <h3 className="text-xl font-medium py-2 bg-[#E6E6FA] px-4">Thông báo nghỉ</h3>
                    </div>
                    <div>
                        <Announcement options={anns} type={'Nghi'} />
                    </div>
                </div>

                <div className="flex flex-col w-[60%]">
                    <div className="">
                        <h3 className="text-xl font-medium py-2 bg-[#E6E6FA] px-4">Thông báo phòng họp</h3>
                    </div>
                    <div>
                        <Announcement options={anns} type={'PhongHop'} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Home