import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useState, Fragment } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { Adduser } from "../../actions/tenants";

const AddSuperUserModel = ({
  auth: { isAuthenticated, user, users, finalDataRep },
  tenants: { allorg },
  Adduser,
}) => {
  const orglist = [];
  allorg.map((org) => {
    orglist.push({
      label: org.OrganizationName,
      value: org._id,
    });
  });

  const [orgname, setOrgname] = useState({});
  const onchangeOrg = (e) => {
    setOrgname(e);
  };

  // const [passwordType, setPasswordType] = useState("password");
  // const [passwordInput, setPasswordInput] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    useraddress: "",
    userphone: "",
    usergroup: "",
    OrganizationName: "",
    password: "",
    cpassword: "",
  });

  const {
    name,
    email,
    address,
    phone,
    group,
    OrganizationName,
    password,
    cpassword,
  } = formData;

  const [us, setus] = useState("");

  const onuser = (e) => {
    setus(e);
  };

  const UserGroups = [
    { value: "Admin", label: "Admin" },
    { value: "Super Admin", label: "Super Admin" },
  ];

  const [pas, setpas] = useState("");
  const [err, seterr] = useState("");

  const onuserchange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //fill all field state
  const [fill, setfill] = useState(false);
  const onsubmitUserData = () => {
    if (
      name === "" ||
      email === "" ||
      address === "" ||
      us === "" ||
      password === "" ||
      orgname === ""
    ) {
      setfill(true);
    } else {
      const finalUserData = {
        username: name,
        useremail: email,
        userphone: phone,
        useraddress: address,
        usergroup: us,
        password: password,
        OrganizationName: orgname,
      };

      setShowAdd(false);
      Adduser(finalUserData);
      setFormData({
        ...formData,
        name: "",
        phone: "",
        email: "",
        address: "",
        group: "",
        OrganizationName: "",
        password: "",
        password: "",
      });
    }
  };
  const [showAdd, setShowAdd] = useState(false);

  const [supershow, setSuperShow] = useState();
  const superhandleClose = () => setSuperShow(false);
  const superhandleShow = () => setSuperShow(true);
  //should not remove below the console statement otherwise it will cause an error saying user.usergroup is undefined.
  const con = () => {
    alert("hii");
  };
  return isAuthenticated &&
    users &&
    user &&
    user.usergroup === "Super Admin" ? (
    //for super admin
    <Fragment>
      <button>
        <img
          className="orgaddicon"
          src={require("../../static/images/add-icon.png")}
          onClick={() => superhandleShow()}
          alt="Add User"
          title="Add User"
        />
      </button>
      <form>
        <Modal
          show={supershow}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="logout-modal"
        >
          <Modal.Header>
            <Modal.Title className="container">
              <h1 className="text-center h2 orghea ">Add user</h1>
            </Modal.Title>
            <div className="  col-lg-2 ">
              <button className="close ml-5" onClick={() => superhandleClose()}>
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{
                    height: "20px",
                    width: "20px",
                    color: "black",
                    marginLeft: "4.5rem",
                  }}
                />
              </button>
            </div>
          </Modal.Header>

          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <label>
                    {" "}
                    Name
                    <i className="text-danger ">
                      <b>*</b>
                    </i>
                    :
                  </label>{" "}
                  <input
                    type="text"
                    name="name"
                    value={name}
                    className="form-control"
                    placeholder="Name"
                    onChange={(e) => onuserchange(e)}
                  />
                </div>
                <div className="col-lg-6">
                  <label>
                    Email{" "}
                    <i className="text-danger ">
                      <b>*</b>
                    </i>
                    :
                  </label>{" "}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    className="form-control"
                    onChange={(e) => onuserchange(e)}
                  />
                </div>
                <div className="col-lg-6">
                  PhoneNo
                  <input
                    type="number"
                    name="phone"
                    placeholder="PhoneNo"
                    value={phone}
                    className="form-control"
                    onChange={(e) => onuserchange(e)}
                  />
                </div>
                <div className="col-lg-6">
                  {" "}
                  <label>
                    Organization belongs to{" "}
                    <i className="text-danger ">
                      <b>*</b>
                    </i>
                    :{" "}
                  </label>{" "}
                  <Select
                    name="orgname"
                    className=""
                    placeholder="---Select---"
                    isSearchable={false}
                    options={orglist}
                    value={orgname}
                    onChange={(e) => onchangeOrg(e)}
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
                </div>
                <div className="col-lg-6">
                  <label className="control-label">
                    Password <span>*</span>
                  </label>
                  <div className="controls">
                    <input
                      name="UserPassword"
                      id="user_password"
                      type="password"
                      autoComplete="off"
                      className="form-control"
                      a
                      onChange={(e) => onuserchange(e)}
                      required
                    />
                    {err ? (
                      <span id="Passerr" className="form-input-info">
                        password doesnt match
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                <div className="col-lg-6">
                  <label className="control-label">
                    Confirm Password <span>*</span>
                  </label>
                  <div className="controls">
                    <input
                      name="UserConfpassword"
                      id="user_confpass"
                      type="password"
                      autoComplete="off"
                      className="form-control"
                      onChange={(e) => onuserchange(e)}
                      required
                    />
                    <span
                      id="category_result"
                      className="form-input-info"
                    ></span>
                  </div>
                </div>

                {/* <div className="col-lg-6">
                  {" "}
                  <label>
                    Password{" "}
                    <i className="text-danger ">
                      <b>*</b>
                    </i>
                    :
                  </label>
                  <input
                    type="password"
                    name="password"
                    autoComplete="off"
                    value={password}
                    placeholder="Password"
                    className="form-control"
                    onChange={(e) => onuserchange(e)}
                  />
                </div>
                <div className="col-lg-6">
                  {" "}
                  <label>
                    ConfirmPassword{" "}
                    <i className="text-danger ">
                      <b>*</b>
                    </i>
                    :
                  </label>
                  <input
                    type="password"
                    name="cnfrmpassword"
                    placeholder="ConfirmPassword"
                    value={cpassword}
                    className="form-control"
                    onChange={(e) => onuserchange(e)}
                  />
                </div> */}
                <div className="col-lg-6">
                  Address
                  <textarea
                    name="OrganizationAddress"
                    value={address}
                    onChange={(e) => onuserchange(e)}
                    // id="tenantAddr"
                    className="textarea form-control"
                    rows="4"
                    cols="20"
                    placeholder="Address"
                    // onChange={(e) => onInputChange(e)}
                    style={{ width: "100%" }}
                    required
                  ></textarea>{" "}
                </div>
                <div className="col-lg-6">
                  <label>
                    UserGroup{" "}
                    <i className="text-danger ">
                      <b>*</b>
                    </i>
                    :{" "}
                  </label>
                  <Select
                    name="usergroup"
                    className=""
                    options={UserGroups}
                    isSearchable={false}
                    placeholder="------------------Select--------------------"
                    onChange={(e) => onuser(e)}
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
                  />
                </div>

                <h5 className="Uservalidation">
                  {fill ? <>Please fill all Mandatory(*) fields..!!</> : <> </>}
                </h5>
                <div className="col-lg-1 Savebutton ">
                  <button
                    type="submit"
                    variant="success"
                    id="savebtn"
                    className="btn sub_form btn_continue Save "
                    onClick={() => onsubmitUserData()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </form>
    </Fragment>
  ) : (
    //for admin side

    <></>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});
export default connect(mapStateToProps, { Adduser })(AddSuperUserModel);
