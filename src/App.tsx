import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from './components/Nav';
import { data, Route, Routes } from 'react-router-dom';
import { URLS } from './Constants/Urls';
import { Register } from './components/Register';
import Login from './components/Login';
import { Profile } from './components/Profile';
import { AuthProvider } from './context/AuthContext';
import { Home } from './components/Home';

function App() {
  return (
    <AuthProvider>
      <div className='container'>
        <Nav />
        <Routes>
          <Route path={URLS.HOME} element={<Home/>} />
          <Route path={URLS.ABOUT} element="" />
          <Route path={URLS.CONTACT} element="" />
          <Route path={URLS.LOGIN} element={<Login onLogin={data} />} />
          <Route path={URLS.REGISTER} element={<Register onSignUp={data} />} />
          <Route path={URLS.PROFILE} element={<Profile onLogin={data} /> } />
        </Routes>
      </div>
    </AuthProvider>

  );
}

export default App;
