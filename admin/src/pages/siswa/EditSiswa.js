import React, { useEffect, useState } from "react";
import adminLayout from "../../hoc/adminLayout";
import axios from "axios";
import { useParams } from "react-router-dom";

const validKelamin = {
  laki: "Laki-Laki",
  perempuan: "Perempuan",
};

const AddSiswa = () => {
  const [getKelas, setGetKelas] = useState([]);
  const [getTahunAjaran, setGetTahunAjaran] = useState([]);
  const [nama, setNama] = useState("");
  const [nisn, setNisn] = useState("");
  const [password, setPassword] = useState("");
  const [kelas, setKelas] = useState("");
  const [tahunAjaran, setTahunAjaran] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState(validKelamin);
  const [alamat, setAlamat] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const {id} = useParams()

  useEffect(() => {
    getSiswa()
    dataKelas();
    dataSpp();
  }, []);

  const getSiswa = async () => {
    const response = await axios.get(`http://localhost:5000/siswa/${id}`)
    setNama(response.data.nama)
    setKelas(response.data.id_kelas)
    setTahunAjaran(response.data.id_spp)
    setNisn(response.data.nisn)
    setPassword(response.data.password)
    setJenisKelamin(response.data.jenis_kelamin)
    setAlamat(response.data.alamat)
    setAlamat(response.data.alamat)
    setNoTelp(response.data.no_telp)
  }

  const dataKelas = async () => {
    const response = await axios.get("http://localhost:5000/kelas");
    setGetKelas(response.data);
  };
  const dataSpp = async () => {
    const response = await axios.get("http://localhost:5000/spp");
    setGetTahunAjaran(response.data);
  };

  const updateSiswa = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5000/siswa/${id}`, {
        id_kelas: kelas,
        id_spp: tahunAjaran,
        nama: nama,
        nisn: nisn,
        password: password,
        jenis_kelamin: jenisKelamin,
        alamat: alamat,
        no_telp: noTelp,
      });
      console.log(response.data)
    } catch (errors) {
      console.log(errors.response);
    }
  };

  return (
    <div className="container">
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h6 className="border-bottom pb-2 mb-0 mb-3 text-center">
          Tambah Data Siswa
        </h6>
        <form onSubmit={updateSiswa}>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Nama Siswa
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nama Siswa"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Nisn
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">
                  @
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email Address"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={nisn}
                  onChange={(e) => setNisn(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Password
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">
                  @
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email Address"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Kelas
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-user"></i>
                </span>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                >
                  <option selected disabled>
                    Pilih Kelas
                  </option>
                  {getKelas.map((kelas) => (
                    <option value={kelas.id_kelas}>
                      {kelas.kelas} {kelas.jurusan}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Tahun Ajaran
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-user"></i>
                </span>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  value={tahunAjaran}
                  onChange={(e) => setTahunAjaran(e.target.value)}
                >
                  <option selected disabled>
                    Pilih Tahun Ajaran
                  </option>
                  {getTahunAjaran.map((thn) => (
                    <option value={thn.id_spp}>
                      {thn.tahun_ajaran}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Jenis Kelamin
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-mobile"></i>
                </span>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  value={jenisKelamin}
                  onChange={(e) => setJenisKelamin(e.target.value)}
                >
                  <option selected disabled>
                    Pilih Jenis Kelamin
                  </option>
                  <option value={jenisKelamin.laki}>Laki-Laki</option>
                  <option value={jenisKelamin.perempuan}>Perempuan</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Nomor Telepon
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-mobile"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contact Number"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={noTelp}
                  onChange={(e) => setNoTelp(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Alamat
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-mobile"></i>
                </span>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Contact Number"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                />
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

export default adminLayout(AddSiswa);
