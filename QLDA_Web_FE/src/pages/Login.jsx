
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [taiKhoan, setTaiKhoan] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleClick = () => {
        fetch('http://localhost:8081/v1/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                taiKhoan: taiKhoan,
                matKhau: password
            })
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res, taiKhoan, password)
                if (res.success) {
                  localStorage.setItem('id', res.id)
                  navigate('/trang-chu')
                } else {
                  localStorage.clear()
                  alert("Moi dang nhap lai")
                }
              })
              .catch(err => console(err))
    }
    return (
    <section className="main-container">
        <div className="flex justify-center items-center h-screen ">
            <div className="flex flex-col w-2/5 bg-[#66CDAA] rounded-xl ">
                <div className="flex justify-center items-center py-5">
                    <h1 className="font-bold text-2xl">Đăng nhập</h1>
                </div>
                <div className="flex flex-row">
                    <div className="flex justify-center items-center basis-1/4">
                        <label className="py-2 font-semibold text-lg">Tài khoản</label>
                    </div>
                    <div className="basis-3/4 py-2 px-4">
                        <input
                            className="text-gray-700 text-lg border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                            required
                            value={taiKhoan}
                            onChange={(e) => setTaiKhoan(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex justify-center items-center basis-1/4">
                        <label className="py-2 font-semibold text-lg">Mật khẩu</label>
                    </div>
                    <div className="basis-3/4 py-2 px-4">
                        <input
                            className="text-gray-700 text-lg border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className=" text-right px-3 py-5">
                    <p onClick={()=>navigate("/quen-mat-khau")} className="text-lg italic text-sky-600 hover:font-medium hover:text-blue-600 cursor-pointer"> Quên mật khẩu?</p>
                </div>
                <div className="flex justify-center items-center py-3">
                    <button onClick={handleClick} className="bg-[#FFE4E1] rounded-xl text-zinc-500 text-lg px-16 py-2 hover:bg-[#CDB7B5] hover:text-white ">Đăng nhập</button>
                </div>

            </div>
        </div>
    </section>
    )

}

export default Login;