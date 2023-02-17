import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddShopDetailsform } from "../../actions/tenants";
import { Modal } from "react-bootstrap";
import { getAllShops } from "../../actions/tenants";
import "../../../../client/src/styles/CustomisedStyle.css";

const AddShopDetails = ({
  auth: { isAuthenticated, user, users },
  AddShopDetailsform,
  onAddStaffModalChange,
  getAllShops,
}) => {
  //formData
  const [formData, setFormData] = useState({
    shopFileNo: "",
    shopDoorNo: "",
    isSubmitted: false,
  });

  const { shopFileNo, shopDoorNo } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showInformationModal, setShowInformation] = useState(false);

  const handleInformationModalClose = () => setShowInformation(false);
  const LogoutModalClose = () => {
    handleInformationModalClose();
  };
  const onSubmit = () => {
    const finalData = {
      shopFileNo: shopFileNo,
      shopDoorNo: shopDoorNo,
      shopStatus: "Available",
    };

    AddShopDetailsform(finalData);
    setFormData({
      ...formData,
      shopFileNo: "",
      shopDoorNo: "",
      isSubmitted: true,
    });
    onAddStaffModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <div className="container ">
        <div className="row col-lg-12 col-md-6 col-sm-12 col-12">
          <div className="col-lg-3 col-md-6 col-sm-12 col-12">
            <label>
              {" "}
              BuildingName{" "}
              <i className="text-danger ">
                <b>*</b>
              </i>
              :
            </label>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 col-12">
            <input
              type="text"
              name="buildingno"
              // value={}
              className="form-control input"
              // onChange={(e) => onInputChange(e)}
              required
            />
            <br></br>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 col-12 text-center">
            <label>
              Door No{" "}
              <i className="text-danger ">
                <b>*</b>
              </i>
              :
            </label>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 col-12">
            <input
              type="text"
              name="shopDoorNo"
              // value={shopDoorNo}
              className="form-control  input"
              // onChange={(e) => onInputChange(e)}
              required
            />
            <br></br>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 col-12">
            <label>Location * :</label>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 col-12">
            <input
              type="text"
              name="Location"
              // value={shopDoorNo}
              className="form-control  input"
              // onChange={(e) => onInputChange(e)}
              required
            />
            <br></br>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 col-12 text-center">
            <label>Address :</label>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 col-12">
            <input
              type="text"
              name="address"
              // value={shopDoorNo}
              className="form-control  input"
              // onChange={(e) => onInputChange(e)}
              required
            />
            <br></br>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 col-12">
            <label>
              Hike<b>%</b> :
            </label>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 col-12">
            <input
              type="text"
              name="hike"
              // value={shopDoorNo}
              className="form-control  input"
              // onChange={(e) => onInputChange(e)}
              required
            />
            <br></br>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 col-12 text-center">
            <label>StampDuty :</label>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 col-12">
            <input
              type="text"
              name="stampduty"
              // value={shopDoorNo}
              className="form-control  input"
              // onChange={(e) => onInputChange(e)}
              required
            />
            <br></br>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 col-12">
            <label>LeaseTimePeriod :</label>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 col-12">
            <input
              type="text"
              name="leasetimeperiod"
              value={shopDoorNo}
              className="form-control  input"
              // onChange={(e) => onInputChange(e)}
              required
            />
            <br></br>
          </div>
        </div>

        <div className="col-md-12 col-lg-12 col-sm-12 col-12 text-left">
          <button
            variant="success"
            className="btn sub_form btn_continue Save float-right"
            onClick={() => onSubmit()}
            style={
              shopFileNo !== "" && shopDoorNo !== ""
                ? { opacity: "1" }
                : { opacity: "1", pointerEvents: "none" }
            }
          >
            Save
          </button>
        </div>
      </div>

      <Modal
        show={showInformationModal}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="logout-modal "
      >
        <Modal.Header className="confirmbox-heading">
          <h4 className="mt-0">Information</h4>
        </Modal.Header>
        <Modal.Body>
          <h5>Shop Details Added!!</h5>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn_green_bg"
            onClick={() => LogoutModalClose()}
          >
            OK
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

AddShopDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  AddShopDetailsform: PropTypes.func.isRequired,
  getAllShops: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  AddShopDetailsform,
  getAllShops,
})(AddShopDetails);
