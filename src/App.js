import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import Home from './components/Home';
import Meme from './components/Meme';
import MemeGenerated from './components/MemeGenerated';

export const App=()=> {
  return (
    <div>
      <h1>Meme Generator</h1>
      <Router>
      <Routes>
        <Route exact path="/" element={<Meme />}/>
        <Route path="/generated" element={<MemeGenerated />}/>

      </Routes>
      </Router>
    </div>
  );
}

export default App;
