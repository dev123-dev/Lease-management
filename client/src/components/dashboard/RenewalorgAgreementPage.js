import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { RenewOrgDetailsform } from "../../actions/tenants";
import Modal from "react-bootstrap/Modal";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
const ReneworgAggreement = ({
  auth: { isAuthenticated, user, users },
  RenewOrgDetailsform,
}) => {
  const Location = new useLocation();
  const orgData = Location.state;
  const histroy = useHistory();
  //formData
 
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

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
    var leaseEndDate = yyyy1 + "-" + mm2 + "-" + dd1;
    setLeaseEndDate(leaseEndDate);
    var newLeaseEndDate = yyyy1 + "-" + mm2 + "-" + dd1;
    setNewLeaseEndDate(newLeaseEndDate);
  };

  const [showModal, setShowModal] = useState(false);

  
  const onSubmit = (e) => {

    e.preventDefault();


    const finalData = {
      isSubmitted: true,
      OrganizationId: orgData._id,
      Orgname: orgData.OrganizationName,
      Orgemail: orgData.OrganizationEmail,
      Orgphone: orgData.OrganizationNumber,
      Location: orgData.Location,
      OrganizationAddress: orgData.OrganizationAddress,
      date: entryDate,
      enddate: leaseEndDate,
    };
//console.log("final data ",finalData)
    RenewOrgDetailsform(finalData);
   setShowModal(true)
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
     
<div className="mt-5">
<div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
      <div className="row container-fluid mt-5 cardAgreement">
      <form onSubmit={(e) => onSubmit(e)}>
      <div className="col-lg-12 col-sm-12 col-md-12 col-12">
              <span
                style={{ fontFamily: "Serif", color: "#095a4a", }}
                className="font-weight-bold headsize h2"
              >
                Renewal Agreement
              </span>
            </div>
        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
          <div className="col-lg-4 col-md-2 col-sm-1 col-12">
            <label>
              {" "}
              Organization Name*:{" "}
              
            </label>
          </div>

          <div className="col-lg-5  col-md-4 col-sm-4 col-12">
          <label><b>{orgData && orgData.OrganizationName}</b></label>
          </div>
        </div>
        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label>
            Lease Start Date* :
              
            </label>
          </div>

          <div className="col-lg-5  col-md-4 col-sm-4 col-12">
          <input
              type="date"
              placeholder="dd/mm/yyyy"
              className="form-control cpp-input datevalidation"
              name="tenantLeaseStartDate"
              value={entryDate}
              onChange={(e) => onDateChangeEntry(e)}
              required
            />
          </div>
        </div>
        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label>
              Lease End Date*:{" "}
              
            </label>
          </div>

          <div className="col-lg-5  col-md-4 col-sm-4 col-12">
          <input
              className="form-control cpp-input datevalidation"
              placeholder="dd-mm-yyyy"
              value={leaseEndDate}
             required
            ></input>
          </div>
        </div>
        <div className="col-lg-12 Savebutton" size="lg">
        
        <button
                    variant="success"
                    id="buttonchanges"
                    className="float-right mb-2"
                    type="submit"
                   
                  >
                    <b>Renew</b>
                  </button>
            <button
             className="float-right mb-2"
                    type="button"
                    variant="success"
                    id="buttonchanges"
                    onClick={() => { histroy.push('/MainSuper') }}
                  >
                    <b>Cancel</b>
                  </button>
           
           
        </div>
        </form>
      </div>
      </div>
      </div>
      <Modal
        show={showModal}
        backdrop="static"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="confirmbox-heading">
                        <h4 className="mt-0 mr-5 text-center">
                         CONFIRMATION&nbsp;&nbsp;
                        </h4>
                      </Modal.Header>
      <ModalBody className="h3 text-center">Renewed Successfully..!!</ModalBody>
       <ModalFooter><button  id="buttonchanges"
                    className="float-right mb-2"  onClick={() => { histroy.push('/SuperUser') }}>OK</button></ModalFooter>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, { RenewOrgDetailsform })(
  ReneworgAggreement
);
