import { useState, useContext, useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { TiDelete } from "react-icons/ti";
import { AppContexts } from "../contexts/AppContexts";

import { useNavigate } from "react-router";
const EmployeeList = () => {

    const {employees, fetchEmployees} = useContext(AppContexts);
    const [searchInput, setSearchInput] = useState("")
    const [searchEmployees, setSearchEmployees] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        let temp = [];
        for (let i = 0; i < employees.length; i++) {
            const searchQuery = searchInput.trim().toLowerCase()
            const employeeName = employees[i].ten.toLowerCase()
            const isMatch = (employeeName.includes(searchQuery))
            if (isMatch) temp.push(employees[i])
        }
        setSearchEmployees(temp);

    }, [employees, searchInput]);

    const handleDeleteBtn = (id) => {
            fetch("http://localhost:8081/v1/api/deleteNhanVien", {
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
                    fetchEmployees()
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
                <div className="flex flex-row items-center justify-between w-[60%]">

                    <div className="flex justify-center pb-5 basis-4/5">
                        <h1 className="text-black font-bold text-xl ">Danh sách các nhân viên</h1>
                    </div>
                    <div className="flex basis-1/5 ">
                        <button onClick={()=>navigate("/them-nhan-vien")}
                             className="w-full py-2 px-2 rounded-lg bg-[#FFE4E1] hover:bg-[#CDB7B5]">Thêm nhân viên</button>
                    </div>
                </div>
                <div className="flex flex-col w-[60%] py-3">
                    <div className="flex flex-row bg-[#FFE4E1] rounded-xl">
                        <div className="flex basis-1/4 justify-center">
                            <h3 className="text-xl font-normal: py-2 px-4 ">Tìm kiếm</h3>
                        </div>
                        <div className="flex basis-3/4 ">
                            <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="w-full border rounded-lg px-3"></input>
                        </div>
                    </div>
                    <div className="flex flex-col">
                    <div  className="flex flex-row justify-between px-4 py-2">
                                        <div className='flex flex-row basis-5/6'>
                                            <label className='font-bold flex w-1/2'> Họ tên </label>
                                            <p className='font-bold flex w-1/2 text-center'> Phòng Ban</p>
                                        </div>
                                        <div className="font-bold flex basis-1/6 items-center justify-between">
                                            <label className=''>Số điện thoại</label>
                                            
                                        </div>
                                    </div>
                        {searchEmployees.length != 0 ?
                            (
                                searchEmployees.map((employee) => (
                                    <div key={employee._id} className="flex flex-row justify-between px-4 py-2 hover:bg-[#FFE4E1]">
                                        <div onClick={()=> navigate(`/danh-sach-nhan-vien/${employee._id}`)} className='flex flex-row basis-5/6 cursor-pointer'>
                                            <label className='font-medium flex w-1/2'> {employee.ten} </label>
                                            <p className='font-normal flex w-1/2 text-center'> {employee.phongBan=="NhanSu"? "Nhân Sự" :employee.phongBan=="HanhChinh"? "Hành Chính":employee.phongBan=="KeToan"? "Kế Toán": employee.phongBan=="An Ninh"? "An Ninh": "" }</p>
                                        </div>
                                        <div className="flex basis-1/6 items-center justify-between">
                                            <label className=''>{employee.soDienThoai}</label>
                                            <TiDelete onClick={() => {handleDeleteBtn(employee._id)}} className="size-8 hover:text-red-500 cursor-pointer"/>
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
export default EmployeeList