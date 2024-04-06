import React from "react";
import { connect } from "react-redux";

export const ShowDoorsModal = ({ setShowDoors, ShowDoors }) => {
  return (
    <>
      <div className="col-lg-10  col-sm-12 col-md-12">
        <div className="ml-4">
          <h4
            style={{
              color: "white",
            }}
            className="text-center  ml-4 "
          >
            Doors
          </h4>
        </div>
      </div>
      <div className="col-lg-2  col-sm-12 col-md-12">
        <button
          onClick={() => setShowDoors({ status: false, data: ShowDoors.data })}
          className="close"
        >
          <img
            className="editcl"
            src={require("../../static/images/close.png")}
            alt="X"
            style={{ height: "20px", width: "20px" }}
          />
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShowDoorsModal);
