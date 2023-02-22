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

  const clicking = () => {
    alert("Edit");
  };

  const [formData, setFormData] = useState({
    Organization_DE_Reason: "",
    isSubmitted: false,
  });

  const { Organization_DE_Reason } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [OrgId, setId] = useState("");

  const onDelete = (id) => {
    setId(id);
    handleShow();
  };

  const onedit = (id) => {
    setId(id);
    handleOpen();
  };

  const onAdd = () => {
    const reason = {
      Org_id: OrgId,
      org_status: "Deactive",
      deactive_reason: Organization_DE_Reason,
    };
    deleteOrganization(reason);
    console.log(OrgId);
  };
  const [formDataORG, setFormDataORG] = useState({
    OrganizationName: "",
    OrganizationEmail: "",
    OrganizationNumber: "",
    OrganizationAddress: "",
    Logo: "",
    Location: [],
  });
  const {
    OrganizationName,
    OrganizationEmail,
    OrganizationNumber,
    OrganizationAddress,
    Logo,
    Location,
  } = formDataORG;

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const handleOpen = () => setShowEditModal(true);
  const onAddStaffModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };

  return (
    <div>
      <div className="container container_align ">
        {/* OrganiZation Details  start*/}
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
              <h2 className="heading_color">OrganiZation Reports </h2>
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
                              <td>{orgVal.org_status}</td>
                              <td>
                                <img
                                  className="img_icon_size log"
                                  // onClick={() => onClickHandler()}
                                  // onClick={() => clicking()}
                                  // onClick={handleOpen}
                                  onClick={() => onedit(orgVal._id)}
                                  src={require("../../static/images/edit_icon.png")}
                                  alt="Edit"
                                  title="Edit User"
                                />
                                <img
                                  className="img_icon_size log"
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
      {/* modal for deactivating start */}

      {/* deactivating the Super User */}
      <Modal
        show={show}
        // onHide={handleClose}
        centered
      >
        <Modal.Title>Deactivate</Modal.Title>
        {/* <Modal.Header className="lg" ></Modal.Header> */}
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Reason For Deactivating</Form.Label>
              <Form.Control
                type="text"
                name="Organization_DE_Reason"
                onChange={(e) => onInputChange(e)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            // variant="primary"
            className="bg-dark"
            onClick={onAdd}
          >
            Save
          </Button>
          <Button variant="primary" onClick={handleClose} className="bg-dark">
            close
          </Button>
        </Modal.Footer>
      </Modal>
      {/*  End Deactivating the user  */}

      {/* Edit OrganiZation start */}
      <Modal
        show={showEditModal}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="logout-modal"
      >
        <Modal.Header>
          <div className=" row col-lg-10 col-md-12 col-sm-12 col-12 ">
            <h2 className="heading_color">Edit Organization Details </h2>
            <div className=" tenant_img col-lg-2">
              <button onClick={handleEditModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="org_add">
          {/* <div className="container container_align">
              <div className=" col-lg-12 col-md-9 col-sm-9 col-12 py-3"> */}
          <div className="col-lg-3 col-md-2 col-sm-4 col-12">
            <label> OrganizationName:</label>

            {/* <div className="col-lg-3 col-md-4 col-sm-4 col-12"> */}
            <input
              type="text"
              name="OrganizationName"
              value={OrganizationName}
              // onChange={(e) => onORGchange(e)}
              className="form-control"
              // onChange={(e) => onInputChange(e)}
            />
          </div>
          <br></br>
          {/* </div> */}
          <div className="col-lg-3 col-md-2 col-sm-4 col-12">
            <label>Email *:</label>
            {/* <div className="col-lg-3  col-md-4 col-sm-4 col-12"> */}
            <input
              type="email"
              name="OrganizationEmail"
              value={OrganizationEmail}
              // onChange={(e) => onORGchange(e)}
              className="form-control"
              //onChange={(e) => onInputChange(e)}
              required
            />{" "}
          </div>
          <br></br>
          {/* </div> */}
          <div className="col-lg-3 col-md-2 col-sm-4 col-12">
            <label>Phone No:</label>

            {/* <div className="col-lg-4 col-md-4 col-sm-4 col-12"> */}
            <input
              type="number"
              name="OrganizationNumber"
              value={OrganizationNumber}
              // onChange={(e) => onORGchange(e)}
              className="form-control"
              //onChange={(e) => onInputChange(e)}
            />
          </div>
          <br></br>
          {/* </div> */}
          <div className="col-lg-3 col-md-2 col-sm-4 col-12">
            <label>Number of User:</label>
            {/* <div className="col-lg-4 col-md-4 col-sm-4 col-12"> */}
            <input
              type="number"
              //  name="user"
              //value={}
              className="form-control"
              //onChange={(e) => onInputChange(e)}
            />{" "}
          </div>
          <br></br>
          {/* </div> */}
          {/* </div> */}

          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
            <div className="col-lg-3 col-md-2 col-sm-4 col-12">
              <label> Address *:</label>
              {/* <div className="col-lg-3 col-md-4 col-sm-6 col-12"> */}
              <textarea
                name="OrganizationAddress"
                value={OrganizationAddress}
                // onChange={(e) => onORGchange(e)}
                // id="tenantAddr"
                className="textarea form-control"
                rows="5"
                cols="20"
                placeholder="Address"
                // onChange={(e) => onInputChange(e)}
                style={{ width: "100%" }}
                required
              ></textarea>{" "}
            </div>
            <br></br>
            {/* </div> */}
            <div className="addItem  col-lg-3 col-md-2 col-sm-4 col-12">
              <label className="field_font">
                Location
                <i className="text-danger ">
                  <b>*</b>
                </i>{" "}
                :
              </label>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-12">
              <input
                className=""
                type="text"
                name="Location"
                value={Location}
                // onChange={(e) => setinput(e.target.value)}
                placeholder="Location"
                id="Location"
              ></input>

              {/* <div className="showItem ">
                  {items.map((ele, index) => {
                    return (
                      <div className="eachItem" key={index}>
                        <span>{ele}</span>{" "}
                        <button
                          onClick={() => handleLocationclose(index)}
                          className="loc_close_btn m-2"
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                </div> */}
            </div>
            {/*------------- Multiple Location adding details Ending------------ */}
          </div>
          {/* </div> */}
        </Modal.Body>
        <Modal.Footer>
          <div className="col-lg-12 Savebutton " size="lg">
            <button
              variant="success"
              className="btn sub_form btn_continue Save float-right"
              // onClick={() => onSubmitORGdata()}
            >
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* End of Edit Organization */}
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
