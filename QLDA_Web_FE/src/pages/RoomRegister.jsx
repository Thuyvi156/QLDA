import { useContext, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AppContexts } from "../contexts/AppContexts";
import { useNavigate } from "react-router";

const RoomRegister = () => {
    const [roomDropdown, setRoomDropdown] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [date, setDate] = useState(null)
    const userID = localStorage.getItem("id")
    const navigate = useNavigate()
    const ngay = new Date(date);
    function toggleRoomDropdown() {
        setRoomDropdown(!roomDropdown);
    }

    const handleRoomClick = (room) => {
        setSelectedRoom(room);
        setRoomDropdown(false);
    };

    const { rooms } = useContext(AppContexts)
    const handleSubmit = () => {
        if(!date)
            {
                alert("Vui lòng chọn ngày")
                return
            }
        if(!selectedRoom)
                {
                    alert("Vui lòng chọn phòng")
                    return
                }
            let tempMonth
                if (((parseInt(ngay.getMonth())) + 1) < 10) {
                    tempMonth = "0" + (ngay.getMonth() + 1);
                }
            let ngayDK = ngay.getDate() + "/" + tempMonth + "/" + ngay.getFullYear()
            fetch("http://localhost:8081/v1/api/addNgayPhongHop", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: JSON.stringify({
                    "id": selectedRoom._id,
                    "nhanVienId": userID,
                    "ngayDangKy": ngayDK
                  })
            })
            .then(res => res.json())
        .then((data=>{
            if(data.success)
                {
                    alert("Đăng ký phòng thành công")
                    navigate("/trang-chu")
                }
            else{
                alert(data.message)
            }
        }) 
    
    )
          
    }
    return (
        <div className="flex flex-col min-h-screen relative">
            <Header />
            <div className="pt-28 pb-96 flex flex-col flex-grow w-full items-center justify-center">
                <div className="pb-5">
                <h1 className="font-bold text-2xl pb-3 ">Đăng lý phòng họp</h1>
                </div>
                <div className="px-3 py-5 flex flex-row w-3/5 bg-[#CAE1FF] rounded-xl ">
                    <div className="flex basis-1/5 ">
                        <div className=" flex items-center  ">
                            <label className="bg-[#FFE4E1] w-full px-3 py-3 rounded-xl cursor-pointer" onClick={toggleRoomDropdown}>Chọn phòng</label>
                        </div>
                        {roomDropdown && (
                            <div className=" mt-14 bg-[#FFE4E1] rounded-xl absolute w-1/6 item">
                                {rooms.map((room) => (
                                    <div className="w-full px-3 py-2 hover:bg-[#CDB7B5] hover:text-white" key={room._id}>
                                        <button
                                            className="w-full text-left"
                                            onClick={() => handleRoomClick(room)}>
                                            {room.ten}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                    
                    <div className="flex  basis-3/5 items-center justify-center">
                        <label>{selectedRoom ? selectedRoom.ten : "Chưa chọn phòng"}</label>
                    </div>
                    <div className="flex items-center justify-center px-10">
                        <input value={date} onChange={(e)=> setDate(e.target.value)} className="bg-[#FFE4E1] border border-teal-950 rounded-lg" type="date"></input>
                    </div>
                    <div className="basis-1/5">
                        <button onClick={handleSubmit} className="py-3 px-3 rounded-xl bg-[#FFE4E1]">Đăng ký phòng họp</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RoomRegister;
