import { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContexts } from '../contexts/AppContexts';
import { useParams } from 'react-router-dom';

const EditEmployeeInfo = () => {
    const userID = localStorage.getItem("id")
    const navigate = useNavigate();
    const params = useParams()
    const { fetchEmployees } = useContext(AppContexts);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [soDienThoai, setSoDienThoai] = useState('')
    const [ngaySinh, setNgaySinh] = useState(null)
    const [phongBan, setPhongBan] = useState('')
    const [chucVu, setChucVu] = useState(false)
    const [CVDropdown, setCVDropdown] = useState(false);
    const [pbDropdown, setPBDropdown] = useState(false);

    function toggleCVDropdown() {
        setCVDropdown(!CVDropdown);
    }
    const handleCVClick = (cv) => {
        setChucVu(cv.giaTri);
        setCVDropdown(false);
    };
    function togglePBDropdown() {
        setPBDropdown(!pbDropdown);
    }
    const handlePBClick = (pb) => {
        setPhongBan(pb.giaTri);
        setPBDropdown(false);
    };
    const cvData = [{ loai: "Nhân viên", giaTri: false }, { loai: "Trưởng phòng", giaTri: true }]
    const pbData = [{ loai: "Hành chính", giaTri: "HanhChinh" }, { loai: "Nhân sự", giaTri: "NhanSu" }, { loai: "Kế Toán", giaTri: "KeToan" }, { loai: "An Ninh", giaTri: "AnNinh" }]

    useEffect(() => {
        axios.get(`http://localhost:8081/v1/api/getNhanVien/` + params.id)
            .then(res => {
                setName(res.data.ten);
                setSoDienThoai(res.data.soDienThoai);
                let date = new Date(res.data.ngaySinh);
                let tempMonth
                if (((parseInt(date.getMonth())) + 1) < 10) {
                    tempMonth = "0" + (date.getMonth() + 1);
                }
                setNgaySinh(date.getFullYear() + "-" + tempMonth + "-" + date.getDate())
                setEmail(res.data.email)
                setPhongBan(res.data.phongBan);
                setChucVu(res.data.truongPhong);

            })
            .catch(err => {
                console.log(err)
            })


    }, [params._id, userID]);



    const handleClick = () => {
        const form = new FormData();
        form.append("id", params.id);
        form.append("ten", name);
        let time = ngaySinh.split("-")
        const ngaySinhUpdate = time[2] + "/" + time[1] + "/" + time[0]
        form.append("ngaySinh", ngaySinhUpdate);
        form.append("soDienThoai", soDienThoai);
        form.append("email", email);
        form.append("phongBan", phongBan);
        form.append("truongPhong", chucVu);

        if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            alert("Email không hợp lệ")
            return
        }
        if (!soDienThoai.match(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)) {
            alert("Số điện thoại không hợp lệ")
            return
        }
        axios.put("http://localhost:8081/v1/api/updateNhanVien", form, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((res) => {
                if (res.data) {
                    alert("Sửa thành công")
                    navigate("/danh-sach-nhan-vien")
                    fetchEmployees()
                }
                else {
                    alert("Sửa thất bại")
                }
            }
            )
            .catch(err => {
                console.log(err)
            })

    }


    return (

        <div className="flex flex-col min-h-screen relative items-center">
            <Header />
            <div className=" pt-28 pb-96  flex flex-col flex-grow w-3/5 items-center justify-center ">
                <div className='mt-8 shadow-xl flex flex-col justify-between items-center w-10/12'>
                    <div className='pb-5'>
                        <h1 className='font-medium text-xl' >Thông tin nhân viên {name}</h1>
                    </div>
                    <div className='py-5 pb-5  flex flex-row w-4/5'>

                        <div className='flex basis-1/5 items-center'>
                            <p>Họ và tên</p>
                        </div>
                        <div className='flex basis-3/5'>
                            <input onChange={(e) => setName(e.target.value)} value={name} className='border py-1 rounded-md pl-3 w-full'></input>
                        </div>
                    </div>
                    <div className='py-5 pb-5  flex flex-row w-4/5 items-center'>
                        <div className='flex basis-1/5'>
                            <p>Số điện thoại</p>
                        </div>
                        <div className='flex basis-3/5'>
                            <input onChange={(e) => setSoDienThoai(e.target.value)} value={soDienThoai} className='border py-1 rounded-md pl-3 w-full'></input>
                        </div>
                    </div>
                    <div className='py-5 pb-5  flex flex-row w-4/5 items-center'>
                        <div className='flex basis-1/5'>
                            <p>Email</p>
                        </div>
                        <div className='flex basis-3/5'>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border py-1 rounded-md pl-3 w-full'></input>
                        </div>
                    </div>
                    <div className='py-5 pb-5  flex flex-row w-4/5 items-center'>
                        <div className='flex basis-1/5'>
                            <p>Ngày sinh</p>
                        </div>
                        <div className='flex basis-3/5'>
                            <input value={ngaySinh} onChange={(e) => setNgaySinh(e.target.value)} type="date" className='border py-1 rounded-md pl-3 w-full'></input>
                            {/* console.log(typeOf ) */}
                        </div>
                    </div>
                    <div className='py-5 pb-5  flex flex-row w-4/5'>
                        <div className='flex basis-1/5'>
                            <p>Phòng ban</p>
                        </div>
                        <div className='flex basis-3/5'>
                            <input onClick={togglePBDropdown} value={phongBan == "NhanSu" ? "Nhân Sự" : "Hành Chính"} className='border py-1 rounded-md pl-3 w-full'></input>
                        </div>
                        {pbDropdown && (
                            <div className=" mt-10 bg-cyan-300 rounded-xl absolute w-1/3 item">
                                {pbData.map((pb, index) => (
                                    <div className="w-full px-3 py-2 hover:bg-cyan-950 hover:text-white" key={index}>
                                        <button
                                            className="w-full text-left"
                                            onClick={() => handlePBClick(pb)}>
                                            {pb.loai}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className='py-5 pb-5  flex flex-row w-4/5'>
                        <div className='flex basis-1/5'>
                            <p>Chức vụ</p>
                        </div>
                        <div className='flex basis-3/5'>
                            <input onClick={toggleCVDropdown} value={chucVu ? "Trưởng phòng" : "Nhân viên"} className='border py-1 rounded-md pl-3 w-full'></input>
                        </div>
                        {CVDropdown && (
                            <div className=" mt-10 bg-cyan-300 rounded-xl absolute w-1/3 item">
                                {cvData.map((cv, index) => (
                                    <div className="w-full px-3 py-2 hover:bg-cyan-950 hover:text-white" key={index}>
                                        <button
                                            className="w-full text-left"
                                            onClick={() => handleCVClick(cv)}>
                                            {cv.loai}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className='pb-5'>
                        <button onClick={handleClick} className='px-3 py-3 bg-[#FFE4E1] rounded-lg hover:bg-[#CDB7B5]'>Cập nhật thông tin</button>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}
export default EditEmployeeInfo