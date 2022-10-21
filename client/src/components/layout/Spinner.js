import React, { Fragment } from "react";
//import spinner from './looder.gif';

const Spinner = () => {
  return (
    <Fragment>
      {/*<div className='container container_align'>
        <img src={spinner} alt='Loading...' />
      </div>*/}
      <div className="container container_align">
        <div id="page-loader" className="text-light">
          <div className="page-loader-inner">
            <div className="loader-logo-name">
              <img
                src={require("../../static/images/pmLogo.jpg")}
                alt="Loading..."
              />
            </div>
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Spinner;
