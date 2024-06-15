import React, {useEffect, useState} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios';
import RenderRegisterRoom from '../components/RenderRegistedRoom';

const RegistedRoom = () => {
    const userID = localStorage.getItem("id")

    const [data,setData]= useState([])

        useEffect(() => {
            axios.get(`http://localhost:8081/v1/api/getPhongHop?nhanVienId=` + userID )
                .then(res => {

                        setData(res.data)
                    
                })
                .catch(err => {
                    console.log(err)
                })
    
    
        }, [userID]);
    
    return (

        <div className="flex flex-col min-h-screen relative items-center">
            <Header />
            <div className=" pt-28 pb-96  flex flex-col flex-grow w-3/5">
                <RenderRegisterRoom datas={data}/>
                

            </div>
            <Footer />
        </div>
    )
}
export default RegistedRoom