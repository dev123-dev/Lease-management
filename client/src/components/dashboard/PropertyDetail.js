import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AddShopDetails from "./AddShopDetails";
import { Modal,Button } from "react-bootstrap";
import { getAllShops } from "../../actions/tenants";
import { Form } from "react-bootstrap";
import { deactiveProperty } from "../../actions/tenants";

const PropertyDetail = ({ tenants: { allShopDetails }, getAllShops,deactiveProperty }) => {
  
  useEffect(() => {
    getAllShops();
  }, [getAllShops]);

  const [formData, setFormData] = useState({
    deactive_reason: "",
    isSubmitted: false,
  });

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
  }
  return (
    <div>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
              <h2 className="heading_color">Property Reports </h2>
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
                  <th>Status</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {allShopDetails &&
                  allShopDetails.map((Val, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{Val.buildingName}</td>
                        <td>{Val.shopDoorNo}</td>
                        <td>{Val.Location}</td>
                        <td>{Val.hikePercentage}</td>
                        <td>{Val.stampDuty}</td>
                        <td>{Val.leaseTimePeriod}</td>
                        <td>{Val.shopStatus}</td>
                        <td>
                          <img
                            className="img_icon_size log"
                            // onClick={() => clicking()}
                            src={require("../../static/images/edit_icon.png")}
                            alt="Edit"
                            title="Add User"
                          />
                          <img
                            className="img_icon_size log"
                            // onClick={() => onClickHandler()}
                            onClick={()=>onDelete(Val._id)}
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
        <Modal.Header className="lg" closeButton>
          x
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Reason For Deactivating</Form.Label>
              <Form.Control
                type="text"
                name="deactive_reason"
                onChange={(e) => onInputChange(e)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onAdd}>
            Save
          </Button>
          <Button variant="primary" onClick={handleClose}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal Ending */}
    </div>
  );
};

PropertyDetail.propTypes = {
  tenants: PropTypes.object.isRequired,
  getAllShops: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  tenants: state.tenants,
});
export default connect(mapStateToProps, { getAllShops,deactiveProperty })(PropertyDetail);
