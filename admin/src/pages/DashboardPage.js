import React, { useEffect, useState } from "react";
import axios from "axios";
import adminLayout from "../hoc/adminLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { siswa, setSiswa } = useState("");

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);


  useEffect(() => {
    SiswaList()
  }, [])

  const SiswaList = async () => {
    const response = await axios.get("http://localhost:5000/siswa")
    console.log(response.data)
    setSiswa(response.data)
  }

  return (
    <div className="row">
      <h1> Welcome {user && user.username}</h1>
      <div className="col-xl-3 col-sm-6 mb-3">
        <div className="card text-white bg-primary o-hidden h-100">
          <div className="card-body">
            <div className="card-body-icon">
              <i className="fa fa-fw fa-comments"></i>
            </div>
            <div className="mr-5">Jumlah Siswa</div>
          </div>
          <div className="card-footer text-white clearfix small z-1" href="#">
            <i className="fa fa-user"></i>
            <span className="float-right">
              <span className="">{siswa}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 mb-3">
        <div className="card text-white bg-primary o-hidden h-100">
          <div className="card-body">
            <div className="card-body-icon">
              <i className="fa fa-fw fa-comments"></i>
            </div>
            <div className="mr-5">Gender Siswa</div>
          </div>
          <div className="card-footer text-white clearfix small z-1" href="#">
            <span>Perempuan</span>
            <span className="float-right">
              <span className="">: 20</span>
            </span>

            <span> Laki - Laki</span>
            <span className="float-right">
              <span className="">: 20</span>
            </span>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 mb-3">
        <div className="card text-white bg-success o-hidden h-100">
          <div className="card-body">
            <div className="card-body-icon">
              <i className="fa fa-fw fa-shopping-cart"></i>
            </div>
            <div className="mr-5">123 New Orders!</div>
          </div>
          <a className="card-footer text-white clearfix small z-1" href="#">
            <span className="float-left">View Details</span>
            <span className="float-right">
              <i className="fa fa-angle-right"></i>
            </span>
          </a>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 mb-3">
        <div className="card text-white bg-danger o-hidden h-100">
          <div className="card-body">
            <div className="card-body-icon">
              <i className="fa fa-fw fa-support"></i>
            </div>
            <div className="mr-5">13 New Tickets!</div>
          </div>
          <a className="card-footer text-white clearfix small z-1" href="#">
            <span className="float-left">View Details</span>
            <span className="float-right">
              <i className="fa fa-angle-right"></i>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default adminLayout(DashboardPage);
