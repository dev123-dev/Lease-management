import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import "../../../../client/src/styles/CustomisedStyle.css";
import { updateProperty, getParticularOrg } from "../../actions/tenants";
import Select from "react-select";
const EditProperty = ({
  auth: { user },
  tenants: { particular_org_loc },
  Propertydata,
  setShowUpdateModal,
  updateProperty,
  getParticularOrg,
}) => {
  useEffect(() => {
    getParticularOrg({ OrganizationId: user && user.OrganizationId });
    fun();
  }, []);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);

  const [orgLoc, setLoc] = useState([]);
  const [Sellocation, SetselLoction] = useState([]);
  //adding multiple location start
  const [inputdata, setinput] = useState("");
  const [items, setitem] = useState([]);

  const handleLocationclose = (ele1, index) => {
    const delitem = items.filter((ele, ind) => {
      return ele1 !== ele;
    });
    setitem(delitem);
  };

  const [dno, setdno] = useState(Propertydata.shopDoorNo);
  console.log("data", Propertydata.shopDoorNo);
  const handleDoorNumclose = (ele1, index) => {
    const delitem = dno.filter((ele, ind) => {
      return ele1 !== ele;
    });
    setdno(delitem);
  };

  const addItem = () => {
    if (!inputdata) {
    } else {
      setitem([...items, inputdata]);
      setdno([...dno, inputdata]);
      setinput("");
    }
  };
  const onchangeLoc = (e) => {
    setLoc(e);
  };
  const loc = [];
  const { Location } = particular_org_loc[0];
  const fun = () => {
    particular_org_loc[0] &&
      Location.map((ele) => {
        loc.push({
          label: ele,
          value: ele,
        });
        SetselLoction(loc);
      });
  };
  //multiple location end
  const [formData, setFormData] = useState({
    buildingName: Propertydata.buildingName,
    shopDoorNo: [],
    Location: Propertydata.Location,
    shopAddress: Propertydata.shopAddress,
    hikePercentage: Propertydata.hikePercentage,
    stampDuty: Propertydata.stampDuty,
    LeaseTime: Propertydata.leaseTimePeriod,
    isSubmitted: false,
  });

  const {
    buildingName,
    shopDoorNo,
    shopAddress,
    hikePercentage,
    stampDuty,
    LeaseTime,
    shopStatus,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    setShowUpdateModal(false);
    const update = {
      OrganizationName: user.OrganizationName,
      Orgainzation_id: user.OrganizationId,
      Property_id: Propertydata._id,
      buildingName: buildingName,
      shopDoorNo: dno,
      shopAddress: shopAddress,
      hikePercentage: hikePercentage,
      stampDuty: stampDuty,
      leaseTimePeriod: LeaseTime,
      Location: orgLoc,
      isSubmitted: true,
      shopStatus: "Acquired",
    };
    console.log(update);
    updateProperty(update);
    handleEditModalClose();
  };

  return (
    <Fragment>
      <form onSubmit={(e) => onUpdate(e)}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <label>Building Name*:</label>

              <input
                type="text"
                name="buildingName"
                value={buildingName}
                className="form-control input"
                onChange={(e) => onInputChange(e)}
                required
              />
              <br></br>
            </div>
            <div className="col-lg-6">
              <label>Stamp Duty*: </label>
              <input
                type="text"
                name="stampDuty"
                value={stampDuty}
                placeholder={stampDuty}
                className="form-control  input"
                readOnly
              />
            </div>
            <div className="col-lg-6">
              <label>
                Hike<b>%</b>*:
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
              <label>Lease Time Period*: </label>
              <input
                type="text"
                name="hikePercentage"
                value={LeaseTime}
                className="form-control  input"
                readOnly
              />
            </div>
            <div className="col-lg-6">
              <label>Address*:</label>

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

              <label className="">Location*:</label>
              <Select
                name="orgLoc"
                options={Sellocation}
                value={orgLoc}
                onChange={(e) => onchangeLoc(e)}
                theme={(theme) => ({
                  ...theme,
                  height: 26,
                  minHeight: 26,
                  borderRadius: 1,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
                required
              />
            </div>

            <div className="  col-lg-6 ">
              <label className="ml-2">Door No*: </label>
              <input
                className="form-control"
                type="text"
                name="inputdata"
                value={inputdata}
                onChange={(e) => setinput(e.target.value)}
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
                    if (ele.status === "Avaiable") {
                      return (
                        <div className="eachItem" key={index1}>
                          <span>{ele.doorNo}</span>{" "}
                          <button
                            onClick={() => handleDoorNumclose(ele, index1)}
                            className="btndrp"
                          >
                            X
                          </button>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="col-lg-9 text-danger">
              * Indicates mandatory fields, Please fill mandatory fields before
              Submit
            </div>

            <div className="col-lg-3">
              <button
                className="btn sub_form btn_continue Save float-right"
                id="savebtn"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
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
  getParticularOrg,
})(EditProperty);
