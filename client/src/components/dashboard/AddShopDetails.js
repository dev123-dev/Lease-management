import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { AddShopDetailsform } from "../../actions/tenants";
import { Modal, Button } from "react-bootstrap";
import { getParticularProperty } from "../../actions/tenants";
import "../../../../client/src/styles/CustomisedStyle.css";
import Select from "react-select";
import {
  getParticularOrg,
  getParticularTenantSetting,
} from "../../actions/tenants";

const AddShopDetails = ({
  auth: { isAuthenticated, user, users },
  tenants: { particular_org_loc, get_Particular_org_Tenantsetting },
  AddShopDetailsform,
  getParticularOrg,
  setShowadd,
  getParticularTenantSetting,
  getParticularProperty,
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));
  const [pageRefresh, SetRefresh] = useState(false);
  useEffect(() => {
    fun();
    getParticularOrg({ OrganizationId: myuser && myuser.OrganizationId });
    getParticularProperty({ OrganizationId: myuser && myuser.OrganizationId });
    getParticularTenantSetting({
      OrganizationId: myuser && myuser.OrganizationId,
    });
  }, [pageRefresh]);

  const [orgLoc, setLoc] = useState([]);
  const [Sellocation, SetselLoction] = useState([]);
  const Loc = [];
  const [showscroll, setshowscroll] = useState("none");
  const { _id, Location } = particular_org_loc[0];
  const fun = () => {
    particular_org_loc[0] &&
      Location.map((ele) => {
        Loc.push({
          label: ele,
          value: ele,
        });
        SetselLoction(Loc);
      });
  };
  const onchangeLoc = (e) => {
    setLoc(e);
  };

  //formData

  const [formData, setFormData] = useState({
    buildingName: "",
    shopDoorNo: [],
    hikePercentage:
      get_Particular_org_Tenantsetting &&
      get_Particular_org_Tenantsetting[0] &&
      get_Particular_org_Tenantsetting[0].hikePercentage,
    stampDuty:
      get_Particular_org_Tenantsetting &&
      get_Particular_org_Tenantsetting[0] &&
      get_Particular_org_Tenantsetting[0].stampDuty,
    LeaseTime:
      get_Particular_org_Tenantsetting &&
      get_Particular_org_Tenantsetting[0] &&
      get_Particular_org_Tenantsetting[0].leaseTimePeriod,
    shopAddress: "",
    isSubmitted: false,
  });

  const [inputdata, setinput] = useState("");
  const [items, setitem] = useState([]);

  const {
    buildingName,
    shopDoorNo,
    hikePercentage,
    stampDuty,
    LeaseTime,
    shopAddress,
    shopStatus,
  } = formData;

  const handleLocationclose = (index) => {
    const delitem = items.filter((ele, ind) => {
      return ind != index;
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

  const onPropertychange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [showInformationModal, setShowInformation] = useState(false);
  const handleInformationModalopen = () => setShowInformation(true);
  const handleInformationModalClose = () => setShowInformation(false);
  const LogoutModalClose = () => {
    handleInformationModalClose();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // setShow(false);
    const finalData = {
      OrganizationName: user.OrganizationName,
      OrganizationId: user.OrganizationId,
      buildingname: buildingName,
      shopDoorNo: items,
      hikePercentage: hikePercentage,
      stampDuty: stampDuty,
      leaseTimePeriod: LeaseTime,
      shopAddress: shopAddress,
      isSubmitted: false,
      Location: orgLoc.value,
      shopStatus: "Acquired",
    };

    AddShopDetailsform(finalData);
    setFormData({
      ...formData,
      buildingName: "",
      inputdata: "",
      hikePercentage: "",
      stampDuty: "",
      leaseTimePeriod: "",
      address: "",
      shopStatus: "",
      isSubmitted: true,
    });
    // handleInformationModalopen();
    setShowadd(false);
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      <Modal.Header>
        <div className=" row col-lg-12 col-md-12 col-sm-12 col-12 modhead">
          <h3>
            <b className="text-center ">ADD PROPERTY DETAILS</b>
          </h3>
        </div>
        <div className="col-lg-2">
          <button
            onClick={() => {
              setShowadd(false);
            }}
            className="close"
          >
            <img
              className="mr-5"
              src={require("../../static/images/close.png")}
              alt="X"
              style={{ height: "20px", width: "20px" }}
            />
          </button>
        </div>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="container-fluid propcont">
            <div className="row">
              <div className="col-lg-6">
                <label>Building Name*:</label>

                <input
                  type="text"
                  placeholder="Building Name"
                  name="buildingName"
                  value={buildingName}
                  className="form-control input"
                  onChange={(e) => onPropertychange(e)}
                  required
                />
                <br></br>
              </div>
              <div className="col-lg-6">
                <label>Location*:</label>
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
                ></Select>

                <br></br>
              </div>
              <div className="col-lg-6">
                <label>Stamp Duty*:</label>
                <input
                  type="text"
                  placeholder={stampDuty}
                  name="stamp Duty"
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
                  placeholder={hikePercentage}
                  name="hikePercentage"
                  className="form-control  input"
                  readOnly
                />{" "}
                <br></br>
              </div>
              <div className="col-lg-6">
                <label>Lease Time Period*:</label>
                <div className="controls">
                  <input
                    placeholder={LeaseTime}
                    className="form-control"
                    readOnly
                  />
                  <span id="category_result" className="form-input-info"></span>{" "}
                  <br></br>
                </div>

                <label className="ml-2">Door No*:</label>

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
                  <br></br>
                  <div className="showItemcl " style={{ display: showscroll }}>
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

              <div className="col-lg-6">
                <label>Address*:</label>

                <textarea
                  name="shopAddress"
                  value={shopAddress}
                  id=" addprop "
                  className="textarea form-control"
                  rows="3"
                  placeholder="Address"
                  onChange={(e) => onPropertychange(e)}
                  style={{ width: "100%" }}
                  required
                ></textarea>
                <br></br>
              </div>
              <div className="col-lg-9 text-danger">
                * Indicates mandatory fields, Please fill mandatory fields
                before Submit
              </div>

              <div className="col-lg-3">
                <button
                  type="submit"
                  className="btn sub_form btn_continue Save float-right  "
                  id="savebtn"
                >
                  Save
                </button>
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

export default connect(mapStateToProps, {
  AddShopDetailsform,
  getParticularProperty,
  getParticularTenantSetting,
  getParticularOrg,
})(AddShopDetails);
