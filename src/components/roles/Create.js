import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { URL_BACKEND } from "../../config";

export default function CreateRole() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const role_name = e.target.role.value;

    axios
      .post(`${URL_BACKEND}/roles`, {
        role_name,
      })
      .then(() => {
        Swal.fire({
          title: "Rol creado correctamente!",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        navigate("/roles");
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          title: "Error al crear Rol!",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
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
                <label>Nombre del nuevo rol</label>
                <input
                  type="text"
                  className="form-control"
                  id="role"
                  placeholder="Rol"
                />
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
