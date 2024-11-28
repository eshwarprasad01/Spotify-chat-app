/* eslint-disable no-unused-vars */
import "./App.css";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Chat from "./Chat";
import Usernamecontext from "./Usernamecontext";
import PlayerContextProvider from "./Context/PlayerContext.js";
import MusicUI from "./MusicUI.js";

const Temp = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/Music/*"
          element={
            <PlayerContextProvider>
              <MusicUI />
            </PlayerContextProvider>
          }
        />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/SignUp" element={<Signup />} />
      </Routes>
    </div>
  );
};
function App() {
  return (
    <Router>
      <Usernamecontext>
        <Temp />
      </Usernamecontext>
    </Router>
  );
}

export default App;
