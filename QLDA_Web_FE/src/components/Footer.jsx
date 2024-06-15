import React from "react";

// import {NavLink} from "react-router"
const Footer = () => {
    return (
        <div className="border flex flex-row p-10 bg-[#E6E6FA] text-neutral-content absolute bottom-0 w-full">
            <div className="flex flex-col w-1/3">
                <div>
                    <h2 className="text-2xl font-bold">Công ty ABC</h2>
                </div>
                <div className="py-5">
                    <p>Uy tín làm nên thương hiệu</p>
                </div>
            </div>
            <div className="flex flex-col w-1/3 px-10">
                <div className="py-2">
                    <p className="font-semibold text-xl">Liên hệ</p>
                </div>
                <div className="flex flex-row">

                    <div>
                        <p className="py-2"> Phạm Thanh Thúy Vi</p>
                        <p className="py-2"> Lê Yến Vi</p>
                        <p className="py-2"> Nguyễn Duy Tân</p>
                        <p className="py-2"> Nguyễn Hồng Nhật Long</p>
                    </div>
                    <div className="px-3">
                        <p className="py-2"> - Trưởng phòng Hành chính - 0935561832</p>
                        <p className="py-2"> - 0987456231</p>
                        <p className="py-2"> - Trưởng phòng nhân sự - 0312456789</p>
                        <p className="py-2"> - 0756132897</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer