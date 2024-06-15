import { useState, useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const UserRequests = () => {

    const userID = localStorage.getItem("id")
    const [datas, setDatas] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8081/v1/api/getYeuCauHandle?nhanVienId=` + userID )
            .then(res => {

                    setDatas(res.data)
                
            })
            .catch(err => {
                console.log(err)
            })


    }, [userID]);

    
    return (
        <div className="flex flex-col min-h-screen relative">
            <Header />
            <div className="pt-28 pb-96 flex flex-col flex-grow w-full items-center ">
                <div className="flex flex-col w-[60%] py-3">
                    <div className="flex flex-col">
                    <div  className="flex flex-row justify-between px-4 py-2">
                                        <div className='flex flex-row basis-5/6'>
                                            <label className='font-bold flex w-1/2'> Yêu cầu </label>
                                            <p className='font-bold flex w-1/2 text-center'> Phản hồi</p>
                                        </div>
                                        <div className="font-bold flex basis-1/6 items-center justify-between">
                                            <label className=''>Tình Trạng</label>
                                            
                                        </div>
                                    </div>
                        
                                {datas.map((data) => (
                                    <div key={data._id} className="border-t-2 flex flex-row justify-between px-4 py-2 hover:bg-cyan-400">
                                        <div className='flex flex-row basis-5/6'>
                                            <label className=' flex w-1/2'> {data.yeuCauId.ten} </label>
                                            <p className='font-normal flex w-1/2 text-center'> {data.phanHoi}</p>
                                        </div>
                                        <div className="flex basis-1/6 items-center justify-between">
                                            <label className={`${data.pheDuyet == true ?"text-green-500": data.pheDuyet == false? "text-red-500":"text-blue-700"}`}>
                                                {data.pheDuyet == true ?"Đã duyệt": data.pheDuyet == false? "Đã từ chối":"Chưa xử lý"}
                                                </label>
                                        </div>
                                    </div>
                                )
                                )}

                            


                    </div>

                </div>


            </div>
            <Footer />
        </div>
    )
}
export default UserRequests