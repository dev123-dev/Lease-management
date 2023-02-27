import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AddShopDetails from "./AddShopDetails";
import { Modal, Button } from "react-bootstrap";
import { getAllShops } from "../../actions/tenants";
import { Form } from "react-bootstrap";
import { deactiveProperty } from "../../actions/tenants";
import EditProperty from "./EditProperty";
import { getParticularProperty } from "../../actions/tenants";


const PropertyDetail = ({
  auth: { user },
  tenants: { particular_org_data },
  getAllShops,
  getAllOrganization,
  deactiveProperty,
  getParticularProperty,
}) => {

  useEffect(() => {
   
    //getParticularProperty();
  }, []);
  const uniqueOrg = {
    OrganizationName: user.OrganizationName,
   // id: user.OrganizationId,
  };

   useEffect(() => {
     getParticularProperty(uniqueOrg);
   }, []);
  
  const [orgdetail, setorgdetail] = useState({
    OrganizationName: "",
    id: "",
  });
  const { OrganizationName, id } = orgdetail;

  const [formData, setFormData] = useState({
    deactive_reason: "",
    isSubmitted: false,
  });
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleUpdateModalOpen = () => setShowUpdateModal(!showUpdateModal);
  const [property, setProperty] = useState(null);
  const onEdit = (ele) => {
    setProperty(ele);
    console.log(ele);
    handleUpdateModalOpen();
  };
  const { deactive_reason } = formData;

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

  const onAdd = () => {
    const reason = {
      Org_id: OrgId,
      shopStatus: "Deactive",
      deactive_reason: deactive_reason,
    };
    deactiveProperty(reason);
    // console.log(OrgId);
  };

  return (
    <div>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
              <h2 className="heading_color">
                {user.OrganizationName} Property Details{" "}
              </h2>
            </div>
            <AddShopDetails />
            <table
              className="table table-bordered table-striped table-hover"
              id="datatable2"
            >
              <thead>
                <tr>
                  <th>Building Name</th>
                  <th>Door Number</th>
                  <th>Location</th>
                  <th>Hike %</th>
                  <th>Stamp Duty</th>
                  <th>Lease Time Period</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {particular_org_data &&
                  particular_org_data.map((Val, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{Val.buildingName}</td>
                        <td>{Val.shopDoorNo}</td>
                        <td>{Val.Location}</td>
                        <td>{Val.hikePercentage}</td>
                        <td>{Val.stampDuty}</td>
                        <td>{Val.leaseTimePeriod}</td>
                        <td>{Val.shopAddress}</td>
                        <td>{Val.shopStatus}</td>
                        <td>
                          <img
                            className="img_icon_size log"
                            onClick={() => onEdit(Val)}
                            src={require("../../static/images/edit_icon.png")}
                            alt="Edit"
                            title="Add User"
                          />
                          <img
                            className="img_icon_size log"
                            // onClick={() => onClickHandler()}
                            onClick={() => onDelete(Val._id)}
                            src={require("../../static/images/delete.png")}
                            alt="Add User"
                            title="Add User"
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      {/* modal for Deactivating the Property starting */}
      <Modal
        show={show}
        // onHide={handleClose}
        centered
      >
        <Modal.Title>Deactivate</Modal.Title>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Reason For Deactivating</Form.Label>
              <Form.Control
                type="text"
                name="Property_DE_Reason"
                onChange={(e) => onInputChange(e)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onAdd} className="bg-dark">
            Save
          </Button>
          <Button className="bg-dark" onClick={handleClose}>
            close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Ending */}
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
            <h3 className="modal-title text-center">Edit Property Details </h3>
          </div>
          <div className="col-lg-2">
            <button onClick={handleUpdateModalOpen} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <EditProperty Property={property} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

PropertyDetail.propTypes = {
  tenants: PropTypes.object.isRequired,
  getAllShops: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  tenants: state.tenants,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getAllShops,
  deactiveProperty,
  getParticularProperty,
})(PropertyDetail);
