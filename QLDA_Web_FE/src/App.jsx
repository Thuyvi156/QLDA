import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './contexts/AppContexts';
import './App.css';

import Login from './pages/Login';
import AddEmployee from './pages/AddEmployee';
import Home from './pages/Home';
import RoomRegister from './pages/RoomRegister';
import RoomTimeTable from './pages/RoomTimeTable';
import AnnInfo from './pages/AnnInfo';
import EmployeeInfo from './pages/EmployeeInfo';
import AddRequest from './pages/AddRequest';
import Requests from './pages/Requests';
import EmployeeList from './pages/EmployeeList';
import RequestList from './pages/RequestList';
import AddAnn from './pages/AddAnn';
import EditEmployeeInfo from './pages/EditEmployeeInfo';
import AnnList from './pages/AnnList';
import EditRequest from './pages/EditRequest';
import RegistedRoom from './pages/RegistedRoom';
import ForgotPassword from './pages/ForgotPassword1';
import ForgotPassword2 from './pages/ForgotPassword2';
import UserRequests from './pages/UserRequests';
function App() {
  return (
    <div className=''>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/trang-chu' element={<Home />} />
            <Route path='/them-nhan-vien' element={<AddEmployee />} />
            <Route path='/gui-yeu-cau' element={<AddRequest />} />
            <Route path='/thong-bao/:id' element={<AnnInfo />} />
            <Route path='/danh-sach-yeu-cau' element={<Requests />} />
            <Route path='/dang-ky-phong-hop' element={<RoomRegister />} />
            <Route path='/lich-phong-hop' element={<RoomTimeTable />} />
            <Route path='/tai-khoan' element={<EmployeeInfo />} />
            <Route path='/danh-sach-nhan-vien' element={<EmployeeList />}/>
            <Route path='/yeu-cau-can-xu-ly' element={<RequestList />}/>
            <Route path='/tao-thong-bao' element={<AddAnn/>}/>
            <Route path='/danh-sach-nhan-vien/:id' element={<EditEmployeeInfo/>}/>
            <Route path='/thong-bao/' element={<AnnList/>}/>
            <Route path='/danh-sach-yeu-cau/:id' element={<EditRequest/>}/>
            <Route path='/phong-da-dang-ky/' element={<RegistedRoom/>}/>
            <Route path='/quen-mat-khau/' element={<ForgotPassword/>}/>
            <Route path='/quen-mat-khau/ma-xac-nhan' element={<ForgotPassword2/>}/>
            <Route path='/cac-yeu-cau' element={<UserRequests/>}/>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
