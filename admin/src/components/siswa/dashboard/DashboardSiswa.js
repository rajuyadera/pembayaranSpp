import React, { useEffect, useState } from "react";
import adminLayout from "../../../hoc/adminLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMeSiswa } from "../../../features/authSlice";
import axios from "axios";
import CurrencyFormat from "react-currency-format";

const Formatter = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "long",
  day: "2-digit",
});

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [payment, setPayment] = useState([]);
  const [siswa, setSiswa] = useState("");
  const { nisn } = useParams();

  useEffect(() => {
    dispatch(getMeSiswa());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/loginsiswa");
    }
  }, [isError, navigate]);

  useEffect(() => {
    getPayment();
    getSiswa();
  }, []);

  const getPayment = async () => {
    const response = await axios.get(`http://localhost:5000/payment/${nisn}`);
    setPayment(response.data);
    console.log(response.data);
  };

  const getSiswa = async () => {
    const response = await axios.get(`http://localhost:5000/siswa/${nisn}`);
    setSiswa(response.data);
  };

  return (
    <div className="row">
      <h1 className="text-center"> Welcome {user && user.nama}</h1>

      <div className="col-xl-3 col-sm-6 mb-3">
        <div class="card text-center">
          <div class="card-header bg-primary text-white">Total Tagihan</div>
          <div class="card-body">
            <h1>
              <CurrencyFormat
                value={siswa && siswa.spp.nominal * 36}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp."}
              />
            </h1>
          </div>
          <div class="card-footer text-muted"></div>
        </div>
      </div>
      <div className="col">
        <div class="card text-center">
          <div class="card-header bg-primary text-white">
            Rincian Pembayaran
          </div>
          <div class="card-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Bulan - Tahun</th>
                  <th>Tanggal Bayar</th>
                  <th>Jumlah Bayar</th>
                </tr>
              </thead>
              <tbody>
                {payment.map((pay, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {pay.bulan_bayar} - {pay.tahun_bayar}
                    </td>
                    <td>{Formatter.format(Date.parse(pay.createdAt))}</td>
                    <td>
                      <CurrencyFormat
                        value={pay.jumlah_bayar}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp."}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="card-footer text-muted"></div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 mb-3">
        <div class="card text-center">
          <div class="card-header bg-primary text-white">Sisa</div>
          <div class="card-body">
            <h1>
              <CurrencyFormat
                value={siswa && siswa.spp.nominal * 36 - siswa.spp.nominal * payment.length}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp."}
              />
            </h1>
          </div>
          <div class="card-footer text-muted"></div>
        </div>
      </div>
    </div>
  );
};

export default adminLayout(DashboardPage);
