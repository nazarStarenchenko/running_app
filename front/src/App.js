import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Program from './components/Program.js';
import Workouts from './components/Workouts.js';
import Description from './components/Description.js';
import Plots from './components/Plots.js';



function App() {
  return (
    <BrowserRouter>
      <Header /> 
      <Routes>
        <Route path="/" element = {<Main />} />
        <Route path="/program" element = {<Program />} />
        <Route path="/workouts" element = {<Workouts />} />
        <Route path="/description" element = {<Description />} />
        <Route path="/plots" element = {<Plots />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;