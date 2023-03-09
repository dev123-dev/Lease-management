import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import AddOrgModal from "./AddOrgModal";
import { Props } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { getAllOrganization } from "../../actions/tenants";
import { deleteOrganization } from "../../actions/tenants";
import "../../../../client/src/styles/CustomisedStyle.css";
import { updateOrganization } from "../../actions/tenants";
const EditOrganization = ({
  auth: { isAuthenticated, user, users },
  org,
  EditModal,
  updateOrganization,
}) => {
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

  const [OrgId, setId] = useState("");

  const onedit = (id) => {
    setId(id);
    handleOpen();
  };

  // adding multiple location start
  const [inputdata, setinput] = useState("");
  const [items, setitem] = useState(org.Location);

  const handleLocationclose = (ele1, index) => {
    const delitem = items.filter((ele, ind) => {
      return ele1 != ele;
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
  //multiple location end

  const [formDataORG, setFormDataORG] = useState({
    OrganizationId: org._id,
    OrganizationName: org.OrganizationName,
    OrganizationEmail: org.OrganizationEmail,
    OrganizationNumber: org.OrganizationNumber,
    OrganizationAddress: org.OrganizationAddress,
    startdate: org.date,
    Logo: "",
    Location: items,
  });

  const {
    OrganizationName,
    OrganizationEmail,
    OrganizationNumber,
    OrganizationAddress,
    startdate,
    Location,
  } = formDataORG;

  //Leasestartdate
  const [showStartdate, setShowStartdate] = useState(org.date);
  const [showEnddate, setShowEnddate] = useState(null);

  const onInputChange = (e) => {
    if (e.target.name === "startdate") {
      setShowStartdate(e.target.value);
      var newDate = e.target.value;
      var calDate = new Date(newDate);

      var leaseMonth = 12;

      //Calculating lease end date
      var dateData = calDate.getDate();
      calDate.setMonth(calDate.getMonth() + +leaseMonth);
      if (calDate.getDate() != dateData) {
        calDate.setDate(0);
      }
      var dd1 = calDate.getDate();
      var mm2 = calDate.getMonth() + 1;
      var yyyy1 = calDate.getFullYear();
      if (dd1 < 10) {
        dd1 = "0" + dd1;
      }

      if (mm2 < 10) {
        mm2 = "0" + mm2;
      }
      var leaseEndDate = dd1 + "-" + mm2 + "-" + yyyy1;
      setShowEnddate(leaseEndDate);
    }
    setFormDataORG({ ...formDataORG, [e.target.name]: e.target.value });
  };

  const onUpdate = () => {
    EditModal(false);

    const updateData = {
      OrganizationId: org._id,
      OrganizationName: OrganizationName,
      OrganizationEmail: OrganizationEmail,
      OrganizationNumber: OrganizationNumber,
      OrganizationAddress: OrganizationAddress,
      startdate: showStartdate,
      enddate: showEnddate,

      Location: items,
    };
    updateOrganization(update);
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <label> OrganizationName</label>

            {/* <div className="col-lg-3 col-md-4 col-sm-4 col-12"> */}
            <input
              type="text"
              name="OrganizationName"
              value={OrganizationName}
              // onChange={(e) => onORGchange(e)}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="col-lg-6">
            <label>Email </label>
            {/* <div className="col-lg-3  col-md-4 col-sm-4 col-12"> */}
            <input
              type="email"
              name="OrganizationEmail"
              value={OrganizationEmail}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />{" "}
          </div>
          <div className="col-lg-6">
            <label>Phone No</label>

            {/* <div className="col-lg-4 col-md-4 col-sm-4 col-12"> */}
            <input
              type="number"
              name="OrganizationNumber"
              value={OrganizationNumber}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="col-lg-6">
            <label>Number of User</label>
            <input
              type="number"
              readOnly={true}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />{" "}
          </div>
          <div className="col-lg-6">
            <label>LeaseStartDate</label>
            <input
              name="startdate"
              type="date"
              //  name="user"
              value={startdate}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />{" "}
          </div>
          <div className="col-lg-6">
            <label>LeaseEndDate</label>
            <input
              type="text"
              readOnly={true}
              value={showEnddate}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />{" "}
          </div>
          <div className="col-lg-6">
            <label> Address </label>
            {/* <div className="col-lg-3 col-md-4 col-sm-6 col-12"> */}
            <textarea
              name="OrganizationAddress"
              value={OrganizationAddress}
              // onChange={(e) => onORGchange(e)}
              // id="tenantAddr"
              className="textarea form-control"
              rows="3"
              cols="20"
              placeholder="Address"
              onChange={(e) => onInputChange(e)}
              style={{ width: "100%" }}
              required
            ></textarea>{" "}
          </div>
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
        </div>
      </div>

      <br></br>
      {/* </div> */}

      {/*------------- Multiple Location adding details Ending------------ */}

      {/* </div> */}
      <div className="col-lg-12">
        <button
          id="savebtn"
          className="btn sub_form btn_continue Save float-right"
          onClick={() => onUpdate()}
        >
          Update
        </button>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants1: state.tenants,
});

export default connect(mapStateToProps, {
  updateOrganization,
})(EditOrganization);
