import React, { useEffect, useState } from "react";
import adminLayout from "../../hoc/adminLayout";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditKelas = () => {
  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("");

  const {id} = useParams()

  useEffect(()=> {
    getKelas()
  }, [])


  const getKelas = async () => {
    const response = await axios.get(`http://localhost:5000/kelas/${id}`)
    setKelas(response.data.kelas)
    setJurusan(response.data.jurusan)
  }

  const updateKelas = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.patch(`http://localhost:5000/kelas/${id}`, {
        kelas,
        jurusan
      })
      alert(response.data.msg)
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  return (
    <div className="my-3 p-3 bg-body rounded shadow-sm">
      <h6 className="border-bottom pb-2 mb-0 mb-3 text-center">
        Tambah Data Kelas
      </h6>
      <form onSubmit={updateKelas}>
        <div className="row">
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Kelas
            </label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Kelas"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
              />
              <span className="input-group-text" id="basic-addon2">
                <i className="fa fa-user"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Jurusan
            </label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={jurusan}
                onChange={(e) => setJurusan(e.target.value)}
              />
              <span className="input-group-text" id="basic-addon2">
                <i className="fa fa-user"></i>
              </span>
            </div>
          </div>
        </div>


        <button type="submit" className="btn btn-default">
          Submit
        </button>
      </form>
    </div>
  );
};

export default adminLayout(EditKelas);
