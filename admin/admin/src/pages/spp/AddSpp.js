import React, { useState } from "react";
import adminLayout from "../../hoc/adminLayout";
import axios from "axios";

const AddSpp = () => {
  const [tahunAjaran, setTahunAjaran] = useState("");
  const [nominal, setNominal] = useState("");

  const saveData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/spp", {
        tahunAjaran: tahunAjaran,
        nominal: nominal,
      });
      alert(response.data.msg)
    } catch (errors) {
      alert(errors.response.data.msg);
    }
  };

  return (
    <div className="container">
      <div className="my-3 p-3 bg-body rounded shadow-sm">
      <h6 className="border-bottom pb-2 mb-0 mb-3 text-center">
        Tambah Data Spp
      </h6>
      <form onSubmit={saveData}>
        <div className="row">
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Tahun Ajaran
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon2">
                <i className="fa fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Tahun Ajaran"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={tahunAjaran}
                onChange={(e) => setTahunAjaran(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Nominal
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon2">
                Rp.
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Nominal"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={nominal}
                onChange={(e) => setNominal(e.target.value)}
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

export default adminLayout(AddSpp);
