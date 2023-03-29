import React, { useEffect, useState } from "react";
import "../../../assets/css/login.css";
import authLayout from "../../../hoc/authLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthSiswa, reset } from "../../../features/authSlice";

const LoginSiswa = () => {
  const [nisn, setNisn] = useState();
  const [nis, setNis] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { siswa, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (siswa || isSuccess) {
      navigate(`/dashboardsiswa/${nisn}`);
    }
    dispatch(reset());
  }, [siswa, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(AuthSiswa({ nisn, nis }));
  };

  return (
    <form className="login-form" onSubmit={Auth}>
      <div className="d-flex align-items-center my-4">
        {isError && <p>{message}</p>}
        <h1 className="text-center fw-normal mb-0 me-3">Login Siswa</h1>
      </div>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form3Example3">
          Nisn
        </label>
        <input
          type="text"
          id="form3Example3"
          className="form-control form-control-lg"
          placeholder="Enter a valid nisn"
          value={nisn}
          onChange={(e) => setNisn(parseInt(e.target.value))}
        />
      </div>

      {/* <!-- nis input --> */}
      <div className="form-outline mb-3">
        <label className="form-label" htmlFor="form3Example4">
          Nis
        </label>
        <input
          type="nis"
          id="form3Example4"
          className="form-control form-control-lg"
          placeholder="Enter nis"
          value={nis}
          onChange={(e) => setNis(parseInt(e.target.value))}
        />
      </div>

      <div className="text-center text-lg-start mt-4 pt-2">
        <button type="submit" className="btn btn-primary btn-lg">
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default authLayout(LoginSiswa);
