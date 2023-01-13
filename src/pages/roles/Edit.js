import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { URL_BACKEND } from "../../config";

export default function EditRole() {
  const navigate = useNavigate();
  const [role, setRole] = useState([]);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios.get(`${URL_BACKEND}/roles/${id}`).then((res) => {
      setRole(res.data);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const role_name = e.target.name.value;

    axios
      .put(`${URL_BACKEND}/roles/${id}`, {
        role_name,
      })
      .then(() => {
        Swal.fire({
          title: "Rol editado correctamente!",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        navigate("/roles");
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
                  defaultValue={role.role_name}
                />
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
