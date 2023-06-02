import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route, RouterProvider, Switch } from 'react-router-dom';
import Router from './router';
import Home from './components/Home/Home';

function App() {
  return (
    <div>
      <Header />
      <div className="container-fluid d-flex align-items-center flex-column main-content" id="main-content">
        <BrowserRouter>
        <Router />
      </BrowserRouter>
      
      </div>
    </div>
  );
}

export default App;