import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import "../../../../client/src/styles/CustomisedStyle.css";
import { updateProperty } from "../../actions/tenants";
const EditProperty = ({
  auth: { user },
  Property,
  setShowUpdateModal,
  updateProperty,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const handleOpen = () => setShowEditModal(true);
  const onAddStaffModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };

  //adding multiple location start
  const [inputdata, setinput] = useState("");
  const [items, setitem] = useState(Property.Location);

  const handleLocationclose = (ele1, index) => {
    const delitem = items.filter((ele, ind) => {
      return ele1 != ele;
    });
    setitem(delitem);
  };

  const [dno, setdno] = useState(Property.shopDoorNo);

  const handleDoorNumclose = (ele1, index) => {
    const delitem = dno.filter((ele, ind) => {
      return ele1 != ele;
    });
    setdno(delitem);
  };

  const addItem = () => {
    if (!inputdata) {
    } else {
      setitem([...items, inputdata]);
      setinput("");
    }
  };
  //multiple location end

  const [formData, setFormData] = useState({
    buildingName: Property.buildingName,
    shopDoorNo: [],
    Location: Property.Location,
    shopAddress: Property.shopAddress,
    hikePercentage: Property.hikePercentage,
    stampDuty: Property.stampDuty,
    LeaseTime: Property.leaseTimePeriod,
    isSubmitted: false,
  });

  const {
    buildingName,
    shopDoorNo,
    shopAddress,
    hikePercentage,
    stampDuty,
    LeaseTime,
    Location,
    shopStatus,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onUpdate = () => {
    setShowUpdateModal(false);
    const update = {
      OrganizationName: user.OrganizationName,
      Orgainzation_id: user.OrganizationId,
      Property_id: Property._id,
      buildingName: buildingName,
      shopDoorNo: dno,
      shopAddress: shopAddress,
      hikePercentage: hikePercentage,
      stampDuty: stampDuty,
      leaseTimePeriod: LeaseTime,
      Location: Location,
      isSubmitted: true,
      shopStatus: "Acquired",
    };
    updateProperty(update);
    handleEditModalClose();
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <label>Building Name</label>

            <input
              type="text"
              placeholder="Building Name"
              name="buildingName"
              value={buildingName}
              className="form-control input"
              onChange={(e) => onInputChange(e)}
              required
            />
            <br></br>
          </div>
          <div className="col-lg-6">
            <label>Stamp Duty </label>
            <input
              type="text"
              name="stampDuty"
              value={stampDuty}
              className="form-control  input"
              readOnly
            />
          </div>
          <div className="col-lg-6">
            <label>
              Hike<b>%</b>{" "}
            </label>
            <input
              type="text"
              name="hikePercentage"
              value={hikePercentage}
              className="form-control  input"
              readOnly
            />
          </div>
          <div className="col-lg-6">
            <label>Lease Time Period </label>
            <input
              type="text"
              name="hikePercentage"
              value={LeaseTime}
              className="form-control  input"
              readOnly
            />
          </div>
          <div className="col-lg-6">
            <label>Address</label>

            <textarea
              name="shopAddress"
              value={shopAddress}
              id=" addprop "
              className="textarea form-control"
              rows="3"
              placeholder="Address"
              onChange={(e) => onInputChange(e)}
              style={{ width: "100%" }}
              required
            ></textarea>
            <br></br>

            <label className="">Location</label>
            <input
              type="text"
              placeholder="Location"
              name="Location"
              value={Location}
              className="form-control  input"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>

          <div className="  col-lg-6 ">
            <label className="ml-2">Door No </label>
            <input
              className="form-control"
              type="text"
              name="shopDoorNo"
              value={inputdata}
              onChange={(e) => setinput(e.target.value)}
              placeholder="Door Number"
              id="Door Number"
            ></input>
            <div>
              <div className="locadd " onClick={addItem}>
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
              <div className="showItemcl ">
                {dno.map((ele, index1) => {
                  return (
                    <div className="eachItem" key={index1}>
                      <span>{ele}</span>{" "}
                      <button
                        onClick={() => handleDoorNumclose(ele, index1)}
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

          <div className="col-lg-12">
            <button
              className="btn sub_form btn_continue Save float-right"
              id="savebtn"
              onClick={() => onUpdate()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants1: state.tenants,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  updateProperty,
})(EditProperty);
