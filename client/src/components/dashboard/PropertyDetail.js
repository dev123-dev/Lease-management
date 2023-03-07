import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AddShopDetails from "./AddShopDetails";
import { Modal, Button } from "react-bootstrap";
import { getAllShops } from "../../actions/tenants";
import { Form } from "react-bootstrap";
import { deactiveProperty } from "../../actions/tenants";
import EditProperty from "../dashboard/EditProperty";
import { getParticularProperty, getParticularOrg } from "../../actions/tenants";
import Select from "react-select";

const PropertyDetail = ({
  auth: { user },
  tenants: { particular_org_data, particular_org_loc },
  deactiveProperty,
  getParticularOrg,
  getParticularProperty,
}) => {
  useEffect(() => {
    fun();
    const OrganizationId = {
      OrganizationId: user && user.OrganizationId,
    };
    getParticularOrg(OrganizationId);
  }, []);

  const [formData, setFormData] = useState({
    deactive_reason: "",
    isSubmitted: false,
  });
  const [LOCATION, SetLocation] = useState(null);
  const [Sellocation, SetselLoction] = useState([]);
  const Loc = [];

  const { _id, Location } = particular_org_loc[0];
  const fun = () => {
    particular_org_loc[0] &&
      Location.map((ele) => {
        Loc.push({
          label: ele,
          value: ele,
        });
        SetselLoction(Loc);
        console.log(Sellocation);
      });
  };
  const name = user && user.OrganizationName;
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleUpdateModalOpen = () => setShowUpdateModal(!showUpdateModal);
  const [property, setProperty] = useState(null);

  const onEdit = (ele) => {
    setProperty(ele);
    handleUpdateModalOpen();
  };

  const { deactive_reason } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [PropertyId, setId] = useState("");

  const onDelete = (id) => {
    setId(id);
    handleShow();
  };
  const onchangeLocation = (e) => {
    SetLocation(e);
    const OrgainationId_Loc_name = {
      OrganizationId: user && user.OrganizationId,
      LocationName: e.value,
    };
    getParticularProperty(OrgainationId_Loc_name);
  };

  const onDeactive = () => {
    setShow(false);
    const reason = {
      PropertyId: PropertyId,
      OrganizationId: user && user.OrganizationId,
      shopStatus: "Deactive",
      deactive_reason: deactive_reason,
    };
    deactiveProperty(reason);
  };
  return (
    <div>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
              <h2 className="heading_color ">{name} Property Details</h2>
              <hr></hr>
            </div>
            <div className="w-25">
              <Select
                placeholder="Search-Location"
                name="location"
                options={Sellocation}
                value={LOCATION}
                onChange={(e) => onchangeLocation(e)}
              ></Select>
            </div>
            <AddShopDetails />
            <table
              className="table table-bordered table-striped table-hover mt-3"
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
                        <td>
                          {Val.shopStatus === "Acquired" ? (
                            <td className="text-center">
                              <img
                                className=" log"
                                onClick={() => onEdit(Val)}
                                src={require("../../static/images/edit_icon.png")}
                                alt="Edit Property"
                                title="Edit Property"
                              />
                              &nbsp;
                              <img
                                className=" log"
                                onClick={() => onDelete(Val._id)}
                                src={require("../../static/images/delete.png")}
                                alt="Delete Property "
                                title="Delete Property"
                              />
                            </td>
                          ) : (
                            <div className="blank"></div>
                          )}
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
        <Modal.Title className="text-center h4">
          <b className="ml-2">Deactivate</b>
          <Button id="Deactiveclose" onClick={() => setShow(false)}>
            <img
              src={require("../../static/images/close.png")}
              alt="X"
              style={{ height: "20px", width: "20px" }}
            />
          </Button>
        </Modal.Title>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Reason For Deactivating</Form.Label>
              <textarea
                rows="2"
                name="deactive_reason"
                value={deactive_reason}
                onChange={(e) => onInputChange(e)}
                autoFocus
                id="org_reason"
                className="form-control "
                required
              ></textarea>
              <Form.Label>Are you sure You Want To DeActivate..?</Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onDeactive} id="deactivebtn">
            <b>DeActivate</b>
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
            <h3 className="h3">Edit Property Details </h3>
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
          <EditProperty
            Property={property}
            setShowUpdateModal={setShowUpdateModal}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

PropertyDetail.propTypes = {
  tenants: PropTypes.object.isRequired,
  //getAllShops: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  tenants: state.tenants,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getAllShops,
  deactiveProperty,
  getParticularOrg,
  getParticularProperty,
})(PropertyDetail);
