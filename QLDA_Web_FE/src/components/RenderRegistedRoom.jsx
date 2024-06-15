import React, { useState } from 'react';
import { useNavigate } from 'react-router';
const RenderRegisterRoom = ({ datas }) => {

    const getDate = (value) =>{
        let date1 = new Date(value)
        let date2 = date1.getDate() + "/" + (date1.getMonth()+1) + "/" + date1.getFullYear()
        return date2
    }

    return (
        <div className="pt-1 w-full inline-block text-left">
            <div className="w-full rounded-b-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                
                <div className="py-1 flex flex-col items-center">
                <div className='text-sm font-medium w-2/5 flex flex-row h-auto justify-between py-2 px-1'>
                        <div>
                            <p>Mã phòng</p>
                        </div>
                        <div className='flex flex-col'>

                            <div >
                                <p>Ngày đăng ký</p>

                            </div>

                        </div>
                    </div>
                    {datas.map((data, index) => (

                        <div key={index} className='w-2/5 flex flex-row h-auto rounded-md border-2 border-gray-500 justify-between py-5 px-5'>
                            <div>
                                <p>{data.ten}</p>
                            </div>
                            <div className='flex flex-col '>
                            {data.lichDangKy.map((lich) => (
                                <div className='border-t-4 border-cyan-500 mb-4' key={lich._id} >
                                    <p>{getDate(lich.ngayDangKy)}</p>
                                
                                </div>
                                ))}
                            </div>
                        </div>

                    ))}


                </div>
            </div>
        </div>
    );
};

export default RenderRegisterRoom;
