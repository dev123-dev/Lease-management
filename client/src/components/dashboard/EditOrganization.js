import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import "../../../../client/src/styles/CustomisedStyle.css";
import FileBase64 from "react-file-base64";
import { updateOrganization, getAllOrganization } from "../../actions/tenants";
const EditOrganization = ({
  auth: { isAuthenticated, user, users },
  org,
  EditModal,
  getAllOrganization,
  updateOrganization,
}) => {
  useEffect(() => {
    getAllOrganization();
  }, []);
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
    Logo: org.Logo,
    Location: items,
  });

  const {
    OrganizationName,
    OrganizationEmail,
    OrganizationNumber,
    OrganizationAddress,
    Logo,
    startdate,
    enddate,
  } = formDataORG;

  //Leasestartdate
  const [showStartdate, setShowStartdate] = useState(org.date);
  const [showEnddate, setShowEnddate] = useState(org.enddate);
  var ED = showEnddate.split(/\D/g);
  var endDate = [ED[2], ED[1], ED[0]].join("-");

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
      var leaseEndDate = yyyy1 + "-" + mm2 + "-" + dd1;
      setShowEnddate(leaseEndDate);
    }
    setFormDataORG({ ...formDataORG, [e.target.name]: e.target.value });
  };
  const [locError, setLocError] = useState("black");
  const [imgError, setImgError] = useState("black");
  const onUpdate = (e) => {
    if (Logo === " ") {
      setImgError("red");
      e.preventDefault();
    } else {
      e.preventDefault();
      if (items.length === 0) {
        setLocError("red");
      } else {
        const updateData = {
          OrganizationId: org._id,
          OrganizationName: OrganizationName,
          OrganizationEmail: OrganizationEmail,
          OrganizationNumber: OrganizationNumber,
          OrganizationAddress: OrganizationAddress,
          startdate: showStartdate,
          Logo: Logo,
          enddate: showEnddate,
          Location: items,
        };
        // console.log(updateData);
        updateOrganization(updateData);
        getAllOrganization();

        EditModal(false);
      }
    }
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <form onSubmit={(e) => onUpdate(e)}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6  col-sm-12 col-md-12">
              <label> Organization Name*:</label>

              <input
                type="text"
                name="OrganizationName"
                value={OrganizationName}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
              <br></br>
            </div>
            <div className="col-lg-6  col-sm-12 col-md-12">
              <label>Email*: </label>
              <input
                type="email"
                name="OrganizationEmail"
                value={OrganizationEmail}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
              <br></br>
            </div>
            <div className="col-lg-6  col-sm-12 col-md-12">
              <label>Phone No*:</label>

              <input
                type="number"
                name="OrganizationNumber"
                value={OrganizationNumber}
                pattern="\d{10}"
                title=" 10 Digits only"
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
              <br></br>
            </div>

            <div className="col-lg-6  col-sm-12 col-md-12">
              <label>Lease Start Date*:</label>
              <input
                name="startdate"
                type="date"
                //  name="user"
                value={startdate}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
              <br></br>
            </div>
            <div className="col-lg-6  col-sm-12 col-md-12">
              <label>Lease End Date*:</label>
              <input
                type="text"
                readOnly={true}
                value={endDate}
                className="form-control"
                placeholder={enddate}
                onChange={(e) => onInputChange(e)}
                required
              />
              <br></br>
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
            <div className="col-lg-6  col-sm-12 col-md-12">
              <label className="ml-2" style={{ color: locError }}>
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
              <div className="plusiconbck">
                <div className="locaddedit " onClick={addItem}>
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
            <div className="row col-lg-8 col-md-12 col-sm-12 col-12 py-3">
              <label className="label-control" style={{ color: imgError }}>
                Organization Logo :
              </label>

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
              <i className="smallsize">(File size must be less than 70kb)</i>
            </div>
            <div className="row col-lg-4 col-md-12 col-sm-12 col-12 py-5 d-flex justify-content-center align-item-center  ">
              <img
                className="log_size"
                alt="Preview"
                src={`${Logo}`}
                style={{ height: "100px", width: "200px" }}
              />
            </div>
          </div>
        </div>

        <br></br>

        {/*------------- Multiple Location adding details Ending------------ */}
        <div className="col-lg-9   col-sm-12 col-md-12 text-danger">
          * Indicates mandatory fields, Please fill mandatory fields before
          Submit
        </div>
        <div className="col-lg-3  col-sm-12 col-md-12 float-right">
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
  getAllOrganization,
})(EditOrganization);
