import React, { useContext, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AppContexts } from "../contexts/AppContexts";
// import{use}
import { useNavigate } from "react-router";

const AddAnn = () => {
    const types = [{ loai: "Chung" }, { loai: "Nghi" }, { loai: "PhongHop" }]
    const userID = localStorage.getItem("id")
    const navigate = useNavigate()
    const {fetchAnns} = useContext(AppContexts)

    const [typeDropdown, setTypeDropdown] = useState(false);
    const [selectedType, setSelectedType] = useState({});
    const [title, setTitle] = useState("");
    const [context, setContext] = useState("");

    const handleTypeClick = (type) => {
        setSelectedType(type);
        setTypeDropdown(false);
    };

    function toggleTypeDropdown() {
        setTypeDropdown(!typeDropdown);
    }

    const hanleInputchange = (event) => {
        setContext(event.target.value)
    }

    const handleSubmit = () => {
        if (!selectedType) {
            alert("Vui lòng chọn lại loại")
            return
        }
        if (!title) {
            alert("Vui lòng nhập tiêu đề thông báo")
            return
        }
        if (!context) {
            alert("Vui lòng nhập chi tiết thông báo")
            return
        }
        fetch("http://localhost:8081/v1/api/addThongBao", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                "nhanVienId": userID,
                "ten": title,
                "noiDung": context,
                "loai": selectedType.loai,
            })
        })
            .then(res => res.json())
            .then((data => {
                if (data) {
                    alert("Tạo thông báo thành công")
                    fetchAnns()
                    navigate("/trang-chu")
                    
                }
                else {
                    alert("Tạo thông báo thất bại")
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
                        <h1 className="font-bold text-2xl">Tạo thông báo</h1>
                    </div>
                    <div className="flex flex-row w-2/3 items-center justify-center ">
                        <div className=" flex basis-1/3 items-center justify-center  ">
                            <label className="bg-[#FFE4E1] rounded-md px-2 py-2 cursor-pointer text-center" onClick={toggleTypeDropdown}>Chọn loại thông báo</label>
                        </div>
                        {typeDropdown && (
                            <div className=" mt-10 bg-[#FFE4E1] rounded-xl absolute w-1/3 item">
                                {types.map((type, index) => (
                                    <div className="w-full px-3 py-2 hover:bg-[#CDB7B5] hover:text-white" key={index}>
                                        <button
                                            className="w-full text-left"
                                            onClick={() => handleTypeClick(type)}>
                                            {type.loai =="Nghi"?"Thông báo nghỉ":type.loai =="Chung"?"Thông báo chung":"Thông báo phòng họp"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex bg-[#FFE4E1] rounded-md px-2 py-2 cursor-pointer basis-1/3">
                            <label className="w-full text-center">{selectedType.loai =="Nghi"?"Thông báo nghỉ":selectedType.loai =="Chung"?"Thông báo chung":selectedType.loai =="PhongHop"? "Thông báo phòng họp":"Chưa chọn loại thông báo"}</label>
                        </div>

                    </div>

                    <div className="flex flex-col py-5 w-full justify-center items-center">
                        <p className="w-4/5 pb-3 text-left">Tiêu đề thông báo</p>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tiêu đề thông báo" className="py-3 pl-3 w-4/5 border rounded-xl border-stone-900"></input>
                    </div>
                    <div className="flex flex-col py-5 w-full justify-center items-center">
                        <p className="w-4/5 pb-3 text-left">Chi tiết thông báo:</p>
                        <textarea className="w-4/5 border-4 flex " rows={4} cols={20} value={context} onChange={hanleInputchange} >

                        </textarea>
                    </div>
                    <div className=" flex justify-center items-center py-5">
                        <button onClick={handleSubmit} className="bg-[#FFE4E1] rounded-xl text-zinc-500 text-lg px-16 py-2 hover:bg-[#CDB7B5] hover:text-white ">Tạo thông báo</button>
                    </div>


                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddAnn;
