import React from "react";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import { fetchUser } from "../Redux/userReducer";
import { notificationActions } from "../Redux/notificationReducer";

const LandingPage = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if(!!localStorage.getItem("tm-token") && !!localStorage.getItem("exp-time")){
      const now = moment().valueOf();
      const expTime = parseInt(localStorage.getItem("exp-time"));
      const isValid = expTime - now;
      if(isValid > 0){
          dispatch(fetchUser());
          history.push('/text-anim');
      }else{
          localStorage.removeItem("tm-token");
          localStorage.setItem("exp-time");
          dispatch(notificationActions.error({message: 'Session Expired'}));
      }
    }
  },[])

  return (
    <>
      <div className="welcome-container">
        <div className="custom-shape-divider-top-1611591891">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <section className="welcome-content">
          <h1 className="welcome-text">Welcome Back!</h1>
          <p className="welcome-message">Glad to have you back</p>
          <button className="welcome-button">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Login
            </Link>
          </button>
        </section>
        <p className="welcome-footer">
          Don't have an account?
          <strong style={{ color: "#E58C8A" }}>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {" "}
              Register
            </Link>
          </strong>
        </p>
      </div>
    </>
  );
};

export default LandingPage;
