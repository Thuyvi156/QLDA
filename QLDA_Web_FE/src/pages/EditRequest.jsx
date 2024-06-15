import { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import axios from "axios";
import { useParams } from "react-router";
// import{use}
import { useNavigate } from "react-router";
import { AppContexts } from "../contexts/AppContexts";

const EditRequest = () => {
    const userID = localStorage.getItem("id")
    const navigate = useNavigate()
    const params = useParams();
    const {fetchRequestsHandling} = useContext(AppContexts)
    const results = [
        {
            name: "Chấp nhận",
            value: true
        },
        {
            name: "Từ chối",
            value: false
        },

    ]
    const [ResultDropdown, setResultDropdown] = useState(false);
    

    const [ten, setTen] = useState("");
    const [noiDung, setNoiDung] = useState("");
    const [lyDo, setLyDo] = useState("");

    const [pheDuyet, setPheDuyet] = useState()
    const [done,setDone] = useState()
    const [phanHoi, setPhanHoi] = useState("");
    const [tenNV, setTenNV] = useState("")

    const handleResultClick = (value) => {
        setPheDuyet(value);
        setResultDropdown(false);
    };

    useEffect(() => {
        axios.get(`http://localhost:8081/v1/api/getYeuCauHandle?id=` + params.id)
            .then(res => {
                setTen(res.data.yeuCauId.ten);
                setNoiDung(res.data.yeuCauId.noiDung);
                setLyDo(res.data.noiDung)
                setDone(res.data?.pheDuyet);
                if(done != "undefined")
                    {
                        setPheDuyet(res.data.pheDuyet)
                    }
                setTenNV(res.data.nhanVienId.ten)

            })
            .catch(err => {
                console.log(err)
            })


    }, [done, params.id, userID]);

    const handleSubmit = () => {
        if(!phanHoi)
            {
                alert("Vui lòng chọn yêu cầu")
                return
            }
            fetch("http://localhost:8081/v1/api/updateYeuCauHandle", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: JSON.stringify({
                    "id": params.id,
                    "pheDuyet": pheDuyet,
                    "phanHoi": phanHoi
                  })
            })
            .then(res => res.json())
        .then((data=>{
            if(data)
                {
                    alert("Xét thành công")
                    navigate("/yeu-cau-can-xu-ly")
                    fetchRequestsHandling()

                }
            else{
                alert("Xét thất bại")
            }
        }) 

    )

    }
    return (

        <div className="flex flex-col min-h-screen relative">
            <Header />
            <div className="pt-28 pb-96 flex flex-col flex-grow w-full items-center justify-center">
                <div className="flex flex-col w-3/5 bg-white shadow-xl rounded-xl items-center justify-center ">
                    <div className="flex justify-center items-center py-5">
                        <h1 className="font-bold text-2xl">Xét Yêu cầu </h1>
                    </div>
                    
                    <div className="flex flex-col w-full px-10">

                        <div className="flex w-4/5 px-10 py-4">
                            <label className="w-4/5 text-left">Tên nhân viên: {tenNV}</label>
                        </div>
                        <div className="flex px-10 w-4/5">
                            <label className="w-4/5 text-left">Loại đơn: {ten}</label>
                        </div>

                    </div>

                    <div className="pt-5 px-10">
                        <label className="px-10 w-full text-center italic">{noiDung}</label>
                    </div>
                    <div className="flex flex-col py-5 w-full justify-center items-center">
                        <p className="w-4/5 pb-3 text-left">Lý do:</p>
                        <p  className="w-4/5 border-4 flex "> {lyDo}
                        </p>
                    </div>
                    <div className="flex flex-col py-5 w-full justify-center items-center">
                        <p className="w-4/5 pb-3 text-left">Phản hồi:</p>
                        <textarea onChange={(e) => setPhanHoi(e.target.value)} className="w-4/5 border-4 flex " rows={4} cols={20} value={phanHoi}>
                        </textarea>
                    </div>
                    <div className="py-5 flex flex-row w-1/4 justify-between items-center">
                        <div>
                            <button className="bg-[#FFE4E1] hover:bg-[#CDB7B5] hover:text-white rounded-lg py-2 px-2 " onClick={()=>setResultDropdown(true)} >Xét duyệt:</button>
                        </div>
                        {ResultDropdown && (
                            <div className=" mt-32 bg-[#FFE4E1] rounded-xl absolute w-1/6 item">
                                {results.map((rs, index) => (
                                    <div className=" w-full px-3 py-2 hover:bg-[#CDB7B5] hover:text-white" key={index}>
                                        <button
                                            className=" w-full text-left"
                                            onClick={() => handleResultClick(rs.value)}>
                                            {rs.name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div>
                            <label> {pheDuyet==true?"Chấp nhận":pheDuyet==false?"Từ chối":"Chưa chọn"}</label>
                        </div>
                    </div>
                    <div className=" flex justify-center items-center pt-20 pb-5">
                        <button onClick={handleSubmit} className="bg-[#FFE4E1] rounded-xl text-zinc-500 text-lg px-16 py-2 hover:bg-[#CDB7B5] hover:text-white ">Xét</button>
                    </div>


                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditRequest;
