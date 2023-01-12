import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { URL_BACKEND } from "../../config";

export default function CreateUser() {
  const [passwordError, setPasswordError] = useState([""]);
  const [emailError, setEmailError] = useState([""]);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role_id = e.target.role.value;

    if (password.length < 6) {
      setPasswordError("La contraseña debe ser mayor a 6 caracteres.");
    } else {
      setPasswordError("");
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setEmailError("No es un email valido");
    } else {
      setPasswordError("");
    }

    axios
      .post(`${URL_BACKEND}/users`, {
        user,
        email,
        password,
        role_id,
      })
      .then(() => {
        Swal.fire({
          title: "Usuario creado correctamente!",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        navigate("/");
      })
      .catch((e) => {
        if (e.response.status === 422) {
          Swal.fire({
            title: "Error al crear usuario!",
            text: "Asegurese que el email este correcto, y la contraseña tenga mas de 6 caracteres.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      });
  };
  return (
    <>
      <div className="container">
        <div className="section">
          <h1 className="mt-md-3 mt-3 text-title">Agregar un usuario</h1>
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
                />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="email"
                  placeholder="Email"
                />
                {<p className="text-left">{emailError}</p>}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                />
                {<p className="text-left">{passwordError}</p>}
              </div>
              <div className="form-group">
                <label>Role</label>
                <select className="form-control" id="role">
                  <option value="1">Administrador</option>
                  <option value="2">Usuario</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Agregar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
