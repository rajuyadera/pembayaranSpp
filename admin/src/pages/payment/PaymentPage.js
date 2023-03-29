import { React, useEffect, useState } from "react";
import axios from "axios";
import adminLayout from "../../hoc/adminLayout";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { useSelector } from "react-redux";

const Formatter = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "long",
  day: "2-digit",
});

const PaymentPage = () => {
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    getPayment();
  }, []);

  const { user } = useSelector((state) => state.auth);

  const getPayment = async () => {
    const response = await axios.get("http://localhost:5000/payment");
    setPayment(response.data);
  };

  const deletePayment = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/payment/${id}`
      );
      alert(response.data.msg);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="table ">
      <div className="row">
        <div className="col">
          <h5 className="pb-2 mb-0">Halaman Pembayaran</h5>
        </div>
        <div className="col text-right">
          <Link to={"/addpayment"} className="btn btn-default ">
            <i className="fa fa-plus"></i> <span>Tambah Siswa</span>
          </Link>
        </div>
      </div>
      <div className="d-flex text-muted">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Siswa</th>
              <th>Tahun Ajaran</th>
              <th>Kelas</th>
              <th>Tanggal Bayar</th>
              <th>Bulan / Tahun Bayar</th>
              <th>Jumlah Bayar</th>
              <th>Nama Petugas</th>
            </tr>
          </thead>
          <tbody>
            {payment.map((pay, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{pay.siswa.nama}</td>
                <td>{pay.siswa.spp.tahun_ajaran}</td>
                <td>
                  {pay.siswa.kela.kelas} {pay.siswa.kela.jurusan}
                </td>
                <td>{Formatter.format(Date.parse(pay.createdAt))}</td>
                <td>
                  {pay.bulan_bayar} - {pay.tahun_bayar}
                </td>
                <td>
                  <CurrencyFormat
                    value={pay.jumlah_bayar}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Rp."}
                  />
                </td>
                <td>{pay.admin.username}</td>
                <td>
                  {user && user.role == "admin" ? (
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
                        <Link
                            to={`/invoice/${pay.id_pembayaran}`}
                            className="dropdown-item"
                            href="#"
                          >
                            <i className="fa fa-eye" aria-hidden="true"></i>
                            &nbsp;View
                          </Link>
                        </li>
                        <div className="dropdown-divider"></div>
                        <li>
                          <Link
                            to={`/editpayment/${pay.id_pembayaran}`}
                            className="dropdown-item"
                            href="#"
                          >
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                            &nbsp;Edit
                          </Link>
                        </li>
                        <div className="dropdown-divider"></div>
                        <li>
                          <Link
                            onClick={() => deletePayment(pay.id_pembayaran)}
                            className="dropdown-item text-danger"
                            href="#"
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                            &nbsp;Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : (
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
                          <Link
                            to={`/editpayment/${pay.id_pembayaran}`}
                            className="dropdown-item"
                            href="#"
                          >
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                            &nbsp;Edit
                          </Link>
                        </li>
                        <div className="dropdown-divider"></div>
                        <li>
                          <Link
                            onClick={() => deletePayment(pay.id_pembayaran)}
                            className="dropdown-item text-danger"
                            href="#"
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                            &nbsp;Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
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

export default adminLayout(PaymentPage);
