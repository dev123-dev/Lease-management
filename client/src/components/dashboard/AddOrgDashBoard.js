import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import AddOrgModal from "./AddOrgModal";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { deleteOrganization, getAllOrganization } from "../../actions/tenants";
import "../../../../client/src/styles/CustomisedStyle.css";
import EditOrganization from "./EditOrganization";

import Pagination from "../layout/Pagination";

const AddOrgDashBoard = ({
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

  const onDeactivate = () => {
    setShowDeactivate(false);
    const reason = {
      Org_id: OrgId,
      org_status: "Deactive",
      deactive_reason: Organization_DE_Reason,
    };
    deleteOrganization(reason);
  };
  const refreshbtn = () => {
    window.location.reload(true);
  };

  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(7);
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
      <div className="col mt-5">
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col mt-5 h2">Organistration Details</div>
        <div className="text-end"> </div>

        <div className="container-fluid d-flex align-items-center justify-content-center ">
          <div className="col">
            <div className="refreshbtn">
              <img
                height="25px"
                className="mx-2 plusicon"
                onClick={() => setShowadd(true)}
                src={require("../../static/images/add-icon.png")}
                alt="Add User"
                title="Add User"
              />
              <img
                className="mt-1"
                height="25px"
                onClick={() => refreshbtn()}
                src={require("../../static/images/refresh-icon.png")}
                alt="refresh User"
                title="Refresh User"
              />
            </div>

            <div className="row ">
              <div className="col-lg-1"></div>
              <div className="body-inner no-padding table-responsive">
                <table
                  className="table table-bordered table-striped table-hover  table-active mt-5"
                  id="datatable2"
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Location</th>
                      <th>StartDate</th>
                      <th>EndDate</th>
                      <th>Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDatas &&
                      currentDatas[0] &&
                      currentDatas.map((orgVal, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{orgVal.OrganizationName}</td>
                            <td>{orgVal.OrganizationEmail}</td>
                            <td>{orgVal.OrganizationNumber}</td>
                            <td>{orgVal.OrganizationAddress}</td>
                            <td>{orgVal.Location + ","}</td>
                            <td>{orgVal.date}</td>
                            <td>{orgVal.enddate}</td>
                            {orgVal.org_status === "Active" ||
                            orgVal.org_status === "Renewed" ? (
                              <td>
                                <img
                                  className="Cursor text-center"
                                  onClick={() => onedit(orgVal, idx)}
                                  src={require("../../static/images/edit_icon.png")}
                                  alt="Edit"
                                  title="Edit User"
                                />
                                <img
                                  className="Cursor text-center"
                                  onClick={() => onDelete(orgVal._id)}
                                  src={require("../../static/images/delete.png")}
                                  alt="delete User"
                                  title="delete User"
                                />
                              </td>
                            ) : (
                              <td className="blank">DeActivated</td>
                            )}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="col-lg-1"></div>
            </div>

            <div className="row ">
              <div className="col-lg-6">
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

              <div className="col-lg-6  ">
                <p className="text-end h6  ">
                  No of Organization : {allorg.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* deactivating the Super User */}
      <Modal show={showDeactivate} centered>
        <Modal.Header>
          <div className="col-lg-11 ">
            <h3 className="modal-title text-center">
              <b>DEACTIVATE</b>
            </h3>
          </div>
          <div className="col-lg-1 closeicon">
            <img
              src={require("../../static/images/close.png")}
              alt="X"
              style={{ height: "20px", width: "20px" }}
              onClick={() => setShowDeactivate(false)}
            />
          </div>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="h5 despace">
                Reason For Deactivating
              </Form.Label>
              <textarea
                rows="2"
                name="Organization_DE_Reason"
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
          <Button
            // variant="primary"
            id="deactivebtn"
            onClick={onDeactivate}
          >
            <b> DeActivate</b>
          </Button>
        </Modal.Footer>
      </Modal>
      {/*  End Deactivating the user  */}

      {/* edit org old code starting */}
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
            <h3>
              <b className="text-center ">Edit Organization Details </b>
            </h3>
          </div>
          <div className="col-lg-2 ">
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
