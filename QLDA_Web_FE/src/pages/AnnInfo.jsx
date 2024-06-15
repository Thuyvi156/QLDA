import React, {useEffect, useState} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios';
import { useParams } from 'react-router-dom';
const AnnInfo = () => {
    const params = useParams();
    const [title, setTitle] = useState("")
    const [noiDung, setNoiDung] = useState("")
    const [date, SetDate] = useState("")

        useEffect(() => {
            axios.get(`http://localhost:8081/v1/api/getThongBao/` + params.id )
                .then(res => {
                    setTitle(res.data.ten);
                    setNoiDung(res.data.noiDung);
                    let d = new Date(res.data.createdAt);
                    let tempMonth
                    if (((parseInt(d.getMonth())) + 1) < 10) {
                        tempMonth = "0" + (d.getMonth() + 1);
                    }
                    SetDate(d.getDate() + "-" + tempMonth + "-" + d.getFullYear())

                    
                })
                .catch(err => {
                    console.log(err)
                })
    
    
        }, [params._id, params.id]);
    
    return (

        <div className="flex flex-col min-h-screen relative items-center">
            <Header />
            <div className=" pt-28 pb-96  flex flex-col flex-grow w-3/5">
                <div className='pt-8 shadow-xl flex flex-col justify-between'>
                    <div className='px-5 py-5'>
                        <h3 className='font-medium text-xl'>{title}</h3>

                    </div>
                    <div className='px-5 pb-5'>
                        <p className='font-thin italic'>{date}</p>
                    </div>
                    <div className='px-5 pb-5'>
                        <p className='font-normal tracking-wider leading-loose'>{noiDung}</p>
                    </div>
                    <div>

                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}
export default AnnInfo