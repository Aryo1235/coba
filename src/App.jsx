import { Route, Routes } from "react-router-dom";
import EditProfile from "./components/EditProfile";
import Homepages from "./pages/HomePage";
import GenrePages from "./pages/GenrePage";
import ResultsPage from "./pages/ResultPage";
import Logout from "./components/Logout";
import DetailPages from "./pages/DetailPage";
import LoginForm from "./components/Login";
import Register from "./components/Register";

import ChatBot from "./components/ChatBot";
import AiQueryComponent from "./components/aiFlawise";

const App = () => {
  return (
    <div className="overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Homepages />} />
        <Route path="/chat" element={<ChatBot />} />
        <Route path="/chatai" element={<AiQueryComponent />} />
        <Route path="/genre" element={<GenrePages />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/search" element={<ResultsPage />} />
        <Route path="/movie/:id" element={<DetailPages />} />
      </Routes>
    </div>
  );
};

export default App;
