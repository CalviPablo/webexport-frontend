import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { URL_BACKEND } from "../../config";

export default function EditUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [roles, setRoles] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`${URL_BACKEND}/users/${id}`).then((res) => {
      setUser(res.data);
    });
  }, [id]);

  useEffect(() => {
    axios.get(`${URL_BACKEND}/roles`).then((res) => {
      setRoles(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role_id = e.target.role.value;

    axios
      .put(`${URL_BACKEND}/users/${id}`, {
        user,
        email,
        password,
        role_id,
      })
      .then(() => {
        Swal.fire({
          title: "Usuario editado correctamente!",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        navigate("/");
      })
      .catch(() => {
        Swal.fire({
          title: "Error al editar usuario!",
          text: "El email o el usuario ya existen.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      });
  };
  return (
    <>
      <div className="container">
        <div className="section">
          <h1 className="mt-md-3 mt-3 text-title">Editar el usuario</h1>
          <hr />
          <div className="section">
            <form className="text-center mb-3" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Nombre"
                  defaultValue={user.user}
                />
              </div>
              <div className="form-group">
                <label>Correo</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="email"
                  placeholder="Email"
                  defaultValue={user.email}
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  defaultValue={user.password}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select className="form-control" id="role">
                  {roles.map((role) => {
                    return (
                      <option key={role.id} value={role.id}>
                        {role.role_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Editar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
