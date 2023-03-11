import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
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

  console.log("hello", get_Particular_org_Tenantsetting);
  const [orgLoc, setLoc] = useState([]);
  const locationList = [];

  const [LOCATION, SetLocation] = useState(null);
  const [Sellocation, SetselLoction] = useState([]);
  const Loc = [];

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
  };

  const addItem = () => {
    if (!inputdata) {
    } else {
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showInformationModal, setShowInformation] = useState(false);
  const handleInformationModalopen = () => setShowInformation(true);
  const handleInformationModalClose = () => setShowInformation(false);
  const LogoutModalClose = () => {
    handleInformationModalClose();
  };
  const [fill, setfill] = useState(false);
  const onSubmit = () => {
    if (
      buildingName === "" ||
      Location === "" ||
      stampDuty === " " ||
      hikePercentage === " " ||
      // leaseTimePeriod === " " ||
      shopDoorNo === " "
      // address === " "
    ) {
      setfill(true);
    } else {
      setShow(false);
      const finalData = {
        OrganizationName: user.OrganizationName,
        OrganizationId: user.OrganizationId,
        buildingName: buildingName,
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
    }
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      <Modal.Header>
        <div className=" row col-lg-12 col-md-12 col-sm-12 col-12 ">
          <h2>
            <b className="text-center ">ADD PROPERTY DETAILS</b>
          </h2>
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
        <div className="container-fluid propcont">
          <div className="row">
            <div className="col-lg-6">
              <label>
                BuildingName
                <i className="text-danger ">
                  <b>*</b>
                </i>
              </label>

              <input
                type="text"
                placeholder="BuildingName"
                name="buildingName"
                value={buildingName}
                className="form-control input"
                onChange={(e) => onPropertychange(e)}
                required
              />
              <br></br>
            </div>
            <div className="col-lg-6">
              <label>
                Location
                <i className="text-danger ">
                  <b>*</b>
                </i>
              </label>
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
              ></Select>

              <br></br>
            </div>
            <div className="col-lg-6">
              <label>
                StampDuty{" "}
                <i className="text-danger ">
                  <b>*</b>
                </i>
              </label>
              <input
                type="text"
                placeholder={stampDuty}
                name="stampDuty"
                className="form-control  input"
                readOnly
              />
            </div>
            <div className="col-lg-6">
              <label>
                Hike<b>%</b>{" "}
                <i className="text-danger ">
                  <b>*</b>
                </i>
              </label>
              <input
                type="text"
                placeholder={hikePercentage}
                name="hikePercentage"
                className="form-control  input"
                readOnly
              />
            </div>
            <div className="col-lg-6">
              <label>
                LeaseTimePeriod{" "}
                <i className="text-danger ">
                  <b>*</b>
                </i>
              </label>
              <div className="controls">
                <input
                  placeholder={LeaseTime}
                  className="form-control"
                  readOnly
                />
                <span id="category_result" className="form-input-info"></span>
              </div>

              <label className="ml-2">
                DoorNo{" "}
                <i className="text-danger  ">
                  <b>*</b>
                </i>
              </label>

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

            <div className="col-lg-6">
              <label>
                Address
                <i className="text-danger ">
                  <b>*</b>
                </i>
              </label>

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
            <h5 className="Uservalidation">
              {fill ? <>Please fill all Mandatory(*) fields..!!</> : <></>}
            </h5>

            <div className="col-lg-12">
              <button
                className="btn sub_form btn_continue Save float-right  "
                id="savebtn"
                onClick={() => onSubmit()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

AddShopDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  AddShopDetailsform: PropTypes.func.isRequired,
  // getAllShops: PropTypes.func.isRequired,
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
