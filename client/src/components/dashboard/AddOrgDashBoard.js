import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AddOrgModal from "./AddOrgModal";
import { Props } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { getAllOrganization } from "../../actions/tenants";
import { deleteOrganization } from "../../actions/tenants";
import "../../../../client/src/styles/CustomisedStyle.css";
import EditOrganization from "./EditOrganization";
// import "../../styles/CustomisedStyle.css";

const AddOrgDashBoard = ({
  //here to connect to action we need to import the function
  //then again we need to mention inside the const function
  tenants: { allorg },
  deleteOrganization,
  getAllOrganization,
}) => {
  useEffect(() => {
    getAllOrganization("");
  }, []);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);

  const onUpdateModalChange = (e) => {
    if (e) {
      handleUpdateModalClose();
    }
  };

  // adding multiple location start
  const [inputdata, setinput] = useState("");
  const [items, setitem] = useState([]);

  const handleLocationclose = (nameofLocation, indexx) => {
    console.log(nameofLocation.Location);
    const delitem = nameofLocation.Location.filter((ele) => {
      return indexx != ele;
    });
    // const delitem = items.filter((ele, ind) => {
    //   return ind != index;
    // });
    setitem(delitem);
    console.log(delitem);
    //nameofLocation.Location(items);
  };

  const addItem = () => {
    if (!inputdata) {
    } else {
      setitem([...items, inputdata]);
      setinput("");
    }
  };
  //multiple location end

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const handleOpen = () => setShowEditModal(true);
  const onAddStaffModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };
  const [OrgId, setId] = useState("");

  const onDelete = (id) => {
    setId(id);
    handleShow();
  };
  const [orgdata, setorgdata] = useState(null);

  const onedit = (user, id) => {
    setShowUpdateModal(true);
    setId(id);
    setorgdata(user);
    handleOpen();
  };

  const [formData, setFormData] = useState({
    Organization_DE_Reason: "",
    isSubmitted: false,
  });

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { Organization_DE_Reason } = formData;

  const onAdd = () => {
    const reason = {
      Org_id: OrgId,
      org_status: "Deactive",
      deactive_reason: Organization_DE_Reason,
    };
    deleteOrganization(reason);
    console.log(OrgId);
  };

  return (
    <div>
      <div className="container container_align ">
        {/* OrganiZation Details  start*/}
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
              <h2 className="heading_color">Organization Details </h2>
            </div>

            <AddOrgModal />
          </div>
          <div className="row">
            <div className="col-lg-11 col-md-11 col-sm-11 col-11 text-center ">
              <section className="body">
                <div className="body-inner no-padding  table-responsive fixTableHead">
                  <table
                    className="table table-bordered table-striped table-hover"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th>Org Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>

                        {/* <th>Number of Users</th> */}

                        <th>Location</th>
                        <th>StartDate</th>
                        <th>EndDate</th>
                        <th>Current Status</th>
                        <th>Operation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allorg &&
                        allorg[0] &&
                        allorg.map((orgVal, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{orgVal.OrganizationName}</td>
                              <td>{orgVal.OrganizationEmail}</td>
                              <td>{orgVal.OrganizationNumber}</td>
                              <td>{orgVal.OrganizationAddress}</td>

                              <td>{orgVal.Location + ","}</td>
                              <td>{orgVal.date}</td>
                              <td>{orgVal.enddate}</td>
                              <td>{orgVal.org_status}</td>

                              <td>
                                <img
                                  className=""
                                  // onClick={() => onClickHandler()}
                                  // onClick={() => clicking()}
                                  // onClick={handleOpen}
                                  onClick={() => onedit(orgVal, idx)}
                                  src={require("../../static/images/edit_icon.png")}
                                  alt="Edit"
                                  title="Edit User"
                                />
                                <img
                                  className=""
                                  // onClick={() => onClickHandler()}
                                  onClick={() => onDelete(orgVal._id)}
                                  src={require("../../static/images/delete.png")}
                                  alt="delete User"
                                  title="delete User"
                                />
                              </td>

                              {/* {orgVal.AgreementStatus === "Expired" ? (
                                <td>
                                  <center>
                                     <button
                                      variant="success"
                                      className="btn sub_form"
                                      // onClick={() =>
                                      //   onRenewal(orgVal, idx)
                                      // }
                                    >
                                      Renewal
                                    </button> 
                                  </center>
                                </td>
                              
                              ) : (
                                <td></td>
                              )} */}
                            </tr>
                          );
                        })}
                    </tbody>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <center></center>
                    </td>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </section>
        {/* OrganiZation Deatils End */}
      </div>
      {/* deactivating the Super User */}
      <Modal
        show={show}
        // onHide={handleClose}
        centered
      >
        <Modal.Title>
          <></>
          <div className="text-center h4">
            <b>Deactivate</b>
          </div>
        </Modal.Title>
        {/* <Modal.Header className="lg" ></Modal.Header> */}
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="h5">Reason For Deactivating</Form.Label>
              <textarea
                rows="2"
                name="Organization_DE_Reason"
                onChange={(e) => onInputChange(e)}
                autoFocus
                id="org_reason"
                className="form-control "
                required
              ></textarea>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            // variant="primary"
            id="savebtn"
            onClick={onAdd}
          >
            Save
          </Button>
          <Button variant="primary" onClick={handleClose} id="savebtn">
            close
          </Button>
        </Modal.Footer>
      </Modal>
      {/*  End Deactivating the user  */}

      {/* edit org old code starting */}
      <Modal
        show={showUpdateModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3>
              <b className="modal-title text-center h3">
                Edit Organization Details{" "}
              </b>
            </h3>
          </div>
          <div className="col-lg-2">
            <button onClick={handleUpdateModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <EditOrganization org={orgdata} />
        </Modal.Body>
      </Modal>

      {/* edit old code end */}
    </div>
  );
};
const mapStateToProps = (state) => ({
  tenants: state.tenants,
});
export default connect(mapStateToProps, {
  getAllOrganization,
  deleteOrganization,
})(AddOrgDashBoard);
