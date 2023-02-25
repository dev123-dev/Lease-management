import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useState, Fragment } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { Adduser } from "../../actions/tenants";

const AddUserModal = ({
  auth: { isAuthenticated, user, users, finalDataRep },
  tenants : {allorg},
  Adduser,
}) => {


  const orglist = [];

  allorg.map((org)=>{
    orglist.push({
      label : org.OrganizationName,
      value : org._id,
    })
  });

  
  const[orgname,setOrgname]=useState({})
  
const onchangeOrg=(e)=>{
  setOrgname(e)
  console.log(orgname)
}  
  
  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    useraddress: "",
    userphone: "",
    usergroup: "",
    OrganizationName : "",
    password: "",
  });
  const {  name, email,address,phone,group, OrganizationName, password } =
    formData;


    const[us,setus]=useState('')

  const onuser = (e) => {
    setus(e);
  }

 
 const UserGroups = [
    { value: "Admin", label: "Admin" },
    { value: "Super Admin", label: "Super Admin" },
  ];

  const onuserchange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onsubmitUserData = () => {
    const finalUserData = {
      username:  name,
      useremail: email,
      userphone: phone,
      useraddress: address,
      usergroup:us,
      password: password,
      OrganizationName : orgname,
    };
   
   
    handleClose();
    console.log("sending data from user")
    Adduser(finalUserData);
    console.log(finalUserData);
    setFormData({
      ...formData,
      name: "",
      phone: "",
      email: "",
      address: "",
      group: "",
      OrganizationName : "",
      password: "",
    });
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <div>
      <Fragment>
        <div className="col-lg-2 col-md-11 col-sm-11 col-11 py-4">
          <img
            className="img_icon_size log"
            onClick={handleShow}
            src={require("../../static/images/add-icon.png")}
            alt="Add User"
            title="Add User"
          />
        </div>
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
              <h2 className="heading_color h3 text-center">Add User </h2>
            </div>
            <div className=" close-btn-wrapper col-lg-2 close">
              <button className=" ml-5  close-btn" onClick={handleClose}>
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px", color: "black" }}
                />
              </button>
            </div>
          </Modal.Header>

          <Modal.Body>
            <div className="container container_align">
              <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
                <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                  <label>
                    {" "}
                    Name
                    <i className="text-danger ">
                      <b>*</b>
                    </i>
                    :
                  </label>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                  <input
                    type="text"
                    name="name"
                    value={name}
                    className="form-control"
                    onChange={(e) => onuserchange(e)}
                  />
                </div>

                <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                  <label>
                    Email{" "}
                    <i className="text-danger ">
                      <b>*</b>
                    </i>
                    :
                  </label>
                </div>
                <div className="col-lg-4  col-md-4 col-sm-4 col-12">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    className="form-control"
                    onChange={(e) => onuserchange(e)}
                  />
                  <br></br>
                </div>

                <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                  <label>Phone No:</label>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                  <input
                    type="number"
                    name="phone"
                    value={phone}
                    className="form-control"
                    onChange={(e) => onuserchange(e)}
                  />
                </div>

                <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                  <label>Address:</label>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                  <input
                    type="text"
                    name="address"
                    value={address}
                    className="form-control"
                    onChange={(e) => onuserchange(e)}
                  />
                  <br></br>
                </div>

                <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                  <label>
                    Password{" "}
                    <i className="text-danger ">
                      <b>*</b>
                    </i>
                    :
                  </label>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                  <input
                    type="text"
                    name="password"
                    value={password}
                    className="form-control"
                    onChange={(e) => onuserchange(e)}
                  />
                </div>

                {/* organization belongs to this need to be connected to database pending */}
                <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                  <label>
                    Organization belongs to{" "}
                    <i className="text-danger ">
                      <b>*</b>
                    </i>
                    :{" "}
                  </label>
                </div>

          
                <div className="col-lg-4  col-md-4 col-sm-4 col-12">
                  <Select 
                  name ="orgname"
                  options={orglist}
                  value = {orgname}
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
                  >select Organization</Select>
                </div>
              </div>
              <div className="col-lg-4  col-md-4 col-sm-4 col-12">
                  <Select
                    name="group"
                    options={UserGroups}
                    isSearchable={false}
                    placeholder="Select"
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
                    })}/>
            </div>
            </div>
            

          </Modal.Body>
          <Modal.Footer>
            {/* save button */}
            <div className="col-lg-1 Savebutton ">
              <button
                variant="success"
                className="btn sub_form btn_continue Save "
                onClick={() => onsubmitUserData()}
              >
                Save
              </button>
            </div>
          
          </Modal.Footer>
        </Modal>

   
      </Fragment>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});
export default connect(mapStateToProps, { Adduser })(AddUserModal);
