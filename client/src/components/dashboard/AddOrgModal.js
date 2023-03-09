import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Fragment } from "react";
import { connect } from "react-redux";
import { AddOrganization } from "../../actions/tenants";

const AddOrgModal = ({
  // tenants: {AddOrganization },
  auth: { isAuthenticated, user, users, finalDataRep },
  AddOrganization,
  setShowadd,
}) => {
  const [entryDate, setEntryDate] = useState("");
  const [leaseEndDate, setLeaseEndDate] = useState("");
  const [newLeaseEndDate, setNewLeaseEndDate] = useState();

  const onDateChangeEntry = (e) => {
    setEntryDate(e.target.value);

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
    setLeaseEndDate(leaseEndDate);
    var newLeaseEndDate = yyyy1 + "-" + mm2 + "-" + dd1;
    setNewLeaseEndDate(newLeaseEndDate);
  };

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
    enddate,
    date,
    Location,
  } = formDataORG;

  const onORGchange = (e) => {
    setFormDataORG({
      ...formDataORG,
      [e.target.name]: e.target.value,
    });
  };
  const [showAddModal, setModal] = useState();
  const show = () => setModal(true);

  const [showAdd, setShowAdd] = useState();
  const onshow = () => setShowAdd(true);
  const onremove = () => setShowAdd(false);

  //fill all the field state
  const [fill, setfill] = useState(false);

  const onSubmitORGdata = () => {
    if (
      OrganizationName === "" ||
      OrganizationEmail === "" ||
      OrganizationNumber === "" ||
      OrganizationAddress === "" ||
      entryDate === "" ||
      newLeaseEndDate === "" ||
      items === ""
    ) {
      setfill(true);
    } else {
      setShowAdd(false);
      const finalORGdata = {
        OrganizationName: OrganizationName,
        OrganizationEmail: OrganizationEmail,
        OrganizationNumber: OrganizationNumber,
        OrganizationAddress: OrganizationAddress,
        date: entryDate,
        enddate: newLeaseEndDate,
        Location: items,
      };
      //console.log(finalORGdata);
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
        enddate: "",
        Location: [],
      });
    }
  };
  return !isAuthenticated || !user || !users ? (
    <Fragment>123</Fragment>
  ) : (
    <div>
      <Fragment>
        {/* Adding Organization     onClick={() => setShowadd(false)}*/}

        <Modal.Header>
          <div className="col-lg-10 ">
            <h3>
              <b className="text-center ">Add Organization Details </b>
            </h3>
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
          <div className="container-fluid ">
            <div className="row">
              <div className="col-lg-6 col-sm-12 col-md-12 col-12">
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
                  className="form-control    "
                  placeholder="OrganizationName"
                />
              </div>
              <br></br>
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
                  placeholder="Email"
                />{" "}
              </div>{" "}
              <br></br>
              <div className="col-lg-6">
                PhoneNo
                <input
                  type="number"
                  name="OrganizationNumber"
                  value={OrganizationNumber}
                  onChange={(e) => onORGchange(e)}
                  className="form-control"
                  placeholder="PhoneNumber"
                />
              </div>
              <div className="col-lg-6">
                <label>No Of User</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Number Of User"
                  readOnly={true}
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
                  className="form-control cpp-input datevalidation"
                  name="tenantLeaseStartDate"
                  value={entryDate}
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
                </label>
                <br></br>
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  value={leaseEndDate}
                  className="form-control cpp-input datevalidation"
                  name="tenantLeaseStartDate"
                  style={{
                    width: "100%",
                  }}
                />
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
                  className="textarea form-control"
                  rows="3"
                  cols="20"
                  placeholder="Address"
                  style={{ width: "100%" }}
                ></textarea>{" "}
              </div>
              <div className="  col-lg-6 ">
                <label className="ml-2">
                  Location
                  <i className="text-danger  ">
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
              <h5 className="Uservalidation">
                {fill ? <>Please fill all Mandatory(*) fields..!!</> : <> </>}
              </h5>
              <div className="col-lg-12">
                <Modal.Footer>
                  <div className=" Savebutton  " size="lg">
                    <button
                      variant="success"
                      id="savebtn"
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
      </Fragment>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});
export default connect(mapStateToProps, { AddOrganization })(AddOrgModal);
