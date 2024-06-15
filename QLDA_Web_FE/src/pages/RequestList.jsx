import { useState, useContext, useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { TiDelete } from "react-icons/ti";
import { AppContexts } from "../contexts/AppContexts";

import { useNavigate } from "react-router";
const RequestList = () => {

    const {requestsHandling, fetchRequestsHandling} = useContext(AppContexts);
    const [searchInput, setSearchInput] = useState("")
    const [searchEmployees, setSearchEmployees] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        let temp = [];
        for (let i = 0; i < requestsHandling.length; i++) {
            const searchQuery = searchInput.trim().toLowerCase()
            const employeeName = requestsHandling[i].yeuCauId.ten.toLowerCase()
            const isMatch = (employeeName.includes(searchQuery))
            if (isMatch) temp.push(requestsHandling[i])
        }
        setSearchEmployees(temp);

    }, [requestsHandling, searchInput]);


    const handleDeleteBtn = (id) => {
            fetch("http://localhost:8081/v1/api/deleteYeuCauHandle", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: JSON.stringify({
                    "id": id
                  })
            })
            .then(res => res.json())
        .then((data=>{
            if(data)
                {
                    alert("Xóa thành công")
                    fetchRequestsHandling()
                }
            else{
                alert("Xóa thất bại")
            }
        }) 
    
    )
          
    }
    return (
        <div className="flex flex-col min-h-screen relative">
            <Header />
            <div className="pt-28 pb-96 flex flex-col flex-grow w-full items-center ">

                <div className="flex flex-col w-[60%] py-3 ">
                    <div className="flex flex-row bg-[#FFE4E1] rounded-xl">
                        <div className="flex basis-1/4 justify-center">
                            <h3 className="text-xl font-normal: py-2 px-4 ">Tìm kiếm</h3>
                        </div>
                        <div className="flex basis-3/4 ">
                            <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="w-full border rounded-lg px-3"></input>
                        </div>
                    </div>
                    <div className="flex flex-col pt-5">
                    <div  className="flex flex-row justify-between px-4 py-2">
                                        <div className='flex flex-row basis-5/6'>
                                            <label className='font-bold flex w-1/2'> Họ tên </label>
                                            <p className='font-bold flex w-1/2 text-center'> Yêu cầu</p>
                                        </div>
                                        <div className="font-bold flex basis-1/6 items-center justify-between">
                                            <label className=''>Tình Trạng</label>
                                            
                                        </div>
                                    </div>
                        {searchEmployees.length != 0 ?
                            (
                                searchEmployees.map((request) => (
                                    <div key={request._id} className="flex flex-row justify-between px-4 py-2 hover:bg-[#CDB7B5]">
                                        <div onClick={()=> navigate(`/danh-sach-yeu-cau/${request._id}`)} className='flex flex-row basis-5/6 cursor-pointer'>
                                            <label className='font-medium flex w-1/2'> {request.tenNV} </label>
                                            <p className='font-normal flex w-1/2 text-center'> {request.yeuCauId.ten}</p>
                                        </div>
                                        <div className="flex basis-1/6 items-center justify-between">
                                            <label className={`${request.pheDuyet == true ?"text-green-500": request.pheDuyet == false? "text-red-500":"text-blue-700"}`}>
                                                {request.pheDuyet == true ?"Đã duyệt": request.pheDuyet == false? "Đã từ chối":"Chưa xử lý"}
                                                </label>
                                            <TiDelete onClick={() => {handleDeleteBtn(request._id)}} className="size-8 hover:text-red-500 cursor-pointer"/>
                                        </div>
                                    </div>
                                )
                                ))

                            : (
                                <div className="w-full flex justify-center pt-10">
                                    <p className="font-medium text-xl">Không tìm thấy nhân viên</p>
                                </div>
                            )}


                    </div>

                </div>


            </div>
            <Footer />
        </div>
    )
}
export default RequestList