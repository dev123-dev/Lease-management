import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Fragment } from "react";
import { connect } from "react-redux";
import { AddOrganization } from "../../actions/tenants";
import FileBase64 from "react-file-base64";

const AddOrgModal = ({
  // tenants: {AddOrganization },
  auth: { isAuthenticated, user, users },
  AddOrganization,
  setShowadd,
}) => {
  const [entryDate, setEntryDate] = useState("");
  const [leaseEndDate, setLeaseEndDate] = useState("");
  const [newLeaseEndDate, setNewLeaseEndDate] = useState("");

  const onDateChangeEntry = (e) => {
    setEntryDate(e.target.value);

    var newDate = e.target.value;
    var calDate = new Date(newDate);

    var leaseMonth = 12;

    //Calculating lease end date
    var dateData = calDate.getDate();
    calDate.setMonth(calDate.getMonth() + +leaseMonth);
    if (calDate.getDate() !== dateData) {
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
    var leaseEndDate = mm2 + "-" + dd1 + "-" + yyyy1; //yyyy1 + "-" + mm2 + "-" + dd1;
    setLeaseEndDate(leaseEndDate);
    var newLeaseEndDate = yyyy1 + "-" + mm2 + "-" + dd1;
    setNewLeaseEndDate(newLeaseEndDate);
  };

  const [inputdata, setinput] = useState("");
  const [items, setitem] = useState([]);

  const handleLocationclose = (index) => {
    const delitem = items.filter((ele, ind) => {
      return ind !== index;
    });
    setitem(delitem);
    if (items.length === 1) {
      setshowscroll("none");
    }
  };

  const addItem = () => {
    if (!inputdata) {
    } else {
      setshowscroll("block");
      setitem([...items, inputdata]);
      setinput("");
    }
  };
  const [formDataORG, setFormDataORG] = useState({
    OrganizationName: "",
    OrganizationEmail: "",
    OrganizationNumber: "",
    OrganizationAddress: "",
    date: "",
    enddate: "",
    Logo: "",
    Location: [],
  });
  const {
    OrganizationName,
    OrganizationEmail,
    OrganizationNumber,
    OrganizationAddress,
    Logo,
  } = formDataORG;

  const onORGchange = (e) => {
    e.preventDefault();
    setFormDataORG({
      ...formDataORG,
      [e.target.name]: e.target.value,
    });
  };

  const [showscroll, setshowscroll] = useState("none");
  const [showAdd, setShowAdd] = useState();
  const onshow = () => setShowAdd(true);
  const onremove = () => setShowAdd(false);

  const [locationError, setLocationError] = useState("black");

  const onSubmitORGdata = (e) => {
    e.preventDefault();
    if (items.length == 0) {
      setLocationError("red");
    } else {
      const finalORGdata = {
        OrganizationName: OrganizationName,
        OrganizationEmail: OrganizationEmail,
        OrganizationNumber: OrganizationNumber,
        OrganizationAddress: OrganizationAddress,
        date: entryDate,
        Logo: Logo,
        enddate: newLeaseEndDate,
        Location: items,
      };
      AddOrganization(finalORGdata);
      setShowadd(false);
      onshow();
      setFormDataORG({
        ...formDataORG,
        OrganizationName: "",
        OrganizationEmail: "",
        OrganizationNumber: "",
        OrganizationAddress: "",
        OrganizationStatus: "",
        date: "",
        Logo: "",
        enddate: "",
        Location: [],
      });
    }
  };
  return !isAuthenticated || !user || !users ? (
    <></>
  ) : (
    <>
      <Modal.Header className="confirmbox-heading">
        <div className="col-lg-10 ">
          <div className=" ml-5">
            <h4
              style={{
                color: "white",
              }}
            >
              Add Organization Details
            </h4>
          </div>
        </div>
        <div className="col-lg-2 ">
          <button onClick={() => setShowadd(false)} className="close">
            <img
              className="editcl"
              src={require("../../static/images/close.png")}
              alt="X"
              style={{ height: "20px", width: "20px" }}
            />
          </button>
        </div>
      </Modal.Header>

      <Modal.Body className="org_add ">
        <form onSubmit={(e) => onSubmitORGdata(e)}>
          <div className="container-fluid ">
            <div className="row">
              <div className="col-lg-6 col-sm-12 col-md-12 col-12">
                <label> Organization Name*:</label>
                <input
                  type="text"
                  name="OrganizationName"
                  value={OrganizationName}
                  onChange={(e) => onORGchange(e)}
                  className="form-control    "
                  placeholder="Organization Name"
                  required
                />{" "}
                <br></br>
              </div>
              <div className="col-lg-6">
                <label>Email*:</label>
                <input
                  type="email"
                  name="OrganizationEmail"
                  value={OrganizationEmail}
                  onChange={(e) => onORGchange(e)}
                  className="form-control"
                  placeholder="Email"
                  required
                />
                <br></br>
              </div>{" "}
              <div className="col-lg-6">
                <label>Phone No:</label>
                <input
                  type="number"
                  name="OrganizationNumber"
                  value={OrganizationNumber}
                  onChange={(e) => onORGchange(e)}
                  className="form-control"
                  placeholder="Phone Number"
                />
                <br></br>
              </div>
              <div className="col-lg-6">
                <label>Lease Start Date*:</label>
                <input
                  type="date"
                  //placeholder="dd/mm/yyyy"
                  className="form-control cpp-input datevalidation"
                  name="tenantLeaseStartDate"
                  value={entryDate}
                  onChange={(e) => onDateChangeEntry(e)}
                  style={{
                    width: "100%",
                  }}
                  required
                />
              </div>
              <div className="col-lg-6">
                <label>Lease End Date*:</label>
                <br></br>
                <input
                  type="text"
                  value={leaseEndDate}
                  className="form-control cpp-input datevalidation"
                  name="leaseEndDate"
                  style={{
                    width: "100%",
                  }}
                  readOnly
                />
                <br></br>
                <label> Address*:</label>
                <textarea
                  name="OrganizationAddress"
                  value={OrganizationAddress}
                  onChange={(e) => onORGchange(e)}
                  className="textarea form-control"
                  rows="3"
                  cols="20"
                  placeholder="Address"
                  style={{ width: "100%" }}
                  required
                ></textarea>{" "}

              </div>
              <div className="col-lg-6">
               
              <label className="ml-2" style={{ color: locationError }}>
                  Location*:
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
                      className="bi bi-plus-lg"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                      />
                    </svg>
                  </div>
                  <br></br>
                  <div
                    className="showItemcl plusiconbck"
                    style={{ display: showscroll }}
                  >
                    {items.map((ele, index) => {
                      return (
                        <div className="eachItem" key={index}>
                          <span>{ele}</span>
                          <button
                            type="button"
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
              <div className="row col-lg-8 col-md-12 col-sm-12 col-12 py-3">
                <label className="label-control">Organization Logo :</label>

                <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
                  <FileBase64
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setFormDataORG({
                        ...formDataORG,
                        Logo: base64,
                      })
                    }
                  />
                  
                  </div>
                  </div>
                  <div className="row col-lg-4 col-md-12 col-sm-12 col-12 py-5 d-flex justify-content-center align-item-center  " >

                  <img className="log_size " alt="Preview" src={`${Logo}`}/>
                </div>
              
              <div className="col-lg-9 text-danger">
                * Indicates mandatory fields, Please fill mandatory fields
                before Submit
              </div>
              <div className="col-lg-3">
                <Modal.Footer>
                  <div className=" Savebutton  " size="lg">
                    <button
                      variant="success"
                      id="savebtn"
                      className="btn sub_form btn_continue Save float-right"
                    >
                      Save
                    </button>
                  </div>
                </Modal.Footer>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});
export default connect(mapStateToProps, { AddOrganization })(AddOrgModal);
