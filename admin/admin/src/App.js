import 'font-awesome/css/font-awesome.min.css';
import './assets/css/app.css';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/auth/LoginPage'
import ResetPassword from './pages/auth/ResetPassword';
import ProfilePage from './pages/profile/ProfilePage';
import ChangePasswordPage from './pages/profile/ChangePasswordPage';
import UserPreferencesPage from './pages/profile/UserPreferencesPage'
import KelasPage from './pages/kelas/KelasPage';
import AddKelas from './pages/kelas/AddKelas';
import EditKelas from './pages/kelas/EditKelas';
import SppPage from './pages/spp/SppPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AddSpp from './pages/spp/AddSpp';
import EditSpp from './pages/spp/EditSpp';
import SiswaPage from "./pages/siswa/SiswaPage"
import AddSiswa from './pages/siswa/AddSiswa';
import EditSiswa from './pages/siswa/EditSiswa';
import PaymentPage from './pages/payment/PaymentPage';
import AddPayment from './pages/payment/AddPayment';
import EditPayment from './pages/payment/EditPayment';

function App() {
  return (
        <Router>
            <Routes>
                <Route exact path='/' element={<LoginPage/>} />
                <Route exact path='/dashboard' element={<DashboardPage/>} />
                {/* kelas */}
                <Route exact path='/kelas' element={<KelasPage/>} />
                <Route exact path='/addkelas' element={<AddKelas/>} />
                <Route exact path='/editkelas/:id' element={<EditKelas/>} />
                {/* spp */}
                <Route exact path='/spp' element={<SppPage/>} />
                <Route exact path='/addspp' element={<AddSpp/>} />
                <Route exact path='/editspp/:id' element={<EditSpp/>} />
                {/* siswa */}
                <Route exact path='/siswa' element={<SiswaPage/>} />
                <Route exact path='/addsiswa' element={<AddSiswa/>} />
                <Route exact path='/editsiswa/:id' element={<EditSiswa/>} />
                {/* payment */}
                <Route exact path='/payment' element={<PaymentPage/>} />
                <Route exact path='/addpayment' element={<AddPayment/>} />
                <Route exact path='/editpayment/:id' element={<EditPayment/>} />

                <Route exact path='/reset-password' element={<ResetPassword/>} />
                <Route exact path='/profile' element={<ProfilePage/>} />
                <Route exact path='/change-password' element={<ChangePasswordPage/>} />
                <Route exact path='/preferences' element={<UserPreferencesPage/>} />
            </Routes>  
        </Router>
    )
}

export default App;
