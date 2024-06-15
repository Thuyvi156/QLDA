
import React, { useContext, useState } from "react";

import { useNavigate } from 'react-router-dom';
import { AppContexts } from "../contexts/AppContexts";
const ForgotPassword2 = () => {
    
    const navigate = useNavigate()
    const [code, setCode] = useState("")
    const {email, setEmail} = useContext(AppContexts)

    const handleClick = () => {
        fetch('http://localhost:8081/v1/api/confirmCode', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                code: code
            })
        })
            .then(res => res.json())
            .then((res) => {
                if (res.success) {
                    navigate('/')
                } else {
                    alert(res.message)
                }
            })
            .catch(err => console(err))
    }
    return (
        <section className="main-container">
        <div className="flex flex-col justify-center items-center h-screen ">
            <div className="flex flex-col w-2/5 bg-[#66CDAA] rounded-xl ">
                <div className="flex justify-center items-center py-5">
                    <h1 className="font-bold text-2xl">Lấy lại mật khẩu</h1>
                </div>
                <div className="flex flex-row">
                    <div className="flex justify-center items-center basis-1/4">
                        <label className="py-2 font-semibold text-lg">Mã xác nhận</label>
                    </div>
                    <div className="basis-3/4 py-2 px-4">
                        <input
                            className="text-gray-700 text-lg border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                            required
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center py-3">
                <button onClick={handleClick} className="bg-[#FFE4E1] rounded-xl text-zinc-800 text-lg px-16 py-2 hover:bg-[#CDB7B5] hover:text-white ">Xác nhận mã</button>
            </div>

        </div>
        </section>

    )

}

export default ForgotPassword2;