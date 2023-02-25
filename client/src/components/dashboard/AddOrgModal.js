import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Fragment } from "react";
import { connect } from "react-redux";
import { AddOrganization } from "../../actions/tenants";

const AddOrgModal = ({
  // tenants: {AddOrganization },
  auth: { isAuthenticated, user, users, finalDataRep },
  AddOrganization,
}) => {

 const [entryDate, setEntryDate] = useState("");
  const [leaseEndDate, setLeaseEndDate] = useState("");
  const [newLeaseEndDate, setNewLeaseEndDate] = useState();


  const onDateChangeEntry = (e) => {
    setEntryDate(e.target.value);
    var newDate = e.target.value;
    var calDate = new Date(newDate);

    var leaseMonth = 11 ;

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
    setLeaseEndDate(leaseEndDate);
    var newLeaseEndDate = yyyy1 + "-" + mm2 + "-" + dd1;
    setNewLeaseEndDate(newLeaseEndDate);
  };

  



  const [show, setshow] = useState("");
  const handleClose = () => setshow("false");
  const handleShow = () => setshow("true");

  const [inputdata, setinput] = useState("");
  const [items, setitem] = useState([]);

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
  const [formDataORG, setFormDataORG] = useState({
    OrganizationName: "",
    OrganizationEmail: "",
    OrganizationNumber: "",
    OrganizationAddress: "",
    date : "",
    enddate : "",
    Logo: "",
    Location: [],
  });
  const {
    OrganizationName,
    OrganizationEmail,
    OrganizationNumber,
    OrganizationAddress,
    enddate ,
    Logo,
    date,
    Location,
  } = formDataORG;

  const onORGchange = (e) => {
    setFormDataORG({
      ...formDataORG,
      [e.target.name]: e.target.value,
    });
  };
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const handleOpen = () => setShowEditModal(true);
  const onAddStaffModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };

  const onSubmitORGdata = () => {
    const finalORGdata = {
      OrganizationName: OrganizationName,
      OrganizationEmail: OrganizationEmail,
      OrganizationNumber: OrganizationNumber,
      OrganizationAddress: OrganizationAddress,
      Logo: "",
      date : entryDate,
      enddate : newLeaseEndDate,
      Location: items,
    };
   console.log(finalORGdata);

    AddOrganization(finalORGdata);
    setFormDataORG({
      ...formDataORG,
      OrganizationName: "" /*name*/,
      OrganizationEmail: "",
      OrganizationNumber: "",
      OrganizationAddress: "",
      OrganizationStatus: "",
      date : "",
      enddate : "",
      Logo: "",
      Location: [],
    });
  };
  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <div>
      <Fragment>
        <div className="container container_align">
          <div className="col-lg-12 col-md-11 col-sm-11 col-11 py-4">
            <img
              className="img_icon_size "
              // onClick={() => onClickHandler()}
              onClick={handleOpen}
              src={require("../../static/images/add-icon.png")}
              alt="Add User"
              title="Add User"
            />
          </div>
        </div>
        {/* Adding Organization */}
        <Modal
          show={showEditModal}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="logout-modal"
        >
          <Modal.Header>
            <div className=" row col-lg-10 col-md-12 col-sm-12 col-12 ">
              <h2 className="heading_color h1 text-center">
                <b>AddOrganization</b>
              </h2>
              <div className="  col-lg-2">
                <button onClick={handleEditModalClose} className="close">
                  <img
                    src={require("../../static/images/close.png")}
                    alt="X"
                    style={{ height: "20px", width: "20px" }}
                  />
                </button>
              </div>
            </div>
          </Modal.Header>

          <Modal.Body className="org_add">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6">
                <label>
                  {" "}
                  OrganiZationName
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                  
                </label>
                <input
                  type="text"
                  name="OrganizationName"
                  value={OrganizationName}
                  onChange={(e) => onORGchange(e)}
                  className="form-control"
                  // onChange={(e) => onInputChange(e)}
                />
                </div>
                <div className="col-lg-6">
                <label>
                  Email{" "}
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                  
                </label>
                <input
                  type="email"
                  name="OrganizationEmail"
                  value={OrganizationEmail}
                  onChange={(e) => onORGchange(e)}
                  className="form-control"
                  //onChange={(e) => onInputChange(e)}
                  required
                />{" "}

                </div>

                <div className="col-lg-6">
                  PhoneNo
                  <input
                  type="number"
                  name="OrganizationNumber"
                  value={OrganizationNumber}
                  onChange={(e) => onORGchange(e)}
                  className="form-control"
                  //onChange={(e) => onInputChange(e)}
                />
                </div>
                <div className="col-lg-6">
                <label>
                  No Of User
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                 
                </label>
                <input
                  type="number"
                  //  name="user"
                  //value={}
                  className="form-control"
                  //onChange={(e) => onInputChange(e)}
                />

                </div>

                <div className="col-lg-6">
                <label>
                  LeaseStartDate
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                 
                </label>
                <input
              type="date"
              placeholder="dd/mm/yyyy"
              //   min={yesterdayDt}
              //   max={today2}
              className="form-control cpp-input datevalidation"
              name="tenantLeaseStartDate"
              // value={tenants.tenantLeaseEndDate}
              onChange={(e) => onDateChangeEntry(e)}
              style={{
                width: "100%",
              }}
            />
                </div>
                <div className="col-lg-6">
                <label>
                  LeaseEndDate
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                 
                </label><br></br>
                <input
              type="text"
              placeholder="dd/mm/yyyy"
              //   min={yesterdayDt}
              //   max={today2}
              value={leaseEndDate}
              className="form-control cpp-input datevalidation"
              name="tenantLeaseStartDate"
              // value={tenants.tenantLeaseEndDate}
            
              style={{
                width: "100%",
              }}
            />
                {/* <label><b>{leaseEndDate}</b></label> */}
                </div>

                <div className="col-lg-6">
                <label>
                  {" "}
                  Address
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                  
                </label>
                <textarea
                  name="OrganizationAddress"
                  value={OrganizationAddress}
                  onChange={(e) => onORGchange(e)}
                  // id="tenantAddr"
                  className="textarea form-control"
                  rows="5"
                  cols="20"
                  placeholder="Address"
                  // onChange={(e) => onInputChange(e)}
                  style={{ width: "100%" }}
                  required
                ></textarea>{" "}
                </div>
                <div className="col-lg-6">
                <label>
                  {" "}
                  Location
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
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
                <button className="loc-btn " onClick={addItem}>
                  +
                </button>
                <div className="showItem ">
                  {items.map((ele, index) => {
                    return (
                      <div className="eachItem" key={index}>
                        <span>{ele}</span>{" "}
                        <button
                          onClick={() => handleLocationclose(index)}
                          className="loc_close_btn m-5 text-end"
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                </div>
                </div>

                <div className="col-lg-12">
                <Modal.Footer>
            <div className=" Savebutton  " size="lg">
              <button
                variant="success"
                className="btn sub_form btn_continue Save float-right"
                onClick={() => onSubmitORGdata()}
              >
                Save
              </button>
            </div>
          </Modal.Footer>
                </div>
              </div>
            </div>
            
            
          </Modal.Body>
          
        </Modal>

        {/* <Modal
          show={showInformationModal}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="logout-modal"
        >
          <Modal.Header className="confirmbox-heading">
            <h4 className="mt-0">Information</h4>
          </Modal.Header>
          <Modal.Body>
            <h5>Details Added!!</h5>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn_green_bg"
              onClick={() => LogoutModalClose()}
            >
              OK
            </button>
          </Modal.Footer>
        </Modal> */}
      </Fragment>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});
export default connect(mapStateToProps, { AddOrganization })(AddOrgModal);
