import { useContext, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContexts } from '../contexts/AppContexts';

const EmployeeInfo = () => {
    const [phongBanDropDown, setPhongBanDropDown] = useState(false)
    const [chucVuDropDown, setChucVuDropDown] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [soDienThoai, setSoDienThoai] = useState('')
    const [ngaySinh, setNgaySinh] = useState(null)
    const [phongBan, setPhongBan] = useState('')
    const [phongBan2, setPhongBan2] = useState(null)
    const [chucVu, setChucVu] = useState(null)
    const [taiKhoan, setTaiKhoan] = useState("")
    const [password, setPassWord] = useState("")
    const [password2, setPassWord2] = useState("")
    const navigate = useNavigate()
    const {fetchEmployees} = useContext(AppContexts)

    const handleClick = () => {
        const form = new FormData();
        
        form.append("ten", name);
        let time = ngaySinh.split("-")
        const ngaySinhUpdate = time[2] + "/" + time[1] + "/" + time[0]
        form.append("ngaySinh", ngaySinhUpdate);
        form.append("soDienThoai", soDienThoai);
        form.append("email", email);
        form.append("phongBan", phongBan);
        form.append("truongPhong", chucVu);
        form.append("taiKhoan", taiKhoan);
        form.append("matKhau", password);

        if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            alert("Email không hợp lệ")
            return
        }
        if (!soDienThoai.match(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)) {
            alert("Số điện thoại không hợp lệ")
            return
        }

        if (password!=password2 )
            {
                alert("Mật khẩu không trùng khớp")
                return 
            }
        else if (password.length < 6)
            {
                alert("Yêu cầu mật khẩu ít nhất 6 ký tự")
                return
            }


        axios.post("http://localhost:8081/v1/api/addNhanVien", form, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((res) => {
                if (res.data) {
                    alert("Thêm thành công")
                    navigate("/danh-sach-nhan-vien")
                    fetchEmployees()
                }
                else {
                    alert("Thêm thất bại")
                }
            }
            )
            .catch(err => {
                console.log(err)
            })
        

    }
    const handleCvClick = (value) => {
        setChucVu(value)
        setChucVuDropDown(!chucVuDropDown)
    }
    
    const handlePBClick = (value) => {
        switch(value) {
            case "Hành Chính":
                setPhongBan("HanhChinh")
                setPhongBan2(value)
            break;
            case "Nhân Sự":
                setPhongBan("NhanSu")
                setPhongBan2(value)
            break;
            case "Kế Toán":
                setPhongBan("HanhChinh")
                setPhongBan2(value)
            break;
            default:
                setPhongBan("NhanSu")
                setPhongBan2(value)
            break;
}
        setPhongBanDropDown(!phongBanDropDown)
    }
    return (

        <div className="flex flex-col min-h-screen relative items-center">
            <Header />
            <div className=" pt-28 pb-96  flex flex-col flex-grow w-3/5 items-center justify-center ">
                <div className='mt-8 shadow-xl flex flex-col justify-between items-center w-10/12'>
                    <div className='py-5 pb-5  flex flex-row w-4/5'>
                        <div className='flex basis-1/5 items-center'>
                            <p>Họ và tên</p>
                        </div>
                        <div className='flex basis-3/5'>
                            <input  onChange={(e) => setName(e.target.value)} value={name} className='border py-1 rounded-md pl-3 w-full'></input>
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
                            <p>Tài Khoản</p>
                        </div>
                        <div className='flex basis-3/5'>
                            <input onChange={(e) => setTaiKhoan(e.target.value)} value={taiKhoan} className='border py-1 rounded-md pl-3 w-full'></input>
                        </div>
                    </div>
                    <div className='py-5 pb-5  flex flex-row w-4/5 items-center'>
                        <div className='flex basis-1/5'>
                            <p>Mật khẩu</p>
                        </div>
                        <div className='flex basis-3/5'>
                            <input onChange={(e) => setPassWord(e.target.value)} value={password} type='password' className='border py-1 rounded-md pl-3 w-full'></input>
                        </div>
                    </div>
                    <div className='py-5 pb-5  flex flex-row w-4/5 items-center'>
                        <div className='flex basis-1/5'>
                            <p>Nhập lại mật khẩu</p>
                        </div>
                        <div className='flex basis-3/5'>
                            <input onChange={(e) => setPassWord2(e.target.value)} value={password2} type='password' className='border py-1 rounded-md pl-3 w-full'></input>
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
                            <button onClick={() => setPhongBanDropDown(true)} className='text-left border py-1 rounded-md pl-3 w-full'>
                            {phongBan2=="HanhChinh"? "Hành chính" : phongBan2=="NhanSu"? "Nhân Sự": phongBan2=="KeToan"? "Kế Toán": phongBan2=="AnNinh"? "An Ninh":""}
                            </button>
                            {phongBanDropDown && (
                                <div className=" mt-10 bg-[#FFE4E1] rounded-xl absolute w-1/3 item">

                                    <div className="w-full px-3 py-2 hover:bg-[#CDB7B5] hover:text-white" >
                                        <button
                                            className="w-full text-left"
                                            onClick={() => handlePBClick("HanhChinh")}>
                                            Hành chính
                                        </button>
                                    </div>
                                    <div className="w-full px-3 py-2 hover:bg-[#CDB7B5] hover:text-white" >
                                        <button
                                            className="w-full text-left"
                                            onClick={() => handlePBClick("NhanSu")}>
                                            Nhân sự
                                        </button>
                                    </div>
                                    <div className="w-full px-3 py-2 hover:bg-[#CDB7B5] hover:text-white" >
                                        <button
                                            className="w-full text-left"
                                            onClick={() => handlePBClick("KeToan")}>
                                            Kế Toán
                                        </button>
                                    </div>
                                    <div className="w-full px-3 py-2 hover:bg-[#CDB7B5] hover:text-white" >
                                        <button
                                            className="w-full text-left"
                                            onClick={() => handlePBClick("AnNinh")}>
                                            An Ninh
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='py-5 pb-5  flex flex-row w-4/5'>
                        <div className='flex basis-1/5'>
                            <p>Chức vụ</p>
                        </div>
                        <div className='flex basis-3/5'>
                            <button onClick={() => setChucVuDropDown(!chucVuDropDown)} className='border py-1 rounded-md pl-3 w-full text-left'>
                            {chucVu==true? "Trưởng phòng" : chucVu==false?"Nhân viên":""}
                            </button>
                            {chucVuDropDown && (
                                <div className=" mt-10 bg-[#FFE4E1] rounded-xl absolute w-1/3 item">

                                    <div className="w-full px-3 py-2 hover:bg-[#CDB7B5] hover:text-white" >
                                        <button
                                            className="w-full text-left"
                                            onClick={() => handleCvClick(false)}>
                                            Nhân viên
                                        </button>
                                    </div>
                                    <div className="w-full px-3 py-2 hover:bg-[#CDB7B5] hover:text-white" >
                                        <button
                                            className="w-full text-left"
                                            onClick={() => handleCvClick(true)}>
                                            Trưởng phòng
                                        </button>
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                    <div className='pb-5'>
                        <button onClick={handleClick} className='px-3 py-3 bg-[#FFE4E1] rounded-lg hover:bg-[#CDB7B5]'>Thêm nhân viên</button>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}
export default EmployeeInfo