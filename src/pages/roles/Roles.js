import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { URL_BACKEND } from "../../config";

export default function Roles() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get(`${URL_BACKEND}/roles`).then((res) => {
      // console.log(res.data);
      setRoles(res.data);
    });
  }, []);

  const deleteRole = (id) => {
    axios.delete(`${URL_BACKEND}/roles/${id}`).then((res) => {
      Swal.fire({
        title: "Rol eliminado correctamente!",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      setRoles(roles.filter((role) => role.id !== id));
    });
  };
  return (
    <div className="container">
      <a href="/roles/create" className="btn btn-secondary mt-3 mb-3">
        Agregar Rol
      </a>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Editar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => {
              return (
                <tr key={role.id}>
                  <td>{role.role_name}</td>
                  <td>
                    <a
                      href={"roles/edit/" + role.id}
                      className="btn btn-secondary btn-sm"
                    >
                      Editar
                    </a>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => deleteRole(role.id)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
