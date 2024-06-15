import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import RequestRender from "../components/RequestRender";

const Requests = () => {
    const testDatas = [
        {
            yeucau: 'Khẳng định',
            nhanvien: 'Con Rồng Cháu Tiên', 
            noidung: 'Hoàng Sa, Trường Sa là của Việt Nam',
            pheduyet: 'true',
            phanHoi:''
        },
        {
            yeucau: 'Khẳng định',
            nhanvien: 'Con Rồng Cháu Tiên', 
            noidung: 'Hoàng Sa, Trường Sa là của Việt Nam',
            pheduyet: 'false',
            phanHoi:''
        },
        {
            yeucau: 'Khẳng định',
            nhanvien: 'Con Rồng Cháu Tiên', 
            noidung: 'Hoàng Sa, Trường Sa là của Việt Nam',
            pheduyet: '',
            phanHoi:''
        },
        {
            yeucau: 'Khẳng định',
            nhanvien: 'Con Rồng Cháu Tiên', 
            noidung: 'Hoàng Sa, Trường Sa là của Việt Nam',
            pheduyet: '',
            phanHoi:''
        }

    ]
    return (
        <div className="flex flex-col min-h-screen relative">
            <Header />
            <div className="pt-28 pb-96 flex flex-col flex-grow w-full items-center ">
                <div className="flex justify-center pb-5">
                    <h1 className="text-black font-bold text-2xl ">Các yêu cầu</h1>
                </div>
                <div className="flex flex-col w-[60%]">
                    <div>
                        <RequestRender requests={testDatas}/>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}
export default Requests