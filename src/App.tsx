import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from './components/Nav';
import { data, Route, Routes } from 'react-router-dom';
import { URLS } from './Constants/Urls';
import { Register } from './components/Register';
import Login from './components/Login';


function App() {
  return (
    <div className='container'>
        <Nav />
        <Routes>
          <Route path={URLS.HOME} element="" />
          <Route path={URLS.ABOUT} element="" />
          <Route path={URLS.CONTACT} element=""/>
          <Route path={URLS.LOGIN} element={<Login onLogin={data}/>}/>
          <Route path={URLS.REGISTER} element={<Register  onSignUp={data}/>} />
      </Routes>
    </div>
);}

export default App;
