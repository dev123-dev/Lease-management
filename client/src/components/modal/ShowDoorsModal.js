import React from "react";
import { connect } from "react-redux";

export const ShowDoorsModal = ({ ShowDoors }) => {
  return (
    <>
      <div className="d-flex align-item-center justify-content-center font-weight-bold">
        {ShowDoors.data?.BuildingName}
      </div>
      <div className="row" style={{ maxHeight: "70vh", overflowY: "scroll" }}>
        <div className="col-6">
          <div>Occupied Door List</div>
          {ShowDoors.data &&
            ShowDoors.data.occupied.map((e) => (
              <div
                className="card bg-success text-light"
                style={{ height: "40px" }}
              >
                {e.doorNo}-{e.status}
              </div>
            ))}
        </div>
        <div className="col-6">
          <div>Un-occupied Door List</div>
          {ShowDoors.data &&
            ShowDoors.data.unoccupied.map((e) => (
              <div
                className="card bg-danger text-light"
                style={{ height: "40px" }}
              >
                {e.doorNo}-{e.status}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShowDoorsModal);
