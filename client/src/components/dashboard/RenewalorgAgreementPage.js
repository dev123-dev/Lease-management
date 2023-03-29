import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { RenewOrgDetailsform } from "../../actions/tenants";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const ReneworgAggreement = ({
  auth: { isAuthenticated, user, users },
  RenewOrgDetailsform,
}) => {
  const Location = new useLocation();
  const orgData = Location.state;

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
    var leaseEndDate = dd1 + "-" + mm2 + "-" + yyyy1;
    setLeaseEndDate(leaseEndDate);
    var newLeaseEndDate = yyyy1 + "-" + mm2 + "-" + dd1;
    setNewLeaseEndDate(newLeaseEndDate);
  };

  // useState({
  //   isSubmitted: false,
  //   OrganizationId: orgData._id,
  //   Orgname: orgData.OrganizationName,
  //   Orgemail: orgData.OrganizationEmail,
  //   Orgphone: orgData.OrganizationNumber,
  //   Location: orgData.Location,
  //   OrganizationAddress: orgData.OrganizationAddress,
  //   date: entryDate,
  //   enddate: leaseEndDate,
  // });

//console.log(orgData)
  const onSubmit = () => {
    alert()
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
    RenewOrgDetailsform(finalData);
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <div className="mt-5  ">
       {/* ////////////////////////////////////////////////////////// */}
<div className="container-fluid mt-5 cardAgreement ">
<div className="col ">
<span
            style={{ fontFamily: "Serif", color: "#095a4a", marginLeft: "10px" }}
            className="font-weight-bold headsize h2"
          >
            Renewal Agreement
          </span>
</div>



<div className="col ">

<div className="row">

  <div className="col-lg-6 col-md-6 col-sm-12">
  <label> Organization Name:</label>
  </div>

  <div className="col-lg-6 col-md-6 col-sm-12">
  <label> <b>{orgData && orgData.OrganizationName}</b> </label>
  </div>


</div> 

<div className="row">

  <div className="col-lg-6 col-md-6 col-sm-12">
  <label>Lease Start Date* :</label>
  </div>

  <div className="col-lg-6 col-md-6 col-sm-12">
  <input
              type="date"
              placeholder="dd/mm/yyyy"
              className="form-control cpp-input datevalidation"
              name="tenantLeaseStartDate"
              value={entryDate}
              onChange={(e) => onDateChangeEntry(e)}
              style={{
                width: "60%",
              }}
            />
  </div>

</div> 
    
<div className="row">

  <div className="col-lg-6 col-md-6 col-sm-12 ">
  <label>Lease End Date:</label>
  </div>

  <div className="col-lg-6 col-md-6 col-sm-12">
  <input
              className="form-control cpp-input datevalidation"
              placeholder="dd-mm-yyyy"
              value={leaseEndDate}
              style={{
                width: "60%",
              }}
            ></input>
  </div>

</div> 

<div className="row">
<div className="col-lg-6 col-md-6 col-sm-12"></div>
  <div className="col-lg-6 col-md-6 col-sm-12 Savebutton ">
  
            <button
              variant="success"
              id="buttonchanges"
              onClick={() => onSubmit()}
            >
              <b>Renew</b>
            </button>
            &nbsp;
            {/* <Link to="/Organization-report"> */}
            <button
            type="submit"
              variant="success"
              id="buttonchanges"
              // onClick={() => onSubmit()}
            >
              <b>Cancel</b>
            </button>
           
  </div>
  {/* <div className="col-lg-4 colmd-4 col-sm-12"></div> */}

  {/* <div className="col-lg-6 col-md-6 col-sm-12">
  <input
              className="form-control cpp-input datevalidation"
              placeholder="dd-mm-yyyy"
              value={leaseEndDate}
              style={{
                width: "25%",
              }}
            ></input>
  </div> */}

</div> 


</div>

</div>

{/* ////////////////////////////////// */}

        {/* <div className="row card-new1 ">
         
          <div className="col">
          <h2
            style={{ fontFamily: "Serif", color: "#095a4a", marginLeft: "10px" }}
            className="font-weight-bold headsize"
          >
            Renewal Agreement
          </h2>
          </div>
          </div> */}

        {/* <div className="col-lg-12 col-md-12 col-sm-12 col-12   "> */}
         
        {/* </div>
        <div> */}
        {/* <div className="row   ">
          <div
            className="col-lg-2 col-md-2 col-sm-4 col-12 "
            style={{ paddingRight: "0px" }}
          >
            <label> Organization Name:</label>
          </div>
          <div className="col-lg-10  col-md-4 col-sm-4 col-12">
            <label>
              <b>{orgData && orgData.OrganizationName}</b>
            </label>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-2 col-md-2 col-sm-4 col-12">
            <label>Lease Start Date* :</label>
          </div>

          <div className="col-lg-10 col-md-4 col-sm-4 col-12">
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              className="form-control cpp-input datevalidation"
              name="tenantLeaseStartDate"
              value={entryDate}
              onChange={(e) => onDateChangeEntry(e)}
              style={{
                width: "25%",
              }}
            />
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-2 col-md-2 col-sm-4 col-12">
            <label>Lease End Date:</label>
          </div>

          <div className="col-lg-10  col-md-4 col-sm-4 col-12">
            <input
              className="form-control cpp-input datevalidation"
              placeholder="dd-mm-yyyy"
              value={leaseEndDate}
              style={{
                width: "25%",
              }}
            ></input>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-2 col-md-2 col-sm-4 col-12"></div>

          <div className="col-lg-10 Savebutton">
            <button
              variant="success"
              id="buttonchanges"
              onClick={() => onSubmit()}
            >
              <b>Renew</b>
            </button>
            &nbsp;
            {/* <Link to="/Organization-report"> */}
            {/* <button
            type="submit"
              variant="success"
              id="buttonchanges"
              // onClick={() => onSubmit()}
            >
              <b>Cancel</b>
            </button> */}
            {/* </Link> 
          </div>
          </div> 
       </div> 
        {/* </div> */}
      </div>
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
