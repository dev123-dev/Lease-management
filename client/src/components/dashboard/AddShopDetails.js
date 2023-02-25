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
    address,
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

  const [showInformationModal, setShowInformation] = useState(false);
  const handleInformationModalopen = () => setShowInformation(true);
  const handleInformationModalClose = () => setShowInformation(false);
  const LogoutModalClose = () => {
    handleInformationModalClose();
  };
  const onSubmit = () => {
    const finalData = {
      buildingName: buildingName,
      shopDoorNo: items,
      hikePercentage: hikePercentage,
      stampDuty: stampDuty,
      leaseTimePeriod: leaseTimePeriod,
      address: address,
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
      address: "",
      shopStatus: "",
      isSubmitted: true,
    });
    handleInformationModalopen();
    console.log(finalData);
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      <img
        onClick={handleShow}
        src={require("../../static/images/add-icon.png")}
        alt="Add Shop"
        title="Add Shop"
        id="addimg"
        className="img_icon_size  "
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
            <h2 className="text-center h1  ml-5">
              <b>ADD PROPERTY</b>{" "}
            </h2>
            <div className="  col-lg-2">
              <button onClick={handleClose} className="close ml-5 cl" id="cl">
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
          <div className="container-fluid propcont">
            <div className="row">
              <div className="col-lg-6">
                <label>
                  BuildingName
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                </label>

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
              <div className="col-lg-6">
                <label>
                  Location
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                </label>

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
              <div className="col-lg-6">
                <label>
                  StampDuty{" "}
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                </label>
                <input
                  type="text"
                  placeholder="StampDuty"
                  name="stampDuty"
                  value={stampDuty}
                  className="form-control  input"
                  onChange={(e) => onPropertychange(e)}
                  required
                />
              </div>
              <div className="col-lg-6">
                <label>
                  Hike<b>%</b>{" "}
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                </label>
                <input
                  type="text"
                  placeholder="HikePercent"
                  name="hikePercentage"
                  value={hikePercentage}
                  className="form-control  input"
                  onChange={(e) => onPropertychange(e)}
                  required
                />
              </div>
              <div className="col-lg-6">
                <label>
                  LeaseTimePeriod{" "}
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                </label>
                <textarea
                  name="tenantAddr"
                  // value={}
                  id=" addprop "
                  value={leaseTimePeriod}
                  className="textarea form-control"
                  rows="4"
                  onChange={(e) => onPropertychange(e)}
                  placeholder="Time"
                  // onChange={(e) => onInputChange(e)}
                  style={{ width: "100%" }}
                  required
                ></textarea>
                {/* <input
                  type="text"
                  name="leaseTimePeriod"
                  value={leaseTimePeriod}
                  className="form-control  input"
                  onChange={(e) => onPropertychange(e)}
                  required
                /> */}
              </div>
              {/* <div className="container-fluid"> */}
              {/* <div className="row"> */}
              <div className="col-lg-6">
                <label>
                  Address
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                </label>

                <textarea
                  name="tenantAddr"
                  // value={}
                  id=" addprop "
                  className="textarea form-control"
                  rows="4"
                  placeholder="Address"
                  // onChange={(e) => onInputChange(e)}
                  style={{ width: "100%" }}
                  required
                ></textarea>
                <br></br>
              </div>
              <div className="  col-lg-6 ">
                <label className="ml-2">
                  DoorNo{" "}
                  <i className="text-danger  ">
                    <b>*</b>
                  </i>
                </label>

                <input
                  className="form-control"
                  type="text"
                  name="shopDoorNo"
                  value={inputdata}
                  onChange={(e) => setinput(e.target.value)}
                  placeholder="Door Number"
                  id="Door Number"
                ></input>

                <div>
                  <div className="locadd " onClick={addItem}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      class="bi bi-plus-lg"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                      />
                    </svg>
                  </div>
                  <br></br>
                  <div className="showItemcl ">
                    {items.map((ele, index) => {
                      return (
                        <div className="eachItem" key={index}>
                          <span>{ele}</span>
                          <button
                            onClick={() => handleLocationclose(index)}
                            className="btndrp "
                          >
                            X
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* </div> */}

              {/* </div> */}

              <div className="col-lg-12">
                <button
                  className="btn sub_form btn_continue Save float-right  text-end"
                  id="savebtn"
                  onClick={() => onSubmit()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal
          show={showInformationModal}
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
              onClick={() => LogoutModalClose()}
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
