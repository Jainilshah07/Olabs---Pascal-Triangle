
import AdditionState from "./components/AdditionState"
import SymmetricState from "./components/SymmetricState";
import BinomialTriangle from "./components/BinomialTriangle";
import { Route, Routes } from "react-router-dom";
import StartPage from "./components/introduction/StartPage";
import Intro from "./components/introduction/Intro";
import ThankYou from "./components/introduction/ThankYou";

function App() {
  return (
    <div className="App font-mono">
      <Routes>
        <Route path="/" element={<Intro />} ></Route>
        <Route path="/start" element={<StartPage />} ></Route>
        <Route path="/level-1" element={<AdditionState />} ></Route>
        <Route path="/level-2" element={<SymmetricState />} ></Route>
        <Route path="/level-3" element={<BinomialTriangle/>} ></Route>
        <Route path="/thank-you" element={<ThankYou />} ></Route>
        </Routes>
    </div>
  );
}

export default App;
