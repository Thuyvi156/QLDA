import { useState, useContext } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import { AppContexts } from "../contexts/AppContexts";
const AnnList = () => {

    const { anns } = useContext(AppContexts);
    return (
        <div className="flex flex-col min-h-screen relative">
            <Header />
            <div className="pt-28 pb-96 flex flex-col flex-grow w-full items-center ">
                <div className="flex justify-center pb-5">
                    <h1 className="text-black font-bold text-2xl ">Thông báo</h1>
                </div>
                <div className="flex flex-col w-[60%]">
                    <div>
                        <Announcement options={anns} type={null}/>
                    </div>
                </div>

                
            </div>
            <Footer />
        </div>
    )
}
export default AnnList