import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserList from "./pages/users/Users";
import CreateUser from "./pages/users/Create";
import EditUser from "./pages/users/Edit";
import Roles from "./pages/roles/Roles";
import CreateRole from "./pages/roles/Create";
import EditRole from "./pages/roles/Edit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<UserList />} />
        <Route exact path="/users/create" element={<CreateUser />} />
        <Route exact path="/users/edit/:id" element={<EditUser />} />
        <Route exact path="/roles" element={<Roles />} />
        <Route exact path="/roles/create" element={<CreateRole />} />
        <Route exact path="/roles/edit/:id" element={<EditRole />} />
        {/* <Route path="/productos" element={<Productos />} /> */}
      </Routes>
    </div>
  );
}

export default App;
