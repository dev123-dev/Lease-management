import React, { useEffect, useState, Fragment, useRef } from "react";
import AddAdminUserModal from "./AddAdminUserModal";
import { Modal, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";
import "../../../src/styles/CustomisedStyle.css";
import Pagination from "../layout/Pagination";
import {
  getParticularUser,
  getAllSettings,
  // getalluser,
  deactivateUser,
  AddUserActivity,
  get_particular_org_user,
} from "../../actions/tenants";
import EditAdminUser from "./EditAdminUser";
import { useReactToPrint } from "react-to-print";
import Edit from "../../static/images/Edit.svg";
import Deactivate from "../../static/images/Deactivate.svg";
import Add from "../../static/images/Add.svg";
import Print from "../../static/images/Print.svg";
import Excel from "../../static/images/Microsoft Excel.svg";
import Refresh from "../../static/images/Refresh.svg";
const UserDetails = ({
  auth: { user },
  tenants: { get_particularOrg_user }, //this is a reudcer
  get_particular_org_user,
  AddUserActivity,
  deactivateUser, //this is a action function to call
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));

  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    get_particular_org_user({ OrganizationId: myuser.OrganizationId });
  }, []);

  const [formData, setFormData] = useState({
    deactive_reason: "",
    isSubmitted: false,
  });

  const [deactive_reason, setDeactive_reason] = useState("");
  const [validationMessage, setValidationMessage] = useState(
    "Please enter valid Reason"
  );
  const onInputChange = (e) => {
    const inputValue = e.target.value;
    const isValid =
      /^(?![!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|0-9]+$)(?![!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|]+$).*/;
    // const isValid =/^(?![A-Za-z]+$)(?![\W\d\s]+$)[A-Za-z\d\s]+$/;

    isValid.test(inputValue)
      ? setValidationMessage("")
      : setValidationMessage("Please enter valid Reason");

    setDeactive_reason(inputValue);
  };

  const [isButtonDisabled, setisButtonDisabled] = useState(false);
  useEffect(() => {
    if (validationMessage === "") {
      setisButtonDisabled(false);
    } else {
      setisButtonDisabled(true);
    }
  });
  // validation
  const [username, setUsername] = useState(myuser && myuser.username);
  const [validationNameMessage, setValidationNameMessage] = useState();
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^A-Za-z0-9]/g, ""); // Remove non-alphabetic characters
    filteredValue === ""
      ? setValidationNameMessage("Please enter valid Name")
      : setValidationNameMessage("");

    setUsername(filteredValue);
  };

  const [showSuperModal, setSuperModal] = useState("");
  const SuperUpdateModalClose = () => setSuperModal(false);

  const [Deactiveshow, setDeactiveShow] = useState(false);

  const [Admindata, setAdmin] = useState("");

  const [AdminId, Setid] = useState("");

  const onEdit = (alluser, id) => {
    Setid(id);
    setAdmin(alluser);
    setSuperModal(true);
  };
  const [uname, setuname] = useState("");
  const onDelete = (id, alluser) => {
    Setid(id);
    setuname(alluser.username);
    setDeactiveShow(true);
  };

  const onDeactivate = (e) => {
    e.preventDefault();
    setDeactiveShow(false);
    const reason = {
      userId: AdminId,
      orgId: myuser && myuser.OrganizationId,
      userStatus: "Deactive",
      deactive_reason: deactive_reason,
    };
    const AdduserActivity = {
      userId: user && user._id,
      userName: user && user.username,
      Menu: "User",
      Operation: "Deactive",
      Name: uname,
      NameId: AdminId,
      OrganizationId: user.OrganizationId,
      expireAt: new Date().getTime() + 80,
    };

    AddUserActivity(AdduserActivity);

    deactivateUser(reason);
    get_particular_org_user({ OrganizationId: myuser.OrganizationId });
  };

  const [showadd, setShowadd] = useState(false);




  let cntDeActiveUser = 0;
  get_particularOrg_user &&
  get_particularOrg_user.map((ele) => {
      if (ele.userStatus !== "Active") cntDeActiveUser++;
  
    });


  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(7);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDatas =
    get_particularOrg_user &&
    get_particularOrg_user.slice(indexOfFirstData, indexOfLastData);

  const paginate = (nmbr) => {
    setCurrentData(nmbr);
  };

  const csvUserData = [
    ["Name", "Email", "Phone", "Group", "Organization", "Address"],
  ];
  get_particularOrg_user &&
    get_particularOrg_user.map((get_particularOrg_user) => {
      return csvUserData.push([
        get_particularOrg_user.username,
        get_particularOrg_user.useremail,
        get_particularOrg_user.userphone,
        get_particularOrg_user.usergroup,

        get_particularOrg_user.OrganizationName,

        get_particularOrg_user.useraddress,
      ]);
    });
  const [showPrint, setShowPrint] = useState({
    backgroundColor: "#095a4a",
    color: "white",
    fontWeight: "bold",
  });
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Contact Report",
    //onAfterPrint: () => alert("print success"),
    onAfterPrint: () =>
      setShowPrint({
        backgroundColor: "#095a4a",
        color: "white",
        fontWeight: "bold",
      }),
  });

  // console.log(get_particularOrg_user, "get_particularOrg_user");
  return (
    <>
      <div className="col mt-sm-4 space ">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
          <div className="row mt-5 ">
            <div className="col-lg-10  col-sm-12 col-md-12 mt-3">
              <h2 className="heading_color  headsize  ml-4">User Details </h2>
            </div>
         {myuser.usergroup === "Admin" ? (
            <div className="col-lg-2  col-sm-12 col-md-12 text-end  pt-2 iconspace ">
              {" "}
              <button style={{ border: "none" }}>
                <img
                  onClick={() => setShowadd(true)}
                  src={Add}
                  alt="Add User"
                  // style={{ cursor: "pointer" }}
                  title="Add User"
                  className="iconSize"
                />
              </button>
     
                <>
                  <CSVLink data={csvUserData} filename={"User-Details.csv"}>
                    <img src={Excel} alt="Excel-Export" title="Excel-Export" className="iconSize"/>
                  </CSVLink>
                  <button
                    style={{ border: "none" }}
                    onClick={async () => {
                      await setShowPrint({
                        backgroundColor: "#095a4a",
                        color: "black",
                        fontWeight: "bold",
                      });

                      handlePrint();
                    }}
                  >
                    <img
                      //  onClick={() => refresh()}
                      src={Print}
                      alt="Print"
                      title="Print"
                      className="iconSize"
                    />
                  </button>
                     <img
                  style={{ cursor: "pointer" }}
                  onClick={() => refresh()}
                  src={Refresh}
                  className="iconSize"
                  alt="refresh"
                  title="Refresh"
                />
                </>
             
            </div>
              ) : (
               <div className="col-lg-2  col-sm-12 col-md-12 text-end  pt-2 iconspace ">
              {" "}
           
     
                <>
                  <CSVLink data={csvUserData} filename={"User-Details.csv"}>
                    <img src={Excel} alt="Excel-Export" title="Excel-Export" className="iconSize"/>
                  </CSVLink>
                  <button
                    style={{ border: "none" }}
                    onClick={async () => {
                      await setShowPrint({
                        backgroundColor: "#095a4a",
                        color: "black",
                        fontWeight: "bold",
                      });

                      handlePrint();
                    }}
                  >
                    <img
                      //  onClick={() => refresh()}
                      src={Print}
                      alt="Print"
                      title="Print"
                      className="iconSize"
                    />
                  </button>
                   <img
                  style={{ cursor: "pointer" }}
                  onClick={() => refresh()}
                  src={Refresh}
                  className="iconSize"
                  alt="refresh"
                  title="Refresh"
                />
                </>
             
            </div>
              )}
          </div>

          <div className="container-fluid d-flex align-items-center justify-content-center ">
            <div className="col">
              <div ref={componentRef}>
                <div className="row ">
                  <div className="col-lg-1  col-sm-12 col-md-12"></div>
                  <div className="firstrowsticky body-inner no-padding table-responsive">
                    <table
                      className="table table-bordered table-striped table-hover   mt-1"
                      id="datatable2"
                    >
                      <thead>
                        <tr>
                          <th style={showPrint}>Name</th>
                          <th style={showPrint}>Email</th>
                          <th style={showPrint}>Phone</th>
                          <th style={showPrint}>Group</th>
                          <th style={showPrint}>Organization</th>
                          <th style={showPrint}>Address</th>
                              {myuser.usergroup === "Admin" ? (
                          <th style={showPrint}>Operation</th>):(<></>)}
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {currentDatas &&
                          currentDatas[0] &&
                          currentDatas.map((alluser, idx) => {
                            return (
                              <tr key={idx}>
                                  {alluser.userStatus === "Deactive" ? (
                                    <td style={{ backgroundColor: "#dda6a6" }}>
                                      {alluser.username}
                                    </td>
                                  ) : (
                                    <td>{alluser.username}</td>
                                  )}
                                {/* <td>{alluser.username}</td> */}
                                <td>{alluser.useremail}</td>
                                <td>{alluser.userphone}</td>
                                <td>{alluser.usergroup}</td>
                                <td>{alluser.OrganizationName}</td>
                                <td>{alluser.useraddress}</td>
 
                                { alluser.userStatus === "Deactive" ? (
                                  <td className="blank text-center">
                                    Deactive
                                  </td>
                                ) : 
                                   myuser.usergroup === "Admin" ?(<> <td className="text-center">
                                    <img
                                      className="iconSize"
                                      onClick={() => onEdit(alluser, idx)}
                                      src={Edit}
                                      alt="Edit"
                                      title="Edit User"
                                    />
                                    &nbsp;
                                    <img
                                      className="iconSize"
                                      onClick={() =>
                                        onDelete(alluser._id, alluser)
                                      }
                                      src={Deactivate}
                                      alt="Deactivate"
                                      title="Deactivate User"
                                    />
                                  </td></>):(<></>)
                                 
                               }

                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-lg-1  col-sm-12 col-md-12"></div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6  col-sm-12 col-md-12 ">
                  {get_particularOrg_user &&
                  get_particularOrg_user.length !== 0 ? (
                    <Pagination
                      dataPerPage={dataPerPage}
                      totalData={get_particularOrg_user.length}
                      paginate={paginate}
                      currentPage={currentData}
                    />
                  ) : (
                    <Fragment />
                  )}
                </div>
               
                   <div className="col-lg-6  col-sm-12 col-md-12">
                    <p
                      className="text-end h6 font-weight-bold"
                      style={{ color: "#095a4a" }}
                    >
                      Active Users:{" "}
                      {get_particularOrg_user && get_particularOrg_user.length - cntDeActiveUser}{" "}
                      &nbsp;&nbsp;&nbsp;
                      <span style={{ color: "red" }}>
                        Deactive Users: {cntDeActiveUser}
                      </span>
                    </p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* add model start */}
      <Modal
        show={showadd}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <AddAdminUserModal setShowadd={setShowadd} />
      </Modal>
      {/* add model end */}

      {/* Modal for Editing the Super user */}
      <Modal
        show={showSuperModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="confirmbox-heading">
          <div className="col-lg-10  col-sm-12 col-md-12">
            <div className="ml-4">
              <h4
                style={{
                  color: "white",
                }}
                className=" text-center   ml-4 "
              >
                EDIT USER DETAILS{" "}
              </h4>
            </div>
          </div>
          <div className="col-lg-2  col-sm-12 col-md-12">
            <button onClick={SuperUpdateModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <EditAdminUser
            org={Admindata}
            setSuperModal={setSuperModal}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        </Modal.Body>
      </Modal>
      {/* Modal Edit Ending */}

      {/* this id for Deactivating the Super user starting */}
      <Modal show={Deactiveshow} centered>
        <form onSubmit={onDeactivate}>
          <Modal.Header className="confirmbox-heading">
            <div className="col-lg-10  col-sm-12 col-md-12">
              <div className="ml-4">
                <h4
                  style={{
                    color: "white",
                  }}
                  className=" text-center ml-4"
                >
                  DEACTIVATE
                </h4>
              </div>
            </div>
            <div className="col-lg-2  col-sm-12 col-md-12">
              <button
                type="button"
                onClick={() => setDeactiveShow(false)}
                className="close"
              >
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>

          <Modal.Body>
            {/* <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> */}
            <div className="h5 despace">Reason For Deactivating * </div>
            <textarea
              rows="2"
              name="deactive_reason"
              onChange={(e) => onInputChange(e)}
              style={{ width: "100%" }}
              id="org_reason"
              className="form-control "
              required
            ></textarea>
            <h6 style={{ color: "red" }}>{validationMessage}</h6>
            <div>Are you sure You Want To Deactivate..?</div>
            {/* </Form.Group>
          </Form> */}
          </Modal.Body>
          <Modal.Footer>
            <Button id="deactivebtn" type="submit" disabled={isButtonDisabled}>
              <b>Deactive</b>
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      {/*  deactivate Modal Ending */}
    </>
  );
};

const mapStateToProps = (state) => ({
  tenants: state.tenants,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  // getalluser,
  getAllSettings,
  deactivateUser,
  getParticularUser,
  get_particular_org_user,
  AddUserActivity,
})(UserDetails); // to connect to particular function which is getalluser
