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
    //  userid : org[0]._id,
    username: org.username,
    useremail: org.useremail,
    usergroup: group,
    useraddress: org.useraddress,
    userphone: org.userphone,
    OrganizationName: org.OrganizationName,
  });
  const {
    username,
    useremail,
    usergroup,
    useraddress,
    userphone,
    OrganizationName,
  } = userData;
  const onInputChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  // const [us, setus] = useState("");

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
    // console.log("updateUSER", updateUSER);
    UpdateUser(updateUSER);
    // getalluser();
    //get_particular_org_user({ orgid: myuser.OrganizationId });

    setRefresh(!refresh);
    setSuperModal(false);
  };
  const onuserchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
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
                onChange={(e) => onInputChange(e)}
                required
              />
              <br></br>
            </div>
            <div className="col-lg-6  col-sm-12 col-md-12">
              <label> Email*: </label>
              <input
                type="email"
                name="useremail"
                value={useremail}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
              <br></br>
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
                onChange={(e) => onInputChange(e)}
              />
              <br></br>
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
        <div className="col-lg-3  col-sm-12 col-md-12 Savebutton float-right " size="lg">
          <button
            id="savebtn"
            variant="success"
            className="btn sub_form btn_continue Save float-right"
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