import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aim from "./components/Aim";
import Objective from "./components/Objective";
import Theory from "./components/Theory";
import Procedure from "./components/Procedure";
import Assignment from "./components/Assignment";
import Navbar from "./components/Navbar";
import Simulation from "./components/Simulation";

export default function App() {
  return (
    <Router>
      <div className="h-screen w-screen p-0 m-0">
        <Navbar />
        <div className="h-full flex flex-col items-center justify-center bg-gray-900 text-white p-6 pt-24">
          <div className="flex flex-col gap-6 w-full max-w-4xl">
            <Routes>
              <Route path="/" element={<Aim />} />
              <Route path="/objective" element={<Objective />} />
              <Route path="/theory" element={<Theory />} />
              <Route path="/procedure" element={<Procedure />} />
              <Route path="/simulation" element={<Simulation />} />
              <Route path="/assignment" element={<Assignment />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
