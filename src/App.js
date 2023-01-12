import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserList from "./components/users/Users";
import CreateUser from "./components/users/Create";
import EditUser from "./components/users/Edit";
import Roles from "./components/roles/Roles";
import CreateRole from "./components/roles/Create";
import EditRole from "./components/roles/Edit";

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
