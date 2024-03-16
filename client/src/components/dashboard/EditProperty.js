import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import "../../../../client/src/styles/CustomisedStyle.css";
import {
  updateProperty,
  getParticularOrg,
  getParticularProperty,
  AddUserActivity,
} from "../../actions/tenants";
import Select from "react-select";
const EditProperty = ({
  auth: { user },
  tenants: { particular_org_loc },
  Propertydata,
  setShowUpdateModal,
  AddUserActivity,
  updateProperty,
  getParticularProperty,
  getParticularOrg,
}) => {
  useEffect(() => {
    getParticularOrg({ OrganizationId: user && user.OrganizationId });
    // fun();
  }, []);
  const [RoomAlreadyExist, SetRoomAlreadyExist] = useState("black");

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const [Sellocation, SetselLoction] = useState([]);
  // const loc = [];
  let newLoc = particular_org_loc[0];
  const loc =
    newLoc &&
    newLoc.Location.map((ele) => {
      return {
        label: ele,
        value: ele,
      };
    });
  const [orgLoc, setLoc] = useState(
    Propertydata
      ? loc && loc.filter((x) => x.label === Propertydata.Location)[0]
      : ""
  );
  // const [orgLoc, setLoc] = useState(Propertydata.Location);
  // if (
  //   !orgLoc &&
  //   Propertydata &&
  //   Propertydata.Location &&
  //   Sellocation.length > 0
  // ) {
  //   setLoc(
  //     Propertydata
  //       ? Sellocation &&
  //           Sellocation.filter((x) => x.label === Propertydata.Location)[0]
  //       : ""
  //   );
  // }
  //adding multiple location start
  const [inputdata, setinput] = useState("");
  const [items, setitem] = useState([]);

  // const handleLocationclose = (ele1, index) => {
  //   const delitem = items.filter((ele, ind) => {
  //     return ele1 !== ele;
  //   });
  //   setitem(delitem);
  // };

  const [dno, setdno] = useState(Propertydata.shopDoorNo);
  const handleDoorNumclose = (ele1, index) => {
    const delitem = dno.filter((ele, ind) => {
      return ele1 !== ele;
    });
    setdno(delitem);
  };
  const addItem = () => {
    if (!inputdata) {
    } else {
      //setitem([...items, inputdata]);
      let new_door = dno.map((ele) => ele.doorNo === inputdata);
      if (new_door.every((ele) => ele === false)) {
        setdno([
          ...dno,
          {
            doorNo: inputdata,
            status: "Avaiable",
            BuildingName: Propertydata.BuildingName,
          },
        ]);
        setinput("");
        SetRoomAlreadyExist("black");
      } else {
        SetRoomAlreadyExist("red");
      }
      //setdno(delitem);
    }
  };
  const onchangeLoc = (e) => {
    setLoc(e);
  };

  //multiple location end
  const [formData, setFormData] = useState({
    shopDoorNo: [],
    Location: Propertydata.Location,

    hike: Propertydata.hike,
    stampDuty: Propertydata.stampDuty,
    LeaseTime: Propertydata.leaseTimePeriod,
    isSubmitted: false,
  });

  const {
    shopDoorNo,

    hike,
    stampDuty,
    LeaseTime,
    shopStatus,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // validation for building name

  const [BuildingName, setBuildingName] = useState(Propertydata.BuildingName);
  const [validationBuildingMessage, setValidationBuildingMessage] =
    useState("");

  const handleBuildingNameChange = (e) => {
    const inputValue = e.target.value;
    const isValidBuilding = /^(?!([\d\s-]*|\W*)$)[A-Za-z\d\s-]+$/;

    isValidBuilding.test(inputValue)
      ? setValidationBuildingMessage("")
      : setValidationBuildingMessage("Please enter valid Building Name");

    setBuildingName(inputValue);
  };
  // validation for address

  const [shopAddress, setShopAddress] = useState(Propertydata.shopAddress);
  const [validationAddressMessage, setValidationAddressMessage] = useState("");

  const handleAddressChange = (e) => {
    const inputValue = e.target.value;
    const isValidBuilding = /^(?!([\d\s-]*|[\W\\\/\,]*)$)[A-Za-z\d\s\\\/\,-]+$/;

    isValidBuilding.test(inputValue)
      ? setValidationAddressMessage("")
      : setValidationAddressMessage("Please enter valid Address");

    setShopAddress(inputValue);
  };

  const [isdisabled, setisdisabled] = useState(false);
  useEffect(() => {
    if (validationBuildingMessage === "" && validationAddressMessage === "") {
      setisdisabled(false);
    } else {
      setisdisabled(true);
    }
  }, [validationBuildingMessage, validationAddressMessage]);
  const onUpdate = (e) => {
    e.preventDefault();

    if (dno.length !== 0) {
      const update = {
        OrganizationName: user.OrganizationName,
        Orgainzation_id: user.OrganizationId,
        Property_id: Propertydata.PropertyId,
        BuildingName: BuildingName,
        shopDoorNo: dno,
        shopAddress: shopAddress,
        hike: hike,
        stampDuty: stampDuty,
        leaseTimePeriod: LeaseTime,
        Location: orgLoc,
        isSubmitted: true,
        shopStatus: "Active",
      };
      const EditUserActivity = {
        userId: user && user._id,
        userName: user && user.username,
        Menu: "Property",
        Operation: "Edit",
        Name: BuildingName,
        OrganizationId: user.OrganizationId,
        NameId: Propertydata.PropertyId,
        expireAt: new Date().getTime() + 80,
      };

      AddUserActivity(EditUserActivity);
      updateProperty(update);
      getParticularProperty({ OrganizationId: user.OrganizationId });
      handleEditModalClose();
      setShowUpdateModal(false);
    } else {
      alert();
    }
  };

  return (
    <Fragment>
      <form onSubmit={(e) => onUpdate(e)}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6  col-sm-12 col-md-12">
              <label>Building Name*:</label>

              <input
                type="text"
                name="BuildingName"
                value={BuildingName}
                className="form-control input"
                onChange={(e) => handleBuildingNameChange(e)}
                required
              />
              <h6 style={{ color: "red" }}>{validationBuildingMessage}</h6>
            </div>
            {/* <div className="col-lg-6  col-sm-12 col-md-12">
              <label>Stamp Duty*: </label>
              <input
                type="text"
                name="stampDuty"
                value={stampDuty}
                placeholder={stampDuty}
                className="form-control  input"
                readOnly
              />
              <br></br>
            </div> */}
            {/* <div className="col-lg-6  col-sm-12 col-md-12">
              <label>
                Hike<b>%</b>*:
              </label>
              <input
                type="text"
                name="hike"
                value={hike}
                className="form-control  input"
                readOnly
              />
              <br></br>
            </div> */}
            {/* <div className="col-lg-6  col-sm-12 col-md-12">
              <label>Lease Time Period*: </label>
              <input
                type="text"
                name="hikePercentage"
                value={LeaseTime}
                className="form-control  input"
                readOnly
              />
              <br></br>
            </div> */}
            <div className="col-lg-6  col-sm-12 col-md-12">
              <label>Location*:</label>
              <Select
                name="orgLoc"
                options={loc}
                // value={orgLoc.label}
                readOnly={true}
                onChange={(e) => onchangeLoc(e)}
                placeholder={orgLoc.value}
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
              />
              <br></br>
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
                onChange={(e) => handleAddressChange(e)}
                style={{ width: "100%" }}
                required
              ></textarea>
              <h6 style={{ color: "red" }}>{validationAddressMessage}</h6>
            </div>

            <div className="  col-lg-6  col-sm-12 col-md-12 ">
              <label className="ml-2" style={{ color: RoomAlreadyExist }}>
                Door No*:{" "}
              </label>
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
                <div className="showItemcl plusiconbck ">
                  {dno.map((ele, index1) => {
                    if (ele.status === "Avaiable") {
                      return (
                        <div className="eachItem" key={index1}>
                          <span>{ele.doorNo}</span>{" "}
                          <button
                            type="button"
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
              {/* <p className="RoomAlreadyExist" style={RoomAlreadyExist}>
                RoomAlreadyExist
              </p> */}
            </div>

            <div className="col-lg-9  col-sm-12 col-md-12 text-danger">
              * Indicates mandatory fields, Please fill mandatory fields before
              Submit
            </div>

            <div className="col-lg-3  col-sm-12 col-md-12">
              <button
                className="btn sub_form btn_continue Save float-right"
                id="savebtn"
                disabled={isdisabled}
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
  getParticularProperty,
  AddUserActivity,
})(EditProperty);
