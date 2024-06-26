import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import AddOrgModal from "./AddOrgModal";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { deleteOrganization, getAllOrganization } from "../../actions/tenants";
import "../../../../client/src/styles/CustomisedStyle.css";
import EditOrganization from "./EditOrganization";
import Add from "../../static/images/Add.svg";
import Edit from "../../static/images/Edit.svg";
import Deactivate from "../../static/images/Deactivate.svg";

import Pagination from "../layout/Pagination";

const AddOrgDashBoard = ({
  tenants: { allorg },
  deleteOrganization,
  getAllOrganization,
}) => {
  useEffect(() => {
    getAllOrganization();
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
    const delitem = nameofLocation.Location.filter((ele) => {
      return indexx != ele;
    });

    setitem(delitem);
  };

  const addItem = () => {
    if (!inputdata) {
    } else {
      setitem([...items, inputdata]);
      setinput("");
    }
  };
  //multiple location end

  //edit
  const [showadd, setShowadd] = useState(false);

  //deactivate
  const [showDeactivate, setShowDeactivate] = useState(false);
  //Edit
  const [showEditModal, setShowEditModal] = useState(false);
  const editclose = () => {
    setShowEditModal(false);
  };

  const [OrgId, setId] = useState(null);

  const onDelete = (id) => {
    setId(id);
    setShowDeactivate(true);
  };
  const [orgdata, setorgdata] = useState(null);

  const onedit = (user, id) => {
    setShowEditModal(true);
    setId(id);
    setorgdata(user);
  };

  const [formData, setFormData] = useState({
    Organization_DE_Reason: "",
    isSubmitted: false,
  });
  // checking
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { Organization_DE_Reason } = formData;

  const onDeactivate = (e) => {
    e.preventDefault();
    setShowDeactivate(false);
    const reason = {
      Org_id: OrgId,
      org_status: "Deactive",
      deactive_reason: Organization_DE_Reason,
    };
    deleteOrganization(reason);
  };

  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(8);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDatas =
    allorg && allorg.slice(indexOfFirstData, indexOfLastData);

  const paginate = (nmbr) => {
    setCurrentData(nmbr);
  };

  return (
    <>
      <div className="col mt-sm-5">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding  ">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12  ">
            <h2
              style={{
                position: "relative",
                top: "50px",
              }}
              className=" headsize ml-3 heading_color"
            >
              Organization Details
            </h2>
          </div>

          <div className="container-fluid d-flex align-items-center justify-content-center ">
            <div className="col">
              <div className="refreshbtn">
                <img
                  // className="plusicon"
                  className="iconSize"
                  onClick={() => setShowadd(true)}
                  src={Add}
                  alt="Add org"
                  title="Add Organisation"
                />
              </div>

              <div className="row ">
                <div className="col-lg-1  col-sm-12 col-md-12"></div>
                <div className="body-inner no-padding table-responsive">
                  <table
                    className="table table-bordered table-striped table-hover table1 mt-5"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Location</th>
                        <th>Start Date</th>
                        <th>EndDate</th>
                        <th>Operation</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {currentDatas &&
                        currentDatas[0] &&
                        currentDatas.map((orgVal, idx) => {
                          var ED =
                            orgVal.enddate && orgVal.enddate.split(/\D/g);
                          var Enddate = [
                            ED && ED[2],
                            ED && ED[1],
                            ED && ED[0],
                          ].join("-");
                          var SD = orgVal.date && orgVal.date.split(/\D/g);
                          var StartDate = [
                            SD && SD[2],
                            SD && SD[1],
                            SD && SD[0],
                          ].join("-");
                          return (
                            <tr key={idx}>
                              <td>{orgVal.OrganizationName}</td>
                              <td>{orgVal.OrganizationEmail}</td>
                              <td>{orgVal.OrganizationNumber}</td>
                              <td>{orgVal.OrganizationAddress}</td>
                              <td>{orgVal.Location + ","}</td>
                              <td>{StartDate}</td>
                              <td>{Enddate}</td>
                              {orgVal.org_status === "Active" ||
                              orgVal.org_status === "Expired" ? (
                                <td className="text-center">
                                  <img
                                    className="iconSize "
                                    onClick={() => onedit(orgVal, idx)}
                                    src={Edit}
                                    alt="Edit Organisation"
                                    title="Edit Organisation"
                                  />
                                  &nbsp;
                                  <img
                                    className="iconSize "
                                    onClick={() => onDelete(orgVal._id)}
                                    src={Deactivate}
                                    alt="delete Organisation"
                                    title="Deactivate"
                                  />
                                </td>
                              ) : (
                                <td className="blank">Deactivated</td>
                              )}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="col-lg-1  col-sm-12 col-md-12"></div>
              </div>

              <div className="row ">
                <div className="col-lg-6  col-sm-12 col-md-12">
                  {allorg && allorg.length !== 0 ? (
                    <Pagination
                      dataPerPage={dataPerPage}
                      totalData={allorg.length}
                      paginate={paginate}
                      currentPage={currentData}
                    />
                  ) : (
                    <Fragment />
                  )}
                </div>

                <div className="col-lg-6  col-sm-12 col-md-12 ">
                  <p className="text-end h6 font-weight-bold"
                    style={{ color: "#095a4a" }}>
                    No. of Organization : {allorg.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add model */}
      <Modal
        show={showadd}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <AddOrgModal setShowadd={setShowadd} />
      </Modal>
      {/* end add model */}

      {/* edit org  starting */}
      <Modal
        show={showEditModal}
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
                className="text-center  ml-4 "
              >
                Edit Organization Details{" "}
              </h4>
            </div>
          </div>
          <div className="col-lg-2  col-sm-12 col-md-12">
            <button onClick={editclose} className="close">
              <img
                className="editcl"
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <EditOrganization org={orgdata} EditModal={setShowEditModal} />
        </Modal.Body>
      </Modal>
      {/* edit org  ending */}

      {/* deactivating the Super User */}

      <Modal show={showDeactivate} centered>
        <form onSubmit={onDeactivate}>
          <Modal.Header className="confirmbox-heading">
            <div className="col-lg-10  col-sm-12 col-md-12">
              <div className="modal-title">
                <h4
                  style={{
                    color: "white",
                  }}
                  className="text-center"
                >
                  DEACTIVATE
                </h4>
              </div>
            </div>
            <div
              className="close col-lg-2  col-sm-12 col-md-12"
              onClick={() => setShowDeactivate(false)}
            >
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </div>
          </Modal.Header>

          <Modal.Body>
            {/* <Form> */}
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> */}
            <div className="h5 despace">Reason For Deactivating</div>
            <textarea
              name="Organization_DE_Reason"
              id="Organization_DE_Reason"
              className="textarea form-control"
              rows="3"
              placeholder="Deactive Reason"
              onChange={(e) => onInputChange(e)}
              style={{ width: "100%" }}
              required
            ></textarea>
            <div>Are you sure You Want To Deactivate..?</div>
            {/* </Form.Group> */}
            {/* </Form> */}
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              // variant="primary"
              id="deactivebtn"
            >
              <b> Deactive</b>
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/*  End Deactivating the user  */}
    </>
  );
};
const mapStateToProps = (state) => ({
  tenants: state.tenants,
});
export default connect(mapStateToProps, {
  getAllOrganization,
  deleteOrganization,
})(AddOrgDashBoard);
