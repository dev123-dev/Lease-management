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
    console.log(orgname);
  };
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    useraddress: "",
    userphone: "",
    usergroup: "",
    OrganizationName: "",
    password: "",
  });

  const { name, email, address, phone, group, OrganizationName, password } =
    formData;

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
    if (e.target.name == "password" && e.target.value) {
      setpas(e.target.value);
    }
    if (e.target.name == "Cpassword" && e.target.value) {
      if (e.target.value != pas) {
        seterr(true);
      } else if (e.target.value == pas) {
        seterr(false);
      }
    }
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
      //alert("fill al,l fields");
      setfill(true);
    } else {
      console.log(name, email, address);
      handleClose();

      const finalUserData = {
        username: name,
        useremail: email,
        userphone: phone,
        useraddress: address,
        usergroup: us,
        password: password,
        OrganizationName: orgname,
      };

      // handleClose();
      Adduser(finalUserData);
      console.log(finalUserData);
      setFormData({
        ...formData,
        name: "",
        phone: "",
        email: "",
        address: "",
        group: "",
        OrganizationName: "",
        password: "",
      });
    }
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [supershow, setSuperShow] = useState(false);
  const superhandleClose = () => setSuperShow(false);
  const superhandleShow = () => setSuperShow(true);
  //should not remove below the console statement otherwise it will cause an error saying user.usergroup is undefined.
  console.log("this is admin", user);

  return isAuthenticated &&
    users &&
    user &&
    user.usergroup === "Super Admin" ? (
    //for super admin
    <Fragment>
      <div className="col-lg-2 col-md-11 col-sm-11 col-11 py-4">
        <img
          className=" orgaddicon"
          onClick={handleShow}
          src={require("../../static/images/add-icon.png")}
          alt="Add User"
          title="Add User"
        />
      </div>
      <form>
        <Modal
          show={show}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="logout-modal"
        >
          <Modal.Header>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
              <h2>
                <b className="heading_color h1 text-center">Add User</b>{" "}
              </h2>
            </div>
            <div className="  col-lg-2 ">
              <button className=" cluser" onClick={handleClose}>
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px", color: "black" }}
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
                    required
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
                    required
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
                  {err ? (
                    <span id="passerr" className="form-input-info">
                      Password dosent match
                    </span>
                  ) : (
                    <></>
                  )}
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
                    name="password"
                    placeholder="ConfirmPassword"
                    // value={password}
                    className="form-control"
                    onChange={(e) => onuserchange(e)}
                  />
                </div>
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
                    options={UserGroups}
                    isSearchable={false}
                    placeholder="---Select---"
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
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* save button */}
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
          </Modal.Footer>
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
