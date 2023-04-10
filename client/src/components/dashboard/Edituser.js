import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "../../../../client/src/styles/CustomisedStyle.css";
import { UpdateUser,get_particular_org_user } from "../../actions/tenants";
import { getalluser } from "../../actions/tenants";

const Edituser = ({
  auth: { isAuthenticated, user, users },
  tenants: { allorg },
  superuser,
  UpdateUser,get_particular_org_user,
  getalluser,
  EditModal,
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));

  const orglist = [];
  allorg.map((org) => {
    orglist.push({
      label: org.OrganizationName,
      value: org._id,
    });
  });

  const [orgname, setOrgname] = useState(
    superuser
      ? orglist &&
          orglist.filter((x) => x.value === superuser.OrganizationId)[0]
      : ""
  );
  const UserGroups = [
    { value: "Admin", label: "Admin" },
    // { value: "Super Admin", label: "Super Admin" },
  ];

  const onchangeOrg = (e) => {
    setOrgname(e);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // adding multiple location start

  //multiple location end

  const [userData, setuserData] = useState({
    userid: superuser._id,
    username: superuser.username,
    useremail: superuser.useremail,
    usergroup: superuser.usergroup,
    useraddress: superuser.useraddress,
    userphone: superuser.userphone,
    OrganizationName: superuser.OrganizationName,
    OrganizationId: superuser.OrganizationId,
  });
  const { username, useremail, useraddress, userphone, OrganizationName } =
    userData;
  const onInputChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const [userGroup, setus] = useState(
    superuser
      ? UserGroups &&
          UserGroups.filter((x) => x.value === superuser.usergroup)[0]
      : ""
  );
  const onuser = (e) => {
    setus(e);
  };
  const [refersh, setrefresh] = useState("");

  const onUpdate = (e) => {
    e.preventDefault();
    setrefresh("x");
    EditModal(false);
    const updateUSER = {
      userid: superuser._id,
      username: username,
      userphone: userphone,
      useraddress: useraddress,
      useremail: useremail,
      usergroup: userGroup ? userGroup.value : "",
      OrganizationName: orgname ? orgname.label : "",
      OrganizationId: orgname ? orgname.value : "",
    };
    UpdateUser(updateUSER);
    getalluser();
  //  get_particular_org_user({ orgid: user.OrganizationId });
    handleClose(true);
  };

  useEffect(() => {
    getalluser();
  }, [refersh]);
  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <form onSubmit={(e) => onUpdate(e)}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
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
            <div className="col-lg-6">
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
            <div className="col-lg-6">
              <label>Phone No:</label>

              <input
                type="number"
                name="userphone"
                value={userphone}
                className="form-control"
                onChange={(e) => onInputChange(e)}
              />
              <br></br>
            </div>
            {superuser.usergroup === "Super Admin" ? (
              <>
                {/* <div className="col-lg-6">
                  <label> Address :</label>
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
                </div>{" "} */}
              </>
            ) : (
              <>
               
                <div className="col-lg-6">
                  <label>Organization belongs to *: </label>

                  <input
                    type="text"
                    name="userphone"
                    value={superuser.OrganizationName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                    readOnly
                  />

                  {/* <Select
                    name="orgname"
                    options={orglist}
                    value={orgname}
                    placeholder={OrganizationName}
                    onChange={(e) => onchangeOrg(e)}
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
                  >
                    select Organization
                  </Select> */}
                </div>
                 <div className="col-lg-6">
                  <label> Address :</label>
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
               
              </>
            )}
          
            <div className="col-lg-6">
              <label>UserGroup*:</label>

              <Select
                name="userGroup"
                value={userGroup}
                options={UserGroups}
                onChange={(e) => onuser(e)}
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
          </div>
          <div className="col-lg-9 text-danger">
            * Indicates mandatory fields, Please fill mandatory fields before
            Submit
          </div>
          <div className="col-lg-3 Savebutton float-right" size="lg">
            <input
              id="savebtn"
              type="submit"
              name="Save"
              value="Update"
              className="btn sub_form btn_continue Save float-right"
            />
          </div>
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
  getalluser,get_particular_org_user,
})(Edituser); // to connect to particular function which is getalluser
