import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import "../../../../client/src/styles/CustomisedStyle.css";
import { updateOrganization } from "../../actions/tenants";
const EditOrganization = ({
  auth: { isAuthenticated, user, users },
  org,
  EditModal,
  updateOrganization,
}) => {
  // adding multiple location start
  const [inputdata, setinput] = useState("");
  const [items, setitem] = useState(org.Location);

  const handleLocationclose = (ele1, index) => {
    
    const delitem = items.filter((ele, ind) => {
      return ele1 !== ele;
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
    enddate: org.enddate,
    Logo: "",
    Location: items,
  });

  const {
    OrganizationName,
    OrganizationEmail,
    OrganizationNumber,
    OrganizationAddress,
    startdate,
    enddate,
  } = formDataORG;

  //Leasestartdate
  const [showStartdate, setShowStartdate] = useState(org.date);
  const [showEnddate, setShowEnddate] = useState(org.enddate);

  const onInputChange = (e) => {
    if (e.target.name === "startdate") {
      setShowStartdate(e.target.value);
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
      setShowEnddate(leaseEndDate);
    }
    setFormDataORG({ ...formDataORG, [e.target.name]: e.target.value });
  };

  const onUpdate = (e) => {
    // console.log(e)
    e.preventDefault();
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
    updateOrganization(updateData);
   
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <form onSubmit={(e) => onUpdate(e)}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <label> Organization Name*:</label>

              <input
                type="text"
                name="OrganizationName"
                value={OrganizationName}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              /><br></br>
            </div>
            <div className="col-lg-6">
              <label>Email*: </label>
              <input
                type="email"
                name="OrganizationEmail"
                value={OrganizationEmail}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              /><br></br>
            </div>
            <div className="col-lg-6">
              <label>Phone No:</label>

              <input
                type="number"
                name="OrganizationNumber"
                value={OrganizationNumber}
                className="form-control"
                onChange={(e) => onInputChange(e)}
              /><br></br>
            </div>
            
            <div className="col-lg-6">
              <label>Lease Start Date*:</label>
              <input
                name="startdate"
                type="date"
                //  name="user"
                value={startdate}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              /><br></br>
            </div>
            <div className="col-lg-6">
              <label>Lease End Date*:</label>
              <input
                type="text"
                readOnly={true}
                value={showEnddate}
                className="form-control"
                placeholder={enddate}
                onChange={(e) => onInputChange(e)}
                required
              /><br></br>
              <label className="ml-2">Location*:</label>
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
                <div className="showItemcl">
                  {items.map((ele, index1) => {
                    return (
                      <div className="eachItem" key={index1}>
                        <span>{ele}</span>{" "}
                        <button
                        type="button"
                          onClick={(e) => handleLocationclose(ele, index1)}
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
            <div className="col-lg-6">
              <label> Address*: </label>
              <textarea
                name="OrganizationAddress"
                value={OrganizationAddress}
                className="textarea form-control"
                rows="3"
                cols="20"
                placeholder="Address"
                onChange={(e) => onInputChange(e)}
                style={{ width: "100%" }}
                required
              ></textarea>{" "}
            </div>
          </div>
        </div>

        <br></br>

        {/*------------- Multiple Location adding details Ending------------ */}
        <div className="col-lg-9 text-danger">
          * Indicates mandatory fields, Please fill mandatory fields before
          Submit
        </div>
        <div className="col-lg-3 float-right">
          <button
            id="savebtn"
            className="btn sub_form btn_continue Save float-right"
          >
            Update
          </button>
        </div>
      </form>
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
