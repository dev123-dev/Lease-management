import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import AddShopDetails from "./AddShopDetails";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllShops } from "../../actions/tenants";
// import { Link } from "react-router-dom";
const ShopDetails = ({
  auth: { isAuthenticated, user, users },
  getAllShops,
  tenants: { allShops },
}) => {
  
  useEffect(() => {
    getAllShops();
  }, [getAllShops]);

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const onClickHandler = () => {
    setShowEditModal(true);
  };
  const onAddStaffModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      <Fragment>
        <div className="container container_align ">
          <section className="sub_reg">
            <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
              <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
                <h2 className="heading_color">Property Details </h2>
              </div>
              <div className="col-lg-2 col-md-11 col-sm-11 col-11 py-4">
                {/* <Link to="/shop-Details-add"> */}
                <img
                  className="img_icon_size log"
                  onClick={() => onClickHandler()}
                  src={require("../../static/images/add-icon.png")}
                  alt="Add Shop"
                  title="Add Shop"
                />
                {/* </Link> */}
              </div>
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
                          <th>BuildingName</th>
                          <th>DoorNo</th>
                          <th>Location</th>
                          <th>Address</th>
                          <th>
                            Hike <b>%</b>
                          </th>
                          <th>StampDuty</th>
                          <th>LeaseTimePeriod</th>
                          <th>Operation</th>
                        </tr>
                      </thead>
                      {/* <tbody>
                      {allShops &&
                        allShops.map((allshops, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{allshops.shopFileNo}</td>
                              <td>{allshops.shopDoorNo}</td>
                              <td>{allshops.shopStatus}</td>
                            </tr>
                          );
                        })}
                    </tbody> */}
                      <td>abc</td>
                      <td>101</td>
                      <td>udupi</td>
                      <td>manipal tiger circle</td>
                      <td>5%</td>
                      <td>0.35</td>
                      <td>19/5/2020</td>
                      <td>
                        <center>
                          <img
                            className="img_icon_size log"
                            // onClick={() => onClickHandler()}
                            src={require("../../static/images/edit_icon.png")}
                            alt="Add User"
                            title="Add User"
                          />
                          <img
                            className="img_icon_size log"
                            // onClick={() => onClickHandler()}
                            src={require("../../static/images/delete.png")}
                            alt="Add User"
                            title="Add User"
                          />
                        </center>
                      </td>
                    </table>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </Fragment>
      <Modal
        show={showEditModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10 ">
            <h3 className="modal-title text-center ">Add Pro Details</h3>
          </div>
          <div className="col-lg-2">
            <button onClick={handleEditModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <AddShopDetails onAddStaffModalChange={onAddStaffModalChange} />
        </Modal.Body>
      </Modal>
    </>
  );
};

ShopDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllShops: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  getAllShops,
})(ShopDetails);
