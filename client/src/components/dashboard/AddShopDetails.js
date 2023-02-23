import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddShopDetailsform } from "../../actions/tenants";
import { Modal, Button } from "react-bootstrap";
import { getAllShops } from "../../actions/tenants";
import "../../../../client/src/styles/CustomisedStyle.css";

const AddShopDetails = ({
  auth: { isAuthenticated, user, users },
  AddShopDetailsform,

  getAllShops,
}) => {
  //formData
  const [formData, setFormData] = useState({
    buildingName: "",
    shopDoorNo: [],
    hikePercentage: "",
    stampDuty: "",
    LeaseTime: "",
    isSubmitted: false,
  });

  const [inputdata, setinput] = useState("");
  const [items, setitem] = useState([]);

  const {
    buildingName,
    shopDoorNo,
    hikePercentage,
    stampDuty,
    leaseTimePeriod,
    shopStatus,
  } = formData;

  const handleLocationclose = (index) => {
    const delitem = items.filter((ele, ind) => {
      return ind != index;
    });
    setitem(delitem);
  };

  const addItem = () => {
    if (!inputdata) {
    } else {
      setitem([...items, inputdata]);
      setinput("");
    }
  };

  const onPropertychange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [showInformationModal, setShowInformation] = useState(false);
  // const handleInformationModalopen = () => setShowInformation(true);
  // const handleInformationModalClose = () => setShowInformation(false);
  // const LogoutModalClose = () => {
  //   handleInformationModalClose();
  // };
  const onSubmit = () => {
    const finalData = {
      buildingName: buildingName,
      shopDoorNo: items,
      hikePercentage: hikePercentage,
      stampDuty: stampDuty,
      leaseTimePeriod: leaseTimePeriod,
      isSubmitted: false,
      shopStatus: "Acquired",
    };
    console.log(finalData);

    AddShopDetailsform(finalData);
    setFormData({
      ...formData,
      buildingName: "",
      shopDoorNo: "",
      hikePercentage: "",
      stampDuty: "",
      leaseTimePeriod: "",
      shopStatus: "",
      isSubmitted: true,
    });

    console.log(finalData);
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      <img
        className="img_icon_size log"
        onClick={handleShow}
        src={require("../../static/images/add-icon.png")}
        alt="Add User"
        title="Add User"
      />

      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="logout-modal modblur"
      >
        <Modal.Header>
          <div className=" row col-lg-12 col-md-12 col-sm-12 col-12 ">
            <h2 className="text-center h1  ml-5">ADD PROPERTY </h2>
            <div className=" tenant_img col-lg-2">
              <button onClick={handleClose} className="close ml-5">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </div>
        </Modal.Header>

        <Modal.Body>
          <div className="container ">
            <div className="row ">
              <div className=" row col-lg-2 col-md-6 col-sm-12 col-12">
                <label className="">
                  Building Name
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                  :
                </label>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                <input
                  type="text"
                  placeholder="BuildingName"
                  name="buildingName"
                  value={buildingName}
                  className="form-control input"
                  onChange={(e) => onPropertychange(e)}
                  required
                />
                <br></br>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-12 col-12">
                <label>
                  StampDuty{" "}
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                  :
                </label>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                <input
                  type="text"
                  placeholder="StampDuty"
                  name="stampDuty"
                  value={stampDuty}
                  className="form-control  input"
                  onChange={(e) => onPropertychange(e)}
                  required
                />
                <br></br>
              </div>

              <div className=" row col-lg-2 col-md-6 col-sm-12 col-12">
                <label>
                  Hike<b>%</b>{" "}
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                  :
                </label>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                <input
                  type="text"
                  placeholder="HikePercent"
                  name="hikePercentage"
                  value={hikePercentage}
                  className="form-control  input"
                  onChange={(e) => onPropertychange(e)}
                  required
                />
                <br></br>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-12 col-12">
                <label>
                  Door Number{" "}
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                  :
                </label>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                <input
                  className="form-control"
                  type="text"
                  name="shopDoorNo"
                  value={inputdata}
                  onChange={(e) => setinput(e.target.value)}
                  placeholder="Door Number"
                  id="Door Number"
                ></input>
                <button className="loc_add_btn m-2" onClick={addItem}>
                  +
                </button>
                <div className="showItem ">
                  {items.map((ele, index) => {
                    return (
                      <div className="eachItem" key={index}>
                        <span>{ele}</span>{" "}
                        <button
                          onClick={() => handleLocationclose(index)}
                          className="loc_close_btn m-2"
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className=" row col-lg-2 col-md-6 col-sm-12 col-12">
                <label>
                  LeaseTime Period{" "}
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                  :
                </label>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                <input
                  type="date"
                  name="leaseTimePeriod"
                  value={leaseTimePeriod}
                  className="form-control  input"
                  onChange={(e) => onPropertychange(e)}
                  required
                />
                <br></br>
              </div>
            </div>

            <div className="col-md-12 col-lg-12 col-sm-12 col-12 text-left">
              <button
                variant="success"
                className="btn sub_form btn_continue Save float-right"
                onClick={() => onSubmit()}
              >
                Save
              </button>
            </div>
          </div>
        </Modal.Body>

        <Modal
          show={show}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="logout-modal "
        >
          <Modal.Header className="confirmbox-heading">
            <h4 className="mt-0">Information</h4>
          </Modal.Header>
          <Modal.Body>
            <h5>Shop Details Added!!</h5>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn_green_bg"
              //  onClick={() => LogoutModalClose()}
            >
              OK
            </button>
          </Modal.Footer>
        </Modal>
      </Modal>
    </>
  );
};

AddShopDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  AddShopDetailsform: PropTypes.func.isRequired,
  getAllShops: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  AddShopDetailsform,
  getAllShops,
})(AddShopDetails);
