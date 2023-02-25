
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
    updateOrganization
})=>{
   console.log(org);
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

 console.log(org.Location)

  const onedit = (id) => {
    setId(id);
    handleOpen();
  };

    // adding multiple location start
  const [inputdata, setinput] = useState("");
  const [items, setitem] = useState(org.Location); 


  const handleLocationclose = (ele1,index) => {
   
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
    OrganizationId : org._id,
    OrganizationName:org.OrganizationName ,
    OrganizationEmail: org.OrganizationEmail,
    OrganizationNumber: org.OrganizationNumber,
    OrganizationAddress:org.OrganizationAddress ,
    Logo: "",
    Location:items,
  });
  const {
    OrganizationName,
    OrganizationEmail,
    OrganizationNumber,
    OrganizationAddress,
    Logo,
    Location,
  } = formDataORG;
  const onInputChange = (e) => {
    setFormDataORG({ ...formDataORG, [e.target.name]: e.target.value });
  };

  const onUpdate=()=>{
    const update = {
    OrganizationId : org._id, 
    OrganizationName : OrganizationName,
    OrganizationEmail : OrganizationEmail,
    OrganizationNumber : OrganizationNumber,
    OrganizationAddress : OrganizationAddress,
    Location : items,
    }
    console.log("main page"+update)
    updateOrganization(update)
 };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    
    
       <Fragment>
       
          {/* <div className="container container_align">
              <div className=" col-lg-12 col-md-9 col-sm-9 col-12 py-3"> */}
          <div className="col-lg-3 col-md-2 col-sm-4 col-12">
            <label> OrganizationName:</label>

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
          <br></br>
          {/* </div> */}
          <div className="col-lg-3 col-md-2 col-sm-4 col-12">
            <label>Email *:</label>
            {/* <div className="col-lg-3  col-md-4 col-sm-4 col-12"> */}
            <input
              type="email"
              name="OrganizationEmail"
              value={OrganizationEmail}
              // onChange={(e) => onORGchange(e)}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />{" "}
          </div>
          <br></br>
          {/* </div> */}
          <div className="col-lg-3 col-md-2 col-sm-4 col-12">
            <label>Phone No:</label>

            {/* <div className="col-lg-4 col-md-4 col-sm-4 col-12"> */}
            <input
              type="number"
              name="OrganizationNumber"
              value={OrganizationNumber}
              // onChange={(e) => onORGchange(e)}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <br></br>
          {/* </div> */}
          <div className="col-lg-3 col-md-2 col-sm-4 col-12">
            <label>Number of User:</label>
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
            <div className="col-lg-3 col-md-2 col-sm-4 col-12">
              <label> Address *:</label>
              {/* <div className="col-lg-3 col-md-4 col-sm-6 col-12"> */}
              <textarea
                name="OrganizationAddress"
                value={OrganizationAddress}
                // onChange={(e) => onORGchange(e)}
                // id="tenantAddr"
                className="textarea form-control"
                rows="5"
                cols="20"
                placeholder="Address"
                 onChange={(e) => onInputChange(e)}
                style={{ width: "100%" }}
                required
              ></textarea>{" "}
            </div>
            <br></br>
            {/* </div> */}
            <div className="addItem  col-lg-2 col-md-2 col-sm-4 col-12">
                <label className="field_font">
                  Location
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
                  name="Location"
                  value={inputdata}
                  onChange={(e) => setinput(e.target.value)}
                  placeholder="Location"
                  id="Location"
                ></input>
                <button className="loc-btn " onClick={addItem}>
                  +
                </button>
                <div className="showItem ">
                    {items.map((ele,index1)=>{return (
                      <div className="eachItem" key={index1}>
                        <span>{ele}</span>{" "}
                        <button
                          onClick={() => handleLocationclose(ele,index1)}
                          className="loc_close_btn m-5 text-end"
                        >
                          X
                        </button>
                      </div>
                    );})}

                </div>
              </div>
            {/*------------- Multiple Location adding details Ending------------ */}
          </div>
          {/* </div> */}
          <div className="col-lg-12 Savebutton " size="lg">
          <button
            variant="success"
            className="btn sub_form btn_continue Save float-right"
            onClick={() => onUpdate()}>
            Update
          </button>
          </div>
          </Fragment>
  )
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    tenants1: state.tenants,
  });
  
  export default connect(mapStateToProps, {
   // UpdateTenantsDetails,
   // getAllTenants,
   // tenantsDetailsHistory,
   updateOrganization,
  })(EditOrganization);