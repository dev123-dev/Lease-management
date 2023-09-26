import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "../../../../client/src/styles/CustomisedStyle.css";
import { UpdateUser, get_particular_org_user } from "../../actions/tenants";
import { getalluser } from "../../actions/tenants";

const EditAdminUser = ({
  auth: { isAuthenticated, user, users },
  tenants: { allorg },
  org,
  UpdateUser,
  setRefresh,
  refresh,
  setSuperModal,
  get_particular_org_user,
  getalluser,
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    get_particular_org_user({
      OrganizationId: myuser && myuser.OrganizationId,
    });
  }, []);
  const UserGroups = [
    { value: "Admin", label: "Admin" },
    { value: "IT Department", label: "IT Department" },
    { value: "Manager", label: "Manager" },
    // { value: "Clerk", label: "Clerk" },
  ];
  const [group, setgroup] = useState(
    org
      ? UserGroups && UserGroups.filter((x) => x.value === org.usergroup)[0]
      : ""
  );
  // console.log("group", group);
  const [orgname, setOrgname] = useState();

  const orglist = [];
  allorg.map((org) => {
    orglist.push({
      label: org.OrganizationName,
      value: org._id,
    });
  });

  const onchangeOrg = (e) => {
    setOrgname(e);
  };
  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    useraddress: "",
    userphone: "",
    usergroup: "",
    OrganizationName: "",
    password: "",
  });

  const [userid, setId] = useState("");

  const onedit = (id) => {
    setId(id);
  };

  // adding multiple location start
  const [inputdata, setinput] = useState("");
  const [items, setitem] = useState();

  const addItem = () => {
    if (!inputdata) {
    } else {
      setitem([...items, inputdata]);
      setinput("");
    }
  };
  //multiple location end

  const [userData, setuserData] = useState({
    usergroup: group,
    useraddress: org.useraddress,

    OrganizationName: org.OrganizationName,
  });
  const { usergroup, useraddress, OrganizationName } = userData;
  const onInputChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  //username validation start//////////////////////////////////////////////////
  const [username, setUsername] = useState(org.username);
  const [validationNameMessage, setValidationNameMessage] = useState();
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, ""); // Remove non-alphabetic characters
    filteredValue === ""
      ? setValidationNameMessage("Please enter the Name")
      : setValidationNameMessage("");

    setUsername(filteredValue);
  };

  ///////////////////////////////////////////////////////////////////////////////

  //validation for email start///////////////////////////////////////////////////
  const [useremail, setUseremail] = useState(org.useremail);
  const [validationEmailMessage, setValidationEmailMessage] = useState("");
  const handleInputEmailChange = (e) => {
    const inputValue = e.target.value;
    setUseremail(inputValue);

    // Regular expression to validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (emailRegex.test(inputValue)) {
      setValidationEmailMessage("");
    } else {
      setValidationEmailMessage("Please enter a valid email address.");
    }
  };

  ////////////////////////////////////////////////////////////////////////////////

  //user phone number validation/////////////////////////////////
  const [userphone, setUserphone] = useState(org.userphone);
  const [validationMessage, setValidationMessage] = useState();

  const handleInputPhoneChange = (e) => {
    const inputValue = e.target.value;
    const cleanedValue = inputValue.replace(/\D/g, ""); // Remove non-digit characters

    if (cleanedValue.length <= 10) {
      const isValidPhone = /^[6789]\d{9}$/;
      isValidPhone.test(cleanedValue)
        ? setValidationMessage("")
        : setValidationMessage("enter valid phone number");

      setUserphone(cleanedValue);
    }
  };
  ////////////////////////////////////////////////////////////////

  const onuserGroup = (e) => {
    setgroup(e);
    // setus(e);
  };
  // console.log("us", us);
  const onUpdate = (e) => {
    e.preventDefault();
    const updateUSER = {
      userid: org._id,
      username: username,
      userphone: userphone,
      useraddress: useraddress,
      useremail: useremail,
      usergroup: group.value,
      OrganizationName: org.OrganizationName,
      OrganizationId: org.OrganizationId,
    };
    // console.log(updateUSER);

    UpdateUser(updateUSER);
    getalluser();
    get_particular_org_user({ orgid: myuser.OrganizationId });

    setRefresh(!refresh);
    setSuperModal(false);
  };
  const onuserchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  useEffect(() => {
    // Check validation conditions and enable/disable the button
    const isValidName = username.trim() !== "";
    const isValidEmail =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(useremail);
    const isValidPhone = /^[6789]\d{9}$/;

    if (isValidName && isValidEmail && isValidPhone) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, useremail, userphone]);

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <form onSubmit={(e) => onUpdate(e)}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6  col-sm-12 col-md-12">
              <label> Name*:</label>
              <input
                type="text"
                name="username"
                value={username}
                className="form-control"
                onChange={(e) => handleInputChange(e)}
                required
              />

              <h6 style={{ color: "red" }}>{validationNameMessage}</h6>
            </div>
            <div className="col-lg-6  col-sm-12 col-md-12">
              <label> Email*: </label>
              <input
                type="email"
                name="useremail"
                value={useremail}
                className="form-control"
                onChange={handleInputEmailChange}
                required
              />

              <h6 style={{ color: "red" }}>{validationEmailMessage}</h6>
            </div>
            <div className="col-lg-6  col-sm-12 col-md-12">
              <label>Phone No:</label>

              <input
                type="number"
                name="userphone"
                pattern="\d{10}"
                title=" 10 Digits only"
                value={userphone}
                className="form-control"
                onChange={(e) => handleInputPhoneChange(e)}
              />

              <h6 style={{ color: "red" }}>{validationMessage}</h6>
            </div>
            <div className="col-lg-6  col-sm-12 col-md-12">
              <label>Organization belongs to*: </label>
              <input
                type="text"
                placeholder="{OrganizationName}"
                value={OrganizationName}
                className="form-control"
                onChange={(e) => onuserchange(e)}
              />
              <br></br>
            </div>
            <div className="col-lg-6  col-sm-12 col-md-12">
              <label>User Group*:</label>

              <Select
                name="group"
                options={UserGroups}
                value={group}
                isSearchable={false}
                onChange={(e) => onuserGroup(e)}
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
              />
              <br></br>
            </div>
            <div className="col-lg-6  col-sm-12 col-md-12">
              <label> Address:</label>
              <textarea
                name="useraddress"
                value={useraddress}
                className="textarea form-control"
                rows="3"
                cols="20"
                placeholder="Address"
                onChange={(e) => onInputChange(e)}
                style={{ width: "100%" }}
              ></textarea>
              <br></br>
            </div>
          </div>
        </div>

        {/* </div> */}
        <div className="col-lg-9  col-sm-12 col-md-12 text-danger">
          * Indicates mandatory fields, Please fill mandatory fields before
          Submit
        </div>
        <div
          className="col-lg-3  col-sm-12 col-md-12 Savebutton float-right "
          size="lg"
        >
          <button
            id="savebtn"
            variant="success"
            className="btn sub_form btn_continue Save float-right"
            disabled={isButtonDisabled}
          >
            Save
          </button>
        </div>
      </form>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  tenants: state.tenants,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  UpdateUser,
  getalluser,
  get_particular_org_user,
})(EditAdminUser);
