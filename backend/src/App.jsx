import Home from "./pages/home/Home"
import "./app.scss"
import { Route, Routes } from "react-router-dom";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PrivateComponent from "./components/PrivateComponent";

const App = () => {
  return (
    <Routes>
      <Route element={<PrivateComponent />}>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/movies" element={<Home type='movie' />} />
        <Route exact path="/series" element={<Home type='series' />} />
        <Route exact path="/watch" element={<Watch />} />
      </Route>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>
  )
};

export default App;