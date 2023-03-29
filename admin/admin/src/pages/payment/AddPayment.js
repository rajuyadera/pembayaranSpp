import React, { useEffect, useState } from "react";
import adminLayout from "../../hoc/adminLayout";
import axios from "axios";
import CurrencyFormat from "react-currency-format";

const AddPayment = () => {
  const [siswaList, setSiswaList] = useState([]);
  const [adminList, setAdminList] = useState([]);
  const [siswa, setSiswa] = useState("");
  const [admin, setAdmin] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");

  useEffect(() => {
    dataSiswa();
    dataAdmin();
  }, []);

  const dataSiswa = async () => {
    const response = await axios.get("http://localhost:5000/siswa");
    setSiswaList(response.data);
  };
  const dataAdmin = async () => {
    const response = await axios.get("http://localhost:5000/admin");
    setAdminList(response.data);
  };

  const saveData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/payment", {
        id_siswa: siswa,
        id_admin: admin,
        jumlah_bayar: jumlah,
        bulan_bayar: bulan,
        tahun_bayar: tahun,
      });
      console.log(response.data);
    } catch (errors) {
      console.log(errors.response);
    }
  };

  return (
    <div className="container">
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h6 className="border-bottom pb-2 mb-0 mb-3 text-center">
          Tambah Pembayaran
        </h6>
        <form onSubmit={saveData}>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Pilih Siswa
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-user"></i>
                </span>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  value={siswa}
                  onChange={(e) => setSiswa(e.target.value)}
                >
                  <option selected disabled>
                    Pilih Siswa
                  </option>
                  {siswaList.map((siswa) => (
                    <option value={siswa.id_siswa}>{siswa.nama}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Petugas
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-user"></i>
                </span>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  value={admin}
                  onChange={(e) => setAdmin(e.target.value)}
                >
                  <option selected disabled>
                    Pilih Petugas
                  </option>
                  {adminList.map((admin) => (
                    <option value={admin.id_admin}>{admin.username}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Bulan Bayar
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">
                  @
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bulan"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={bulan}
                  onChange={(e) => setBulan(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Tahun Bayar
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">
                  @
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bulan"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
          <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Jumlah Bayar
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">
                  Rp.
                </span>
                <CurrencyFormat 
                value={jumlah}
                thousandSeparator={true}
                onValueChange= {(e) => setJumlah(e.value)}
                className="form-control"
                />
{/*                 
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bulan"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={jumlah}
                  onChange={(e) => setJumlah(e.target.value)}
                /> */}
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-default">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default adminLayout(AddPayment);
