import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <>
      <div
        className="welcome-container"
        style={{ padding: "5%", boxSizing: "border-box" }}
      >
        <main style={{ paddingLeft: "5%", height: "50%" }}>
          <h1 className="header" style={{ color: "#E58C8A" }}>
            403!
          </h1>
          <h1 className="header" style={{ fontSize: "20px" }}>
            You should Authenticate first to access this page
          </h1>
          <button className="welcome-button" style={{ width: "100px" }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Back Home
            </Link>
          </button>
        </main>
      </div>
    </>
  );
};

export default Unauthorized;

/**
 * <div className='welcome-container' style={{padding: '5%',boxSizing: 'border-box'}}>
            <main style={{paddingLeft: '5%',height: '50%'}}>
            <h1 className='header' style={{color: '#E58C8A'}}>403!</h1>
            <h1 className='header' style={{fontSize: '20px'}}>You should Authenticate first to access this page</h1>
            <button className='welcome-button' style={{width: '100px'}}>Back Home</button>
            </main>
        </div>
 */
