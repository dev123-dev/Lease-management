import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import AddOrgModal from "./AddOrgModal";
import { Props } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { getAllOrganization } from "../../actions/tenants";
import { deleteOrganization } from "../../actions/tenants";
import "../../../../client/src/styles/CustomisedStyle.css";
// import { updateProperty } from "../../actions/tenants";
// import { updateProperty } from "../../actions/tenants";
const EditProperty = ({
  auth: { isAuthenticated, user, users },
  Property,
  updateProperty,
}) => {
  // console.log("this is main")
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const handleOpen = () => setShowEditModal(true);
  const onAddStaffModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //adding multiple location start
  const [inputdata, setinput] = useState("");
  const [items, setitem] = useState(Property.Location);

  const onedit = (id) => {
    // setId(id);
    handleOpen();
  };

  const addItem = () => {
    if (!inputdata) {
    } else {
      setitem([...items, inputdata]);
      setinput("");
    }
  };
  //multiple location end

  const [formData, setFormData] = useState({
    buildingName: "",
    shopDoorNo: [],
    hikePercentage: "",
    stampDuty: "",
    LeaseTime: "",
    isSubmitted: false,
  });

  const {
    buildingName,
    shopDoorNo,
    hikePercentage,
    stampDuty,
    leaseTimePeriod,
    shopStatus,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onUpdate = () => {
    const update = {
      buildingName: buildingName,
      shopDoorNo: items,
      hikePercentage: hikePercentage,
      stampDuty: stampDuty,
      leaseTimePeriod: leaseTimePeriod,
      isSubmitted: false,
      shopStatus: "Acquired",
    };

    updateProperty(update);
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment
      show={show}
      backdrop="static"
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="logout-modal modblur"
    >
      <Modal.Body>
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
              value={Property.buildingName}
              className="form-control input"
              // onChange={(e) => onPropertychange(e)}
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
            <Select
              name="orgLoc"
              // options={locationList}
              // value={orgLoc}
              // onChange={(e) => onchangeLoc(e)}
              theme={(theme) => ({
                ...theme,
                height: 26,
                minHeight: 26,
                borderRadius: 1,
                colors: {
                  ...theme.colors,
                  primary: "black",
                },
              })}
            >
              select Organization
            </Select>
            {/* need to add the property drop down here */}

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
              value={Property.stampDuty}
              className="form-control  input"
              // onChange={(e) => onPropertychange(e)}
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
              value={Property.hikePercentage}
              className="form-control  input"
              // onChange={(e) => onPropertychange(e)}
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
              value={Property.leaseTimePeriod}
              className="textarea form-control"
              rows="4"
              // onChange={(e) => onPropertychange(e)}
              placeholder="Time"
              // onChange={(e) => onInputChange(e)}
              style={{ width: "100%" }}
              required
            ></textarea>
          </div>
          <div className="col-lg-6">
            <label>
              Address
              <i className="text-danger ">
                <b>*</b>
              </i>
            </label>

            <textarea
              name="shopAddress"
              // value={shopAddress}
              id=" addprop "
              className="textarea form-control"
              rows="4"
              placeholder="Address"
              // onChange={(e) => onPropertychange(e)}
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
            {/* location start */}
            <div className="col-lg-6">
              <label className="ml-2">
                Location
                <i className="text-danger  ">
                  <b>*</b>
                </i>{" "}
                :
              </label>

              <input
                className="form-control"
                type="text"
                name="Location"
                value={inputdata}
                onChange={(e) => setinput(e.target.value)}
                placeholder="Location"
                id="Location"
              ></input>
              <div>
                <div className="locadds " onClick={addItem}>
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
                <div className="showItemcl ">
                  {items.map((ele, index1) => {
                    return (
                      <div className="eachItem" key={index1}>
                        <span>{ele}</span>{" "}
                        <button
                          onClick={() => handleLocationclose(ele, index1)}
                          className="btndrp"
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* location end */}

            <div className="col-lg-12">
              <button
                className="btn sub_form btn_continue Save float-right  text-end"
                id="savebtn"
                // onClick={() => onSubmit()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal
        // show={showInformationModal}
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
            // onClick={() => LogoutModalClose()}
          >
            OK
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants1: state.tenants,
});

export default connect(mapStateToProps, {
  // UpdateTenantsDetails,
  // getAllTenants,
  // tenantsDetailsHistory,
  // updateProperty,
})(EditProperty);
