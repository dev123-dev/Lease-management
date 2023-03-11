import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import AddShopDetails from "./AddShopDetails";
import { Modal, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import EditProperty from "../dashboard/EditProperty";
import {
  getParticularProperty,
  getParticularOrg,
  deactiveProperty,
  getAllShops,
} from "../../actions/tenants";
import Select from "react-select";
import Pagination from "../layout/Pagination";
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
  // const handleClose = () => setShow(false);
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

  const [showadd, setShowadd] = useState(false);

  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(7);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDatas =
    particular_org_data &&
    particular_org_data.slice(indexOfFirstData, indexOfLastData);
  const paginate = (nmbr) => {
    setCurrentData(nmbr);
  };
  const refresh = () => {
    window.location.reload(true);
  };
  return (
    <>
      <div className="col mt-5">
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>

        <div className="col mt-5 h2 ml-2">Property Details</div>

        <div className="text-end"></div>

        <div className="w-25 ml-4">
          <Select
            placeholder="Search-Location"
            name="location"
            options={Sellocation}
            value={LOCATION}
            onChange={(e) => onchangeLocation(e)}
          ></Select>
        </div>

        <div className="container-fluid d-flex align-items-center justify-content-center ">
          <div className="col">
            <div className="refreshbtn">
              {/* <AddShopDetails /> */}
              <img
                height="25px"
                onClick={() => setShowadd(true)}
                src={require("../../static/images/add-icon.png")}
                alt="Add Prop"
                title="Add Prop"
              />

              <img
                className="mt-1"
                height="25px"
                onClick={() => refresh()}
                src={require("../../static/images/refresh-icon.png")}
                alt="refresh"
                title="refresh"
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

                            {Val.shopStatus === "Acquired" ? (
                              <td className=" text-center">
                                <img
                                  className="Cursor"
                                  onClick={() => onEdit(Val)}
                                  src={require("../../static/images/edit_icon.png")}
                                  alt="Edit Property"
                                  title="Edit Property"
                                />
                                &nbsp;
                                <img
                                  className=" Cursor"
                                  onClick={() => onDelete(Val._id)}
                                  src={require("../../static/images/delete.png")}
                                  alt="Delete Property "
                                  title="Delete Property"
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

            <div className="row">
              <div className="col-lg-6">
                {particular_org_data && particular_org_data.length !== 0 ? (
                  <Pagination
                    dataPerPage={dataPerPage}
                    totalData={particular_org_data.length}
                    paginate={paginate}
                    currentPage={currentData}
                  />
                ) : (
                  <Fragment />
                )}
              </div>
              <div className="col-lg-6">
                <p className="text-end h6">
                  No of Property : {particular_org_data.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal for Deactivating the Property starting */}
      <Modal show={show} centered>
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
              onClick={() => setShow(false)}
            />
          </div>
        </Modal.Header>

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
            <h3>
              <b className="text-center">Edit Property Details</b>{" "}
            </h3>
          </div>
          <div className="col-lg-2">
            <button onClick={handleUpdateModalOpen} className="close ml-5">
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
          <EditProperty
            Property={property}
            setShowUpdateModal={setShowUpdateModal}
          />
        </Modal.Body>
      </Modal>
      {/* add model */}
      <Modal
        show={showadd}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <AddShopDetails setShowadd={setShowadd} />
      </Modal>
    </>
  );
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
