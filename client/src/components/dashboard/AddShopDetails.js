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
  const myuser = JSON.parse(localStorage.getItem("user"));

  const [RoomAlreadyExist, SetRoomAlreadyExist] = useState("black");

  // let passwrdTooltip = {
  //   marginLeft: "-16em",
  //   position: "absolute",
  //   marginTop: "1.5em",
  //   pointerEvents: "none",
  //   zIndex: "999",
  //   width: "300px",
  // };
  const [pageRefresh, SetRefresh] = useState(false);
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("user"));
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
    BuildingName: "",
    shopDoorNo: [],
    hike: myuser.output && myuser.output.hike,
    stampDuty: myuser.output && myuser.output.stampDuty,
    LeaseTime: myuser.output && myuser.output.leaseTimePeriod,
    shopAddress: "",
    isSubmitted: false,
  });

  const [inputdata, setinput] = useState([]);
  const [items, setitem] = useState([]);

  const {
    BuildingName,
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
        setitem([
          ...items,
          { doorNo: inputdata, status: "Avaiable", BuildingName: BuildingName },
        ]);
        setinput("");
        setLocError("black");
      } else {
        setLocError("red");
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
        BuildingName: BuildingName,
        shopDoorNo: items,
        hike: hike,
        stampDuty: stampDuty,
        leaseTimePeriod: LeaseTime,
        shopAddress: shopAddress,
        isSubmitted: false,
        Location: orgLoc.value,
        shopStatus: "Active",
      };
      // console.log(finalData)
      AddShopDetailsform(finalData);
      setFormData({
        ...formData,
        BuildingName: "",
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
            <h4
              style={{
                color: "white",
              }}
              className="text-center ml-4 "
            >
              ADD PROPERTY DETAILS
            </h4>
          </div>
        </div>
        <div className="col-lg-2  col-sm-12 col-md-12">
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
              <div className="col-lg-6  col-sm-12 col-md-12">
                <label>Building Name*:</label>
                <input
                  type="text"
                  placeholder="Building Name"
                  name="BuildingName"
                  value={BuildingName}
                  className="form-control input"
                  onChange={(e) => onPropertychange(e)}
                  required
                />
                <br></br>
              </div>
              <div className="col-lg-6  col-sm-12 col-md-12">
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
                {/* <div
                  className="cstm-hint"
                  id="pass_admin_help"
                  style={{ top: "60px" }}
                >
                  <img
                    src={require("../../static/images/help1.png")}
                    alt="help"
                    id="img_tool_admin"
                    className="pass_admin_help_icon_question"
                  />
                  <div
                    id="tooltipPassAdmin"
                    className="syle-hint"
                    style={passwrdTooltip}
                    data-hint="Password  at least 1 uppercase and 1 lowercase, 1 digit, 1 symbol, length from 8 to 20"
                  ></div>
                </div> */}

                <br></br>
              </div>
              {myuser.usergroup === "Admin" ? (
                <>
                  {" "}
                  <div className="col-lg-6  col-sm-12 col-md-12 ">
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
                  <div className="col-lg-6  col-sm-12 col-md-12">
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
                  <div className="col-lg-6  col-sm-12 col-md-12">
                    <label>Lease Time Period*:</label>
                    <div className="controls">
                      <input
                        placeholder={LeaseTime}
                        className="form-control"
                        readOnly
                      />
                      <span
                        id="category_result"
                        className="form-input-info"
                      ></span>{" "}
                      <br></br>
                    </div>
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
                </>
              ) : (
                <>
                  {" "}
                  <div className="col-lg-6  col-sm-12 col-md-12 d-none">
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
                  <div className="col-lg-6  col-sm-12 col-md-12 d-none">
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
                  <div className="col-lg-6   col-sm-12 col-md-12 d-none">
                    <label>Lease Time Period*:</label>
                    <div className="controls">
                      <input
                        placeholder={LeaseTime}
                        className="form-control"
                        readOnly
                      />
                      <span
                        id="category_result"
                        className="form-input-info"
                      ></span>{" "}
                      <br></br>
                    </div>
                  </div>
                  <div className="col-lg-6  col-sm-12 col-md-12">
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
                </>
              )}
              {/* <div className="col-lg-6">
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
              </div> */}

              <div className="col-lg-6  col-sm-12 col-md-12">
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
                {/* <p className="RoomAlreadyExist" style={RoomAlreadyExist}>
                  RoomAlreadyExist
                </p> */}
              </div>
              <div className="col-lg-9  col-sm-12 col-md-12 text-danger">
                * Indicates mandatory fields, Please fill mandatory fields
                before Submit
              </div>

              <div className="col-lg-3  col-sm-12 col-md-12">
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
