import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { AddShopDetailsform } from "../../actions/tenants";
import { Modal, Button } from "react-bootstrap";
import { getParticularProperty } from "../../actions/tenants";
import "../../../../client/src/styles/CustomisedStyle.css";
import Select from "react-select";
import { getParticularOrg, getAllSettings } from "../../actions/tenants";

const AddShopDetails = ({
  auth: { isAuthenticated, user, users },
  tenants: { particular_org_loc, allTenantSetting },
  AddShopDetailsform,
  getParticularOrg,
  setShowadd,
  getAllSettings,
  getParticularProperty,
}) => {
  const [RoomAlreadyExist, SetRoomAlreadyExist] = useState({
    color: "white",
    fontFamily: "Arial",
    display: "none",
  });

  const myuser = JSON.parse(localStorage.getItem("user"));
  const [pageRefresh, SetRefresh] = useState(false);
  useEffect(() => {
    if (myuser) {
      fun();
      getParticularOrg({ OrganizationId: myuser && myuser.OrganizationId });
      getParticularProperty({
        OrganizationId: myuser && myuser.OrganizationId,
      });
      getAllSettings({
        OrganizationId: myuser && myuser.OrganizationId,
        userId: myuser && myuser._id,
      });
    }
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
    setErrors({
      ...errors,
      LocChecker: true,
      LocErrorStyle: { color: "#000" },
    });
    setLoc(e);
  };

  //formData

  const [formData, setFormData] = useState({
    buildingName: "",
    shopDoorNo: [],
    hike: allTenantSetting && allTenantSetting.hike,
    stampDuty: allTenantSetting && allTenantSetting.stampDuty,
    LeaseTime: allTenantSetting && allTenantSetting.leaseTimePeriod,
    shopAddress: "",
    isSubmitted: false,
  });

  const [inputdata, setinput] = useState([]);
  const [items, setitem] = useState([]);

  const {
    buildingName,
    shopDoorNo,
    hike,
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
      let new_door = items.map((ele) => ele.doorNo === inputdata);
      if (new_door.every((ele) => ele === false)) {
        setshowscroll("block");
        setitem([...items, { doorNo: inputdata, status: "Avaiable" }]);
        setinput("");
        SetRoomAlreadyExist({
          display: "none",
        });
      } else {
        SetRoomAlreadyExist({
          display: "inline",
          color: "#FF0000",
        });
      }
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

  const [errors, setErrors] = useState({
    LocChecker: false,
    LocErrorStyle: {},
  });
  const { LocChecker, LocErrorStyle } = errors;

  const checkError = () => {
    if (!LocChecker) {
      setErrors({
        ...errors,
        LocErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };
  const [locError, setLocError] = useState("black");

  const onSubmit = (e) => {
    e.preventDefault();

    if (checkError() && items.length !== 0) {
      const finalData = {
        OrganizationName: user.OrganizationName,
        OrganizationId: user.OrganizationId,
        buildingName: buildingName,
        shopDoorNo: items,
        hike: hike,
        stampDuty: stampDuty,
        leaseTimePeriod: LeaseTime,
        shopAddress: shopAddress,
        isSubmitted: false,
        Location: orgLoc.value,
        shopStatus: "Active",
      };
      AddShopDetailsform(finalData);
      setFormData({
        ...formData,
        buildingName: "",
        inputdata: "",
        hike: "",
        stampDuty: "",
        leaseTimePeriod: "",
        address: "",
        shopStatus: "",
        isSubmitted: true,
      });

      setShowadd(false);
    } else {
      setLocError("red");
    }
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      <Modal.Header className="confirmbox-heading">
        <div className=" row col-lg-12 col-md-12 col-sm-12 col-12 modhead">
          <div className="ml-5">
            <h3
              style={{
                fontFamily: "Sans-serif",
                color: "white",
              }}
              className="text-center h ml-4 "
            >
              ADD PROPERTY DETAILS
            </h3>
          </div>
        </div>
        <div className="col-lg-2">
          <button
            onClick={() => {
              setShowadd(false);
            }}
            className="close "
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
                <label style={LocErrorStyle}>Location*:</label>
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
                      primary25: "#e8a317",
                      primary: "#095a4a",
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
                <br></br>
              </div>
              <div className="col-lg-6">
                <label>
                  Hike<b>%</b>*:
                </label>
                <input
                  type="text"
                  placeholder={hike}
                  name="hike"
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

                <label className="ml-2" style={{ color: locError }}>
                  Door No*:
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
                  <div
                    className="showItemcl plusiconbck "
                    style={{ display: showscroll }}
                  >
                    {items.map((ele, index) => {
                      return (
                        <div className="eachItem" key={index}>
                          <span>{ele.doorNo}</span>
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
                <p className="RoomAlreadyExist" style={RoomAlreadyExist}>
                  RoomAlreadyExist
                </p>
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
  getAllSettings,
  getParticularOrg,
})(AddShopDetails);
