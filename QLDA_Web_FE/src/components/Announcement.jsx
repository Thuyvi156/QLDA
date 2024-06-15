import React, { useState } from 'react';
import { useNavigate } from 'react-router';
const Announcement = ({ options, type }) => {
const navigate = useNavigate();

const getDate = (value) =>{
    let date1 = new Date(value)
    let date2 = date1.getDate() + "/" + (date1.getMonth()+1) + "/" + date1.getFullYear()
    return date2
}
    return (
        <div className="pt-1 w-full inline-block text-left">
            <div className="w-full rounded-b-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1 mb-5">
                    {options.map((ann) => (
                        ann.loai === type ? (
                            <div onClick={()=> navigate(`/thong-bao/${ann._id}`)} key={ann._id} className="border-t-2 flex flex-col justify-between px-4 py-2 hover:bg-zinc-300 cursor-pointer">
                                <div className='flex flex-col'>
                                    <label className='font-bold'> {ann.ten} </label>
                                    <p className='font-thin italic'> {getDate(ann.createdAt)}</p>
                                </div>
                                <div>
                                    <label className=''>{ann.noiDung.slice(0, 100)}...</label>
                                </div>
                            </div>
                        ) : type === null?(
                            <div onClick={()=> navigate(`/thong-bao/${ann._id}`)} key={ann._id} className="border-t-2  flex flex-col justify-between px-4 py-5 hover:bg-zinc-300 cursor-pointer">
                                <div className='flex flex-col'>
                                    <label className='font-bold'> {ann.ten} </label>
                                    <p className='font-thin italic'> {getDate(ann.createdAt)}</p>
                                </div>
                                <div>
                                    <label className=''>{ann.noiDung.slice(0, 100)}...</label>
                                </div>
                            </div>
                        ): null
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Announcement;
