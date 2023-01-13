import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { URL_BACKEND } from "../../config";

export default function Users() {
  const [users, setUsers] = useState([]);

  // Devuelve los usuarios desde la api.
  useEffect(() => {
    axios.get(`${URL_BACKEND}/users`).then((res) => {
      // console.log(res.data);
      setUsers(res.data);
    });
  }, []);

  // Funcion para borrar usuarios y actualizar el estado.
  const deleteUser = (id) => {
    axios.delete(`${URL_BACKEND}/users/${id}`).then(() => {
      Swal.fire({
        title: "Usuario eliminado correctamente!",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  return (
    <div className="container">
      <a href="/users/create" className="btn btn-secondary mt-3 mb-3">
        Agregar User
      </a>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Editar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.user}</td>
                  <td>{user.email}</td>
                  <td>{user.role.role_name}</td>
                  <td>
                    <a
                      href={"users/edit/" + user.id}
                      className="btn btn-secondary btn-sm"
                    >
                      Editar
                    </a>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => deleteUser(user.id)}
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
