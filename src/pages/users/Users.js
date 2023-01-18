import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { URL_BACKEND } from "../../config";
import "../../css/spinner.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState([1]);
  const [isLoaded, setIsLoaded] = useState([false]);

  // Devuelve los usuarios desde la api.
  useEffect(() => {
    axios.get(`${URL_BACKEND}/users?page=${currentPage}`).then((res) => {
      setUsers(res.data.data);
      setTotalPages(res.data.last_page);
      setIsLoaded(true);
      // console.log(totalPages);
      // console.log(users);
      // console.log(res.data);
    });
  }, [currentPage]);

  // Cambiar pagina de la lista y usuarios
  const changePage = (i) => {
    setCurrentPage(i);
  };

  const nextPage = () => {
    if (currentPage + 1 <= totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage - 1 >= 0) {
      setCurrentPage(currentPage - 1);
    }
  };

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
      {!isLoaded && <div class="lds-dual-ring"></div>}
      {isLoaded && (
        <>
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
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <button className="page-link" onClick={() => prevPage()}>
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => {
                  return (
                    <li key={i} className="page-item">
                      <button
                        className="page-link"
                        onClick={() => changePage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  );
                })}
                <li className="page-item">
                  <button className="page-link" onClick={() => nextPage()}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
