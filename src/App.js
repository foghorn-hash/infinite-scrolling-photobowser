import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePageComponent/HomePageComponent';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {Container,Alert} from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
