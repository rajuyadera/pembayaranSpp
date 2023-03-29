import React from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogOut = () => {
    dispatch(Logout());
    dispatch(reset());
    navigate("/");
  };

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="border-end sidenav" id="sidebar-wrapper">
      <div className="sidebar-heading border-bottom ">
        <Link to="/">
          <img alt="Alt content" src={require("../assets/images/logo.png")} />
        </Link>
      </div>
      {user && user.role == "admin" ? (
        <PerfectScrollbar className="sidebar-items">
          <ul className="list-unstyled ps-0">
            <li className="mb-1">
              <Link tag="a" className="" to="/dashboard">
                <i className="fa fa-dashboard"></i> Dashboard
              </Link>
            </li>
            <li className="mb-1">
              <Link tag="a" className="" to="/admin">
                <i className="fa fa-user"></i> Admin
              </Link>
            </li>
            <li className="mb-1">
              <Link tag="a" className="" to="/siswa">
                <i className="fa fa-user"></i> Siswa
              </Link>
            </li>

            <li className="mb-1">
              <Link tag="a" className="" to="/kelas">
                <i className="fa fa-file-o"></i> Kelas
              </Link>
            </li>
            <li className="mb-1">
              <Link tag="a" className="" to="/spp">
                <i className="fa fa-money"></i> Spp
              </Link>
            </li>
            <li className="border-top my-3"></li>
            <li className="mb-1">
              <Link tag="a" className="" to="/payment">
                <i className="fa fa-credit-card-alt" aria-hidden="true"></i>{" "}
                Pembayaran
              </Link>
            </li>
          </ul>
        </PerfectScrollbar>
      ) : user && user.role == "petugas" ? (
        <PerfectScrollbar className="sidebar-items">
          <ul className="list-unstyled ps-0">
            <li className="mb-1">
              <Link tag="a" className="" to="/dashboard">
                <i className="fa fa-dashboard"></i> Dashboard
              </Link>
            </li>
            <li className="border-top my-3"></li>
            <li className="mb-1">
              <Link tag="a" className="" to="/payment">
                <i className="fa fa-credit-card-alt" aria-hidden="true"></i>{" "}
                Pembayaran
              </Link>
            </li>
          </ul>
        </PerfectScrollbar>
      ) : (
        <PerfectScrollbar className="sidebar-items">
          <ul className="list-unstyled ps-0">
            <li className="mb-1">
              <Link tag="a" className="" to="/dashboard">
                <i className="fa fa-credit-card-alt"></i> History Pembayaran
              </Link>
            </li>
            <li className="border-top my-3"></li>
          </ul>
        </PerfectScrollbar>
      )}

      <div className="dropdown fixed-bottom-dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-decoration-none dropdown-toggle"
          id="dropdownUser2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://via.placeholder.com/50"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <span>{user && user.username}</span>
        </a>
        <ul
          className="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser2"
        >
          <li>
            <Link className="dropdown-item" to="/profile">
              <i className="fa fa-user-circle" aria-hidden="true"></i> Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button
              type="submit"
              onClick={LogOut}
              className="dropdown-item"
              to="/"
            >
              <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
