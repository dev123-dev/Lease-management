import React, { useEffect } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { useState } from "react";
import { get_particular_org_user } from "../../actions/tenants";
import { UpdateUser } from "../../actions/tenants";
import { Modal, Button, ModalBody } from "react-bootstrap";
import { loadUser } from "../../actions/auth";
const Profile = ({
  auth: { isAuthenticated, user, users },
  tenants: { allorg, get_particularOrg_user },
  UpdateUser,
  get_particular_org_user,
  getalluser,
  superuser,
  EditModal,
  loadUser,
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));
  const myorg = JSON.parse(localStorage.getItem("Org"));

  const [OrganizationData, setOrgnizationData] = useState({
    OrganizationName:
      get_particularOrg_user &&
      get_particularOrg_user[0] &&
      get_particularOrg_user[0].output.OrganizationName,
    OrganizationEmail:
      get_particularOrg_user &&
      get_particularOrg_user[0] &&
      get_particularOrg_user[0].output &&
      get_particularOrg_user[0].output.OrganizationEmail
        ? get_particularOrg_user[0].output.OrganizationEmail
        : myorg &&
          myorg[0] &&
          myorg[0].output &&
          myorg[0].output.OrganizationEmail,
    OrganizationNumber:
      get_particularOrg_user &&
      get_particularOrg_user[0] &&
      get_particularOrg_user[0].output &&
      get_particularOrg_user[0].output.OrganizationNumber
        ? get_particularOrg_user[0].output.OrganizationNumber
        : myorg &&
          myorg[0] &&
          myorg[0].output &&
          myorg[0].output.OrganizationNumber,
    OrganizationAddress:
      get_particularOrg_user &&
      get_particularOrg_user[0] &&
      get_particularOrg_user[0].output.OrganizationAddress,
  });
  useEffect(() => {
    get_particular_org_user({ OrganizationId: myuser.OrganizationId });
  }, []);

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
    { value: "Manager", label: "Manager" },
  ];

  const onchangeOrg = (e) => {
    setOrgname(e);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // adding multiple location start

  //multiple location end

  const [userData, setuserData] = useState({
    userid: myuser._id,

    username: user && user.username,
    useremail: user && user.useremail,
    usergroup: myuser && myuser.usergroup,
    useraddress: user && user.useraddress,
    userphone: user && user.userphone,
    OrganizationName: myuser.output.OrganizationName
      ? myuser.output.OrganizationName
      : "Pinnacle Media",
    OrganizationId: myuser.output.OrganizationId
      ? myuser.output.OrganizationId
      : "",
  });

  const {
    OrganizationEmail,
    OrganizationNumber,
    OrganizationAddress,
    Location,
  } = OrganizationData;

  let location = [];
  myuser &&
    myuser.output.Location.map((ele) => {
      location.push({
        label: ele,
        value: ele,
      });
    });
  const {
    // username,
    // useremail,
    usergroup,
    useraddress,
    // userphone,
    OrganizationName,
  } = userData;

  const [showUpdate, setShowUpdate] = useState(false);

  const onInputChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const [userGroup, setus] = useState(
    myuser
      ? UserGroups && UserGroups.filter((x) => x.value === myuser.usergroup)[0]
      : ""
  );

  const [refersh, setrefresh] = useState("");

  const onUpdateclose = (e) => {
    e.preventDefault();
    setShowUpdate(false);
    //windows.location.reload();
  };
  const [username, setUsername] = useState(myuser && myuser.username);
  const [validationNameMessage, setValidationNameMessage] = useState();
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^A-Za-z]/g, ""); // Remove non-alphabetic characters
    filteredValue === ""
      ? setValidationNameMessage("Please enter the Name")
      : setValidationNameMessage("");

    setUsername(filteredValue);
  };
  //phone validation//
  const [userphone, setUserphone] = useState(myuser && myuser.userphone);
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
  //Email //
  const [useremail, setUseremail] = useState(myuser && myuser.useremail);
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

  const onUpdate = (e) => {
    setShowUpdate(true);
    setrefresh("x");

    const updateUSER = {
      userid: myuser._id,
      username: username,
      userphone: userphone,
      useraddress: useraddress,
      useremail: useremail,
      usergroup: userGroup,
      OrganizationName: myuser.output.OrganizationName,
      OrganizationId: myuser.output._id,
    };
    // console.log("myuser", myuser);
    // console.log("done", updateUSER);
    UpdateUser(updateUSER);
    // getalluser();
    //  get_particular_org_user({ orgid: user.OrganizationId });
    handleClose(true);

    loadUser();
  };
  //Name feild validation//

  //disable update button
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
  return (
    <>
      <div>
        {user && user.usergroup === "Super Admin" ? (
          <div className="container container_align  ">
            <section className="sub_reg">
              <div className="row card-Profile col-lg-11 col-md-11 col-sm-12 col-12 py-3">
                <div className="col-lg-11 col-md-11 col-sm-12 col-12">
                  <h2 className="heading_color">Profile </h2>
                </div>
                <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
                  <div className="col-lg-4 col-md-12 col-sm-12 col-12">
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
                  <div className="col-lg-4 col-md-12 col-sm-12 col-12">
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
                  <div className="col-lg-4 col-md-12 col-sm-12 col-12">
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
                  <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                    <label>Organization belongs to *: </label>
                    <input
                      type="text"
                      name="orgname"
                      value={OrganizationName}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      readOnly
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                    <label>UserGroup*:</label>

                    <input
                      type="text"
                      name="usergrp"
                      value={usergroup}
                      className="form-control"
                      readOnly
                    />

                    <br></br>
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 col-12">
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
                  </div>{" "}
                </div>
                {/* <div
                className="col-lg-12 col-md-12 col-sm-12 col-12 Savebutton "
                size="lg"
              >
                <button
                  variant="success"
                  id="savebtn"
                  className="btn sub_form btn_continue blackbrd Save float-right"
                  onClick={() => onUpdate()}
                >
                  <b>Update</b>
                </button>
              </div> */}
              </div>
            </section>
            <div className="row card-Profile col-lg-11 col-md-11 col-sm-12 col-12 py-3">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                {" "}
                <h2 className="heading_color">Organization Profile </h2>
              </div>
              <div className="row col-lg-12 col-md-12 col-sm-12 col-12 py-3">
                <>
                  <div className=" row col-lg-12">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                      <label>Email*: </label>
                      <input
                        name="OrganizationEmail"
                        value={myuser.output.OrganizationEmail}
                        className="form-control"
                        readOnly
                      />
                      <br></br>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                      <label>Phone No:</label>

                      <input
                        name="OrganizationNumber"
                        value={myuser.output.OrganizationNumber}
                        className="form-control"
                        readOnly
                      />
                      <br></br>
                    </div>
                    <div className=" col-lg-6 col-md-12 col-sm-12 col-12 ">
                      <label>Organization Logo :</label>
                      <div className="form__img-input-container d-flex justify-content-center align-item-center">
                        <img src={myuser.output.Logo} alt="OrgLogo" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                      <label>Address:</label>

                      <input
                        name="OrganizationNumber"
                        value={myuser.output.OrganizationAddress}
                        className="form-control"
                        readOnly
                      />
                      <br></br>
                    </div>
                  </div>

                  {/* <div className="col-lg-4 col-md-12 col-sm-12 col-12">
               <label>Location:</label>
               {location.map((ele) => {
                 return <div className=" ml-3 form-control  ">{ele.label}</div>;
               })}

               <br></br>
             </div> */}

                  <div
                    className="col-lg-12 col-md-12 col-sm-12 col-12 Savebutton "
                    size="lg"
                  ></div>
                </>
              </div>
            </div>
          </div>
        ) : (
          <div className="container container_align  ">
            <section className="sub_reg">
              <div className="row card-Profile col-lg-11 col-md-11 col-sm-12 col-12 py-3">
                <div className="col-lg-11 col-md-11 col-sm-12 col-12">
                  <h2 className="heading_color"> Profile </h2>
                </div>
                <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
                  <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                    <label>Name*:</label>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      className="form-control"
                      onChange={handleInputChange}
                      required
                    />
                    <h6 style={{ color: "red" }}>{validationNameMessage}</h6>
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                    <label>Email*:</label>
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
                  <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                    <label>Phone No:</label>
                    <input
                      type="number"
                      name="userphone"
                      value={userphone}
                      className="form-control"
                      onChange={(e) => handleInputPhoneChange(e)}
                    />
                    <h6 style={{ color: "red" }}>{validationMessage}</h6>
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                    <label>Organization belongs to *: </label>

                    <input
                      type="text"
                      name="OrganizationName"
                      value={OrganizationName}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                    <label>UserGroup*:</label>

                    <input
                      type="text"
                      name="usergrp"
                      value={usergroup}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      readOnly
                    />

                    <br></br>
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 col-12">
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
                  </div>{" "}
                </div>
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-12 Savebutton "
                  size="lg"
                >
                  <button
                    variant="success"
                    id="savebtn"
                    className="btn sub_form btn_continue blackbrd Save float-right"
                    onClick={() => onUpdate()}
                    disabled={isButtonDisabled}
                  >
                    <b>Update</b>
                  </button>
                </div>
              </div>
              <div className="row card-Profile col-lg-11 col-md-11 col-sm-12 col-12 py-3">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  {" "}
                  <h2 className="heading_color">Organization Profile </h2>
                </div>
                <div className="row col-lg-12 col-md-12 col-sm-12 col-12 py-3">
                  <>
                    <div className=" row col-lg-8">
                      <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                        <label>Email*: </label>
                        <input
                          name="OrganizationEmail"
                          value={myuser.output.OrganizationEmail}
                          className="form-control"
                          readOnly
                        />
                        <br></br>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                        <label>Phone No:</label>

                        <input
                          name="OrganizationNumber"
                          value={myuser.output.OrganizationNumber}
                          className="form-control"
                          readOnly
                        />
                        <br></br>
                      </div>
                      <div className=" col-lg-6 col-md-12 col-sm-12 col-12 py-3">
                        <label>Organization Logo :</label>
                        <div className="form__img-input-container d-flex justify-content-center align-item-center ">
                          <img src={myuser.output.Logo} alt="OrgLogo" />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                      <label>Location:</label>
                      {location.map((ele) => {
                        return (
                          <div className=" ml-3 form-control  ">
                            {ele.label}
                          </div>
                        );
                      })}

                      <br></br>
                    </div>

                    <div
                      className="col-lg-12 col-md-12 col-sm-12 col-12 Savebutton "
                      size="lg"
                    ></div>
                  </>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
      <Modal
        show={showUpdate}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <form onSubmit={(e) => onUpdateclose(e)}>
          <Modal.Header className="confirmbox-heading">
            <div className="col-lg-10  col-sm-12 col-md-12">
              <div className="">
                <h4
                  style={{
                    color: "white",
                  }}
                  className="text-center"
                >
                  CONFIRMATION
                </h4>
              </div>
            </div>
            <div className="col-lg-2  col-sm-12 col-md-12">
              <button onClick={() => setShowUpdate(false)} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <ModalBody className="h4 text-center">
            Data Updated Successfully..!!
          </ModalBody>
          <Modal.Footer>
            <Button
              variant="primary"
              id="logoutbtn"
              type="submit"
              className=" text-center"
            >
              <b>OK</b>
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => ({
  tenants: state.tenants,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  get_particular_org_user,
  UpdateUser,
  loadUser,
})(Profile); // to connect to particular function which is getalluser
