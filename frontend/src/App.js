import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Formget from './components/Formget';
import Formupdate from './components/Formupdate';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/'element={<Form/>}/>
        <Route path='/get'element={<Formget/>}/>
        <Route path='/updateget/:id'element={<Formupdate/>}/>

      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
