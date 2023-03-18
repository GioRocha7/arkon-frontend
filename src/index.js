import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import reportWebVitals from './reportWebVitals';

//components
import Navbar from './components/Navbar/navbar';
import EventoList from './components/Eventos/EventoLista';
import EventoForm from './components/Eventos/EventoForm';
import BoletoForm from './components/Eventos/BoletoForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar/>
      <div className="container my-4 d-flex flex-row justify-content-center overflow-auto">
        <Routes>
          <Route exact path='/' element={<EventoList/>}></Route>
          <Route path='/eventoForm' element={<EventoForm/>}></Route>
          <Route path='/updateEvento/:id' element={<EventoForm/>}></Route>
          <Route path='/boletoForm/:id' element={<BoletoForm/>}></Route>
        </Routes>
    
    </div>
    </BrowserRouter>
    
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
