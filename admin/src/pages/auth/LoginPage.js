import React, { useEffect, useState } from "react";
import "../../assets/css/login.css";
import authLayout from "../../hoc/authLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginAdmin, reset } from "../../features/authSlice"


const LoginPage = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {admin, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (admin || isSuccess) {
            navigate("/dashboard")
        }
        dispatch(reset())
    }, [admin, isSuccess, dispatch, navigate])

    const Auth = (e) => {
        e.preventDefault()
        dispatch(LoginAdmin({email, password}))
    }



  return (
    <form className="login-form" onSubmit={Auth}>
      <div className="d-flex align-items-center my-4">
        {isError && <p>{message}</p>}
        <h1 className="text-center fw-normal mb-0 me-3">Login</h1>
      </div>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form3Example3">
          Email
        </label>
        <input
          type="email"
          id="form3Example3"
          className="form-control form-control-lg"
          placeholder="Enter a valid username/nisn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* <!-- Password input --> */}
      <div className="form-outline mb-3">
        <label className="form-label" htmlFor="form3Example4">
          Password
        </label>
        <input
          type="password"
          id="form3Example4"
          className="form-control form-control-lg"
          placeholder="Enter password"
          value={password}
          onChange= {(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="text-center text-lg-start mt-4 pt-2">
        <button type="submit" className="btn btn-primary btn-lg">
          {isLoading? 'Loading...' : 'Login'}
        </button>
        
      </div>
    </form>
  );
};

export default authLayout(LoginPage);
