import {React, useEffect,useState} from "react";
import axios from "axios";
import adminLayout from "../../hoc/adminLayout";
import { Link } from "react-router-dom";


const KelasPage = () => {
const [kelas, setKelas] = useState([])

useEffect(()=>{
  getKelas()
},[])

const getKelas = async () => {
  const response = await axios.get("http://localhost:5000/kelas")
  setKelas(response.data)
}

const deleteKelas = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/kelas/${id}`)
  alert(response.data.msg)
  } catch (error) {
    alert(error.response.data.msg)
  }
  
}


  return (
    <div className="table ">
      <div className="row">
        <div className="col">
          <h5 className="pb-2 mb-0">Kelas Page</h5>
        </div>
        <div className="col text-right">
          <Link to={"/addkelas"}  className="btn btn-default ">
            <i className="fa fa-plus"></i>
          </Link>
        </div>
      </div>
      <div className="d-flex text-muted">
        <table className="table">
          <thead>
            <tr>
              <th>
                No
              </th>
              <th>Kelas</th>
              <th>Jurusan</th>
            </tr>
          </thead>
          <tbody>
            {kelas.map((kls, index)=> (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{kls.kelas}</td>
              <td>{kls.jurusan}</td>
              <td>
                <div className="dropdown table-action-dropdown">
                  <button
                    className="btn btn-secondary btn-sm dropdown-toggle"
                    type="button"
                    id="dropdownMenuButtonSM"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButtonSM"
                  >
                    <li>
                      <Link to={`/editkelas/${kls.id_kelas}`} className="dropdown-item" href="#">
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                        &nbsp;Edit
                      </Link>
                    </li>
                    <div className="dropdown-divider"></div>
                    <li>
                      <Link onClick={() => deleteKelas(kls.id_kelas)} className="dropdown-item text-danger" href="#">
                        <i className="fa fa-trash" aria-hidden="true"></i>
                        &nbsp;Delete
                      </Link>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav
        className="table-bottom-center-pagination"
        aria-label="Page navigation example "
      >
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default adminLayout(KelasPage);
