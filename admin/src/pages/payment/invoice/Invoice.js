import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

const Formatter = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "long",
  day: "2-digit",
});

const Invoice = () => {
  const [payment, setPayment] = useState("");
  const { id } = useParams();

  useEffect(() => {
    data();
  }, []);

  const data = async () => {
    const response = await axios.get(`http://localhost:5000/payment/${id}`);
    setPayment(response.data);
  };

  const save = () => {
    window.print();
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col mt-5">
          <button type="submit" onClick={save} className="btn btn-primary">
            <i className="fa fa-download"></i> <span>Print</span>
          </button>
        </div>
        <div id="print" className="col">
          <div class="  d-flex aligns-items-center justify-content-center mt-4">
            <div className="card">
              <div className="card-body mx-4">
                <div className="container">
                  <p
                    className="my-5 mx-5 text-center"
                    style={{ fontSize: "30px" }}
                  >
                    Pembayaran SPP
                  </p>
                  <div className="row">
                    <ul className="list-unstyled">
                      <li className="text-black">
                        {payment && payment.siswa.nama}
                      </li>
                      <li className="text-muted mt-1">
                        <span className="text-black">Invoice</span> #
                        {payment && payment.id_pembayaran}
                      </li>
                      <li className="text-black mt-1">
                        {Formatter.format(
                          Date.parse(payment && payment.createdAt)
                        )}
                      </li>
                    </ul>
                    <hr />
                    <div className="col-xl-10">
                      <p>Kelas</p>
                    </div>
                    <div className="col-xl-2">
                      <p className="float-end">
                        {payment && payment.siswa.kela.kelas} {""}
                        {payment && payment.siswa.kela.jurusan}
                      </p>
                    </div>
                    <hr />
                  </div>
                  <div className="row">
                    <div className="col-xl-10">
                      <p>Bulan</p>
                    </div>
                    <div className="col-xl-2">
                      <p className="float-end">
                        {payment && payment.bulan_bayar}
                      </p>
                    </div>
                    <div className="col-xl-10">
                      <p>Tahun</p>
                    </div>
                    <div className="col-xl-2">
                      <p className="float-end">
                        {payment && payment.tahun_bayar}
                      </p>
                    </div>
                    <hr />
                  </div>
                  <div className="row">
                    <div className="col-xl-10">
                      <p>Jumlah Spp</p>
                    </div>
                    <div className="col-xl-2">
                      <p className="float-end">
                        <CurrencyFormat
                          value={payment && payment.siswa.spp.nominal}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Rp."}
                        />
                      </p>
                    </div>
                    <div className="col-xl-10">
                      <p>Nominal</p>
                    </div>
                    <div className="col-xl-2">
                      <p className="float-end">
                        <CurrencyFormat
                          value={payment && payment.jumlah_bayar}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Rp."}
                        />
                      </p>
                    </div>
                    <hr style={{ border: "2px solid black" }} />
                  </div>
                  <div className="row text-black">
                    <div className="col-xl-12">
                      <p className="float-end fw-bold">
                        Sisa Jumlah :{" "}
                        <CurrencyFormat
                          value={
                            payment &&
                            payment.siswa.spp.nominal - payment.jumlah_bayar
                          }
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Rp."}
                        />
                      </p>
                    </div>
                    <hr style={{ border: "2px solid black" }} />
                  </div>
                  <div className="text-center" style={{ marginTop: "90px" }}>
                    <a>
                      <u className="text-info">View in browser</u>
                    </a>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
