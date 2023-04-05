import React, { Fragment } from 'react'
import { connect } from "react-redux";
import Select from "react-select";
import { useState } from 'react';
const Profile = ({
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
    // userid: superuser._id,
    // username: superuser.username,
    // useremail: superuser.useremail,
    // usergroup: superuser.usergroup,
    // useraddress: superuser.useraddress,
    // userphone: superuser.userphone,
    // OrganizationName: superuser.OrganizationName,
    // OrganizationId: superuser.OrganizationId,
  });
  const { username, useremail, useraddress, userphone, OrganizationName } =
    userData;
  const onInputChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const [userGroup, setus] = useState(
    // superuser
    //   ? UserGroups &&
    //       UserGroups.filter((x) => x.value === superuser.usergroup)[0]
    //   : ""
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

  
  return (
    // <div>
<Fragment>
       <div className="container container_align  ">
      
        {/* <section  className="sub_reg"> */}
        <div className="row card-Profile col-lg-11 col-md-11 col-sm-12 col-12 py-3 mt-sm-5">
        <div className="col-lg-11 col-md-11 col-sm-12 col-12">
          <h2 className="heading_color"> User Profile </h2>
          
        </div>
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
              <label> Name*:</label>
              <input
                type="text"
                name="username"
                // value={username}
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
                // value={useremail}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
              <br></br>
            </div>
            <div  className="col-lg-4 col-md-12 col-sm-12 col-12">
              <label>Phone No:</label>

              <input
                type="number"
                name="userphone"
                // value={userphone}
                className="form-control"
                onChange={(e) => onInputChange(e)}
              />
              <br></br>
            </div>
          
               
                <div  className="col-lg-4 col-md-12 col-sm-12 col-12">
                  <label>Organization belongs to *: </label>
 
                  <input
                    type="text"
                    name="orgname"
                    // value={superuser.OrganizationName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                    readOnly
                  /> 

                  {/* <Select
                    name="orgname"
                    // options={orglist}
                    // value={orgname}
                    // placeholder={OrganizationName}
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
                
                 
            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
              <label>UserGroup*:</label>
              
              <input
                    type="text"
                    name="usergrp"
                    // value={superuser.OrganizationName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                    readOnly
                  /> 

              {/* <Select
                name="userGroup"
                // value={userGroup}
                // options={UserGroups}
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
              /> */}
              <br></br>
            </div>
            <div  className="col-lg-4 col-md-12 col-sm-12 col-12">
                  <label> Address :</label>
                  <textarea
                    name="useraddress"
                    // value={useraddress}
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
                // onClick={() => onUpdatepersonal()}
              >
                <b>Update</b>
              </button>
            </div>
         
          {/* <div className="col-lg-3 Savebutton float-right" size="lg">
            <input
              id="savebtn"
              type="submit"
              name="Save"
              value="Update"
              className="btn sub_form btn_continue Save float-right"
            />
          </div> */}
          </div>
          <div className="row card-Profile col-lg-11 col-md-11 col-sm-12 col-12 py-3">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              {" "}
              <h2 className="heading_color">Organization Profile </h2>
            </div>
            <div className="row col-lg-12 col-md-12 col-sm-12 col-12 py-3">
              <>
              <div  className="col-lg-4 col-md-12 col-sm-12 col-12">
              <label> Organization Name*:</label>

              <input
                type="text"
                name="OrganizationName"
                // value={OrganizationName}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
              <br></br>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
              <label>Email*: </label>
              <input
                type="email"
                name="OrganizationEmail"
                // value={OrganizationEmail}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
              <br></br>
            </div>
            <div  className="col-lg-4 col-md-12 col-sm-12 col-12">
              <label>Phone No:</label>

              <input
                type="number"
                name="OrganizationNumber"
                // value={OrganizationNumber}
                className="form-control"
                onChange={(e) => onInputChange(e)}
              />
              <br></br>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
              <label>Location:</label>

              <input
                type="number"
                name="OrganizationNumber"
                // value={OrganizationNumber}
                className="form-control"
                onChange={(e) => onInputChange(e)}
              />
              <br></br>
            </div>
            <div className=" col-lg-8 col-md-12 col-sm-12 col-12 py-3">
                    <label>Institution Logo :</label>
                    {/* <div className="form__img-input-container">
                      <img
                        src={`${
                          institutionData && institutionData.institutionProfile
                            ? institutionData.institutionProfile
                            : ""
                        }`}
                        alt=""
                      />
                    </div> */}
                  </div>
                  <div
              className="col-lg-12 col-md-12 col-sm-12 col-12 Savebutton "
              size="lg"
            >
              <button
                variant="success"
                id="savebtn"
                className="btn sub_form btn_continue blackbrd Save float-right"
                // onClick={() => onUpdatepersonal()}
              >
                <b>Update</b>
              </button>
            </div>

              </>
            </div>
          </div>


          {/* </section> */}
        </div>
        </Fragment>
    // </div>
  )
}
const mapStateToProps = (state) => ({
  tenants: state.tenants,
  auth: state.auth,
});
export default connect(mapStateToProps, {
 
})(Profile); // to connect to particular function which is getalluser

