import {useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios';

const EmployeeInfo = () => {
    const userID = localStorage.getItem("id")

    
    const [allImages, setAllImages] = useState([])
    const [image, setImage] = useState([])
    const [imageGet, setImageGet] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [soDienThoai, setSoDienThoai] = useState('')
    const [ngaySinh, setNgaySinh] = useState(null)
    const [phongBan, setPhongBan] = useState('')
    const [chucVu, setChucVu] = useState(false)


    useEffect(() => {
        axios.get(`http://localhost:8081/v1/api/getNhanVien/` + userID)
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
                // console.log(res.data.phongBan)
                setPhongBan(res.data.phongBan);
                setChucVu(res.data.truongPhong);
                setImage(res.data.avatar)
            })
            .catch(err => {
                console.log(err)
            })


    }, [userID]);


    
    const handleClick = () => {
        const form = new FormData();
        form.append("id", userID);
        form.append("ten", name);
        let time = ngaySinh.split("-")
        const ngaySinhUpdate = time[2] + "/" + time[1] + "/" + time[0]
        form.append("ngaySinh", ngaySinhUpdate);
        form.append("soDienThoai", soDienThoai);
        form.append("email", email);
        console.log(imageGet[0])
        form.append("avatar", imageGet)

        if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            alert("Email không hợp lệ")
            return
        }
        if (!soDienThoai.match(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)){
            alert("Số điện thoại không hợp lệ")
            return
        }
        axios.put("http://localhost:8081/v1/api/updateNhanVien", form,  {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
            if (res.data) {
                alert("Sửa thành công")
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
    const handleImageChange = (event) => {
        setAllImages([])
        setImageGet(event.target.files[0])

        const files = event.target.files;
        const imagesArray = [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();

            reader.onload = function (e) {
                imagesArray.push(e.target.result);
                if (imagesArray.length === files.length) {
                    setAllImages(prev => {
                        setImage(imagesArray)

                        return [...prev, ...imagesArray]
                    });
                }
            };

            reader.readAsDataURL(files[i]);
        }

    };

    return (

        <div className="flex flex-col min-h-screen relative items-center">
            <Header />
            <div className=" pt-28 pb-96  flex flex-col flex-grow w-3/5 items-center justify-center ">
                <div className='mt-8 shadow-xl flex flex-col justify-between items-center w-10/12'>
                <div className='pb-5'>
                        <h1 className='font-medium text-xl' >Thông tin nhân viên</h1>
                    </div>
                    <div className='flex flex-col items-center justify-between w-3/4'>
                        <div>
                        <img src={image} className=' w-40 h-40 rounded-full' />
                        </div>
                        <div className='py-5'>
                        <input type="file" name="upload" accept='.png, .jpg'
                            onChange={handleImageChange}></input>
                            </div>
                            

                    </div>
                    <div className='py-5 pb-5  flex flex-row w-4/5'>

                        <div className='flex basis-1/5 items-center'>
                            <p>Họ và tên</p>
                        </div>
                        <div className='flex basis-3/5'>
                            <input value={name} onChange={(e)=> setName(e.target.value)} className='border py-1 rounded-md pl-3 w-full'></input>
                        </div>
                    </div>
                    <div className='py-5 pb-5  flex flex-row w-4/5 items-center'>
                        <div className='flex basis-1/5'>
                            <p>Số điện thoại</p>
                        </div>
                        <div className='flex basis-3/5'>
                            <input onChange={(e)=> setSoDienThoai(e.target.value)} value={soDienThoai} className='border py-1 rounded-md pl-3 w-full'></input>
                        </div>
                    </div>
                    <div className='py-5 pb-5  flex flex-row w-4/5 items-center'>
                        <div className='flex basis-1/5'>
                            <p>Email</p>
                        </div>
                        <div className='flex basis-3/5'>
                            <input onChange={(e)=> setEmail(e.target.value)} value={email} className='border py-1 rounded-md pl-3 w-full'></input>
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
                            <input value={phongBan == "NhanSu" ? "Nhân Sự" : "Hành Chính"} disabled className='border py-1 rounded-md pl-3 w-full'></input>
                        </div>
                    </div>
                    <div className='py-5 pb-5  flex flex-row w-4/5'>
                        <div className='flex basis-1/5'>
                            <p>Chức vụ</p>
                        </div>
                        <div className='flex basis-3/5'>
                            <input value={chucVu ? "Trưởng phòng" : "Nhân viên"} disabled className='border py-1 rounded-md pl-3 w-full'></input>
                        </div>
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
export default EmployeeInfo