import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Company from "./components/Company";
import CreateJob from "./components/CreateJob";
import AppliedJobs from "./components/AppliedJobs";
// import Chat from "./components/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/applications" element={<AppliedJobs />} />
        {/* <Route path="/chats" element={<Chat />} /> */}
        <Route path="/company/home" element={<Company />} />
        <Route path="/company/job" element={<CreateJob />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
