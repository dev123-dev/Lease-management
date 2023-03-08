import React, { useState, useEffect, Fragment } from "react";
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
import Table from "react-bootstrap/Table";

import Pagination from "../layout/Pagination";

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
    const delitem = nameofLocation.Location.filter((ele) => {
      return indexx != ele;
    });
    // const delitem = items.filter((ele, ind) => {
    //   return ind != index;
    // });
    setitem(delitem);
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

  //deactivate
  const [showDeactivate, setShowDeactivate] = useState(false);
  //Edit
  const [showEditModal, setShowEditModal] = useState(false);
  const editclose = () => {
    setShowEditModal(false);
  };

  const [OrgId, setId] = useState("");

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

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { Organization_DE_Reason } = formData;

  const onAdd = () => {
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
    <div>
      <div className="container container_align">
        {/* OrganiZation Details  start*/}
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="  col-lg-10 col-md-11 col-sm-11 col-11 ">
              <h2 className="heading_color ">Organization Details </h2>
              <hr></hr>

              <div>
                <img
                  className="refreshbtn"
                  height="25px"
                  onClick={() => refreshbtn()}
                  src={require("../../static/images/refresh-icon.png")}
                  alt="Add User"
                  title="Refresh User"
                />
              </div>
            </div>
            <div className="link_to_org">
              <AddOrgModal />
            </div>
          </div>
          <div className="row ">
            <div className="col-lg-11 col-md-11 col-sm-11 col-11 text-center">
              <section className="body">
                <div className="body-inner no-padding ">
                  <table
                    className="table table-bordered table-striped table-hover table-active "
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
                              <td>
                                {orgVal.org_status === "Active" ? (
                                  <>
                                    <img
                                      className="Cursor"
                                      onClick={() => onedit(orgVal, idx)}
                                      src={require("../../static/images/edit_icon.png")}
                                      alt="Edit"
                                      title="Edit User"
                                    />
                                    &nbsp;
                                    <img
                                      className="Cursor"
                                      onClick={() => onDelete(orgVal._id)}
                                      src={require("../../static/images/delete.png")}
                                      alt="delete User"
                                      title="delete User"
                                    />
                                  </>
                                ) : (
                                  <div className="blank">DeActivated</div>
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
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-11 col-11 no_padding">
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
            <div className="col-lg-5 col-md-6 col-sm-11 col-11 align_right">
              <label>No of OrganiZations : {allorg.length}</label>
            </div>
          </div>
        </section>
        {/* OrganiZation Deatils End */}
      </div>

      {/* deactivating the Super User */}
      <Modal
        show={showDeactivate}
        // onHide={handleClose}
        centered
      >
        <Modal.Title>
          <></>
          <div className="text-center h4">
            <b className="ml-2">Deactivate</b>

            <Button onClick={() => setShowDeactivate(false)} id="Deactiveclose">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </Button>
          </div>
        </Modal.Title>

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
            onClick={onAdd}
          >
            <b> DeActive</b>
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
          <div className="col-lg-10">
            <h3>
              <b className="modal-title text-center h3">
                Edit Organization Details{" "}
              </b>
            </h3>
          </div>
          <div className="col-lg-2">
            <button onClick={editclose} className="close">
              <img
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
