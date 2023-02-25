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
// import { updateProperty } from "../../actions/tenants";
// import { updateProperty } from "../../actions/tenants";
const EditProperty = ({
  auth: { isAuthenticated, user, users },
  Property,
  updateProperty,
}) => {
  console.log(Property);
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

  // const [OrgId, setId] = useState("");

  // console.log(org.Location);

  const onedit = (id) => {
    // setId(id);
    handleOpen();
  };

  const [items, setitem] = useState([]);

  // // adding multiple location start
  // const [inputdata, setinput] = useState("");
  // const [items, setitem] = useState(org.Location);

  // const handleLocationclose = (ele1, index) => {
  //   const delitem = items.filter((ele, ind) => {
  //     return ele1 != ele;
  //   });
  //   setitem(delitem);
  // };

  // const addItem = () => {
  //   if (!inputdata) {
  //   } else {
  //     setitem([...items, inputdata]);
  //     setinput("");
  //   }
  // };
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
    console.log("main page" + update);
    updateProperty(update);
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      {/* <div className="container container_align">
              <div className=" col-lg-12 col-md-9 col-sm-9 col-12 py-3"> */}
      <div className="col-lg-3 col-md-2 col-sm-4 col-12">
        <label> BuildingName:</label>

        {/* <div className="col-lg-3 col-md-4 col-sm-4 col-12"> */}
        <input
          type="text"
          name="OrganizationName"
          value={Property.buildingName}
          // onChange={(e) => onORGchange(e)}
          className="form-control"
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <br></br>
      {/* </div> */}
      <div className="col-lg-3 col-md-2 col-sm-4 col-12">
        <label>Location:</label>
        {/* <div className="col-lg-3  col-md-4 col-sm-4 col-12"> */}
        <input
          type="email"
          name="OrganizationEmail"
          // value={OrganizationEmail}
          // onChange={(e) => onORGchange(e)}
          className="form-control"
          onChange={(e) => onInputChange(e)}
          required
        />{" "}
      </div>
      <br></br>
      {/* </div> */}
      <div className="col-lg-3 col-md-2 col-sm-4 col-12">
        <label>Hike %</label>

        {/* <div className="col-lg-4 col-md-4 col-sm-4 col-12"> */}
        <input
          type="number"
          name="OrganizationNumber"
          // value={OrganizationNumber}
          // onChange={(e) => onORGchange(e)}
          className="form-control"
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <br></br>
      {/* </div> */}
      <div className="col-lg-3 col-md-2 col-sm-4 col-12">
        <label>Address</label>
        {/* <div className="col-lg-4 col-md-4 col-sm-4 col-12"> */}
        <input
          type="number"
          //  name="user"
          //value={}
          className="form-control"
          onChange={(e) => onInputChange(e)}
        />{" "}
      </div>
      <br></br>
      {/* </div> */}
      {/* </div> */}

      <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
        {/*  */}
        <br></br>
        {/* </div> */}
        <div className="addItem  col-lg-2 col-md-2 col-sm-4 col-12">
          <label className="field_font">
            DoorNo
            <i className="text-danger  ">
              <b>*</b>
            </i>{" "}
            :
          </label>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
          <input
            className="form-control"
            type="text"
            name="DoorNo"
            // value={inputdata}
            // onChange={(e) => setinput(e.target.value)}
            placeholder="Location"
            id="Location"
          ></input>
          <button className="loc-btn ">+</button>
          <div className="showItem ">
            {items.map((ele, index1) => {
              return (
                <div className="eachItem" key={index1}>
                  <span>{ele}</span>{" "}
                  <button
                    // onClick={() => handleLocationclose(ele, index1)}
                    className="loc_close_btn m-5 text-end"
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {/*------------- Multiple Location adding details Ending------------ */}
      </div>
      {/* </div> */}
      <div className="col-lg-12 Savebutton " size="lg">
        <button
          variant="success"
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
  // UpdateTenantsDetails,
  // getAllTenants,
  // tenantsDetailsHistory,
  // updateProperty,
})(EditProperty);
