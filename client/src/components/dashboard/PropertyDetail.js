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
    getParticularOrg({ OrganizationId: user && user.OrganizationId });
  }, []);

  const [formData, setFormData] = useState({
    deactive_reason: "",
    isSubmitted: false,
  });
  const [LOCATION, SetLocation] = useState(null);
  const [Sellocation, SetselLoction] = useState([]);
  const Loc = [];

  const { Location } = particular_org_loc && particular_org_loc[0];
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

  // let output = particular_org_data.filter(
  //   (item) =>
  //     item.shopDoorNo &&
  //     !item.shopDoorNo.every((nameItem) => nameItem.status !== "Avaiable")
  // );

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleUpdateModalOpen = () => setShowUpdateModal(!showUpdateModal);
  const [property, setProperty] = useState([]);

  const onEdit = (ele) => {
    let propertydata = {
      OrganizationId: ele.OrganizationId,
      PropertyId: ele._id,
      OrganizationName: ele.OrganizationName,
      buildingName: ele.buildingName,
      hike: ele.hike,
      leaseTimePeriod: ele.leaseTimePeriod,
      shopAddress: ele.shopAddress,
      shopDoorNo: ele.shopDoorNo,
      Location: ele.Location,
      stampDuty: ele.stampDuty,
    };
    setProperty(propertydata);
    handleUpdateModalOpen();
  };

  const { deactive_reason } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [checkData, setCheckData] = useState([]);
  const HandelCheck = (e) => {
    var updatedlist = [...checkData];
    if (e.target.checked) {
      updatedlist = [...checkData, e.target.value];
    } else {
      updatedlist.splice(checkData.indexOf(e.target.value), 1);
    }
    setCheckData(updatedlist);
  };
  const [dno, SetDno] = useState([]);
  const [PropertyId, setPropertyId] = useState([]);
  const [selectDno, SetDoornumber] = useState();
  const handleShowDno = () => SetDoornumber(false);
  const handleCloseDno = () => {
    SetDoornumber(false);
    setCheckData([]);
  };
  const onDelete = (id, Dno) => {
    if (Dno.length >= 1) {
      SetDno(Dno);
      setPropertyId(id);
      SetDoornumber(true);
    } else {
      SetDno(Dno);
      setPropertyId(id);
      handleShow();
    }
  };
  const onchangeLocation = (e) => {
    SetLocation(e);
    const OrgainationId_Loc_name = {
      OrganizationId: user && user.OrganizationId,
      LocationName: e.value,
    };
    getParticularProperty(OrgainationId_Loc_name);
  };

  const onDeactivate = (e) => {
    e.preventDefault();
    setShow(false);
    const reason = {
      PropertyId: PropertyId,
      OrganizationId: user && user.OrganizationId,
      Dno: checkData.length !== 0 ? checkData : dno,
      shopStatus: "Deactive",
      deactive_reason: deactive_reason,
    };
    deactiveProperty(reason);
    getParticularOrg({ OrganizationId: user && user.OrganizationId });

    handleShowDno();
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
    fun();
    const OrganizationId = {
      OrganizationId: user && user.OrganizationId,
    };
    getParticularOrg(OrganizationId);
    SetLocation(null);
  };
  return (
    <>
      <div className="col mt-sm-5   ">

        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding mt-sm-2 ">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12  ">
            <h1
              style={{
                fontFamily: "Serif",
                color: "#095a4a",
                position:"relative",
                right:"70px"
              }}
              className="font-weight-bold headsize "
            >

              Property Details

            </h1>

          </div>
          <hr className="line"></hr>



          <div className="container-fluid d-flex align-items-center justify-content-center mt-sm-1 ">
            <div className="col">
              <div className="row text-end ">
                <div className="col-lg-4">
                  {" "}
                  <Select
                    className="dropdown text-left"
                    placeholder="Search-Location"
                    name="location"
                    options={Sellocation}
                    value={LOCATION}
                    onChange={(e) => onchangeLocation(e)}
                    theme={(theme) => ({
                      ...theme,
                      height: 26,
                      minHeight: 26,
                      borderRadius: 1,
                      colors: {
                        ...theme.colors,
                        primary: "gray",
                      },
                    })}
                  ></Select>
                </div>
                <div className="col-lg-4"></div>
                <div className="col-lg-4 refresh ">
                  {" "}
                  <img
                    height="20px"
                    onClick={() => setShowadd(true)}
                    src={require("../../static/images/add-icon.png")}
                    alt="Add Prop"
                    title="Add Prop"
                  />
                  <img
                    className="ml-2"
                    height="20px"
                    onClick={() => refresh()}
                    src={require("../../static/images/refresh-icon.png")}
                    alt="refresh"
                    title="refresh"
                  />
                </div>
              </div>

              <div className="row ">
                <div className="col-lg-1"></div>
                <div className="firstrowsticky body-inner no-padding table-responsive">
                  <table
                    className="table table-bordered table-striped table-hover   mt-1  "
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th
                          className="headcolstatic"
                          style={{ height: "-10px !important" }}
                        >
                          Building Name
                        </th>
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
                              <td className="headcolstatic secondlinebreak1">
                                {Val.buildingName}
                              </td>
                              <td>
                                {Val.shopDoorNo &&
                                  Val.shopDoorNo.map((ele) => {
                                    <p key={idx}></p>;
                                    if (
                                      ele.status !== "Deleted the Door Number"
                                    ) {
                                      return (
                                        <div className="dno">
                                          {ele.doorNo + ","}
                                        </div>
                                      );
                                    }
                                  })}
                              </td>
                              <td>{Val.Location}</td>
                              <td>{Val.hike}</td>
                              <td>{Val.stampDuty}</td>
                              <td>{Val.leaseTimePeriod}</td>
                              <td>{Val.shopAddress}</td>

                              <td className=" text-center">
                                {Val.shopStatus === "Active" ? (
                                  <>
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
                                      onClick={() =>
                                        onDelete(Val._id, Val.shopDoorNo)
                                      }
                                      src={require("../../static/images/delete.png")}
                                      alt="Delete Property "
                                      title="Delete Property"
                                    />
                                  </>
                                ) : (
                                  <p></p>
                                )}
                              </td>
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
                    No.of Property : {particular_org_data.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* add model start */}
      <Modal
        show={showadd}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <AddShopDetails setShowadd={setShowadd} />
      </Modal>
      {/* add model end */}

      {/* Modal edit start*/}
      <Modal
        show={showUpdateModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="confirmbox-heading">
          <div className="col-lg-10">
            <div className="ml-4">
              <h3
                style={{
                  fontFamily: "Sans-serif",
                  color: "white",
                }}
                className="text-center  ml-4"
              >
                Edit Property Details
              </h3>{" "}
            </div>
          </div>
          <div className="col-lg-2">
            <button onClick={handleUpdateModalOpen} className="close ml-5">
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
            Propertydata={property}
            setShowUpdateModal={setShowUpdateModal}
          />
        </Modal.Body>
      </Modal>
      {/* Model edit end */}

      {/* modal for Deactivating the single Property starting */}
      <Modal show={show} centered>
        <form onSubmit={(e) => onDeactivate(e)}>
          <Modal.Header className="confirmbox-heading">
            <div className="col-lg-11 ">
              <div className="modal-title ">
                <h3
                  style={{
                    fontFamily: "Sans-serif",
                    color: "white",
                  }}
                  className="text-center mr-3 "
                >
                  DEACTIVATE
                </h3>
              </div>
            </div>
            <div className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
                onClick={() => setShow(false)}
              />
            </div>
          </Modal.Header>

          <Modal.Body>
            <div className="h5 despace">Reason For Deactivating</div>
            <textarea
              rows="2"
              name="deactive_reason"
              value={deactive_reason}
              onChange={(e) => onInputChange(e)}
              placeholder="Deactive Reason"
              id="org_reason"
              className="form-control "
              style={{ width: "100%" }}
              required
            ></textarea>
            <div>Are you sure You Want To Deactivate..?</div>
          </Modal.Body>
          <Modal.Footer>
            <Button id="deactivebtn" type="submit">
              <b>Deactive</b>
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={selectDno} centered>
        <form onSubmit={(e) => onDeactivate(e)}>
          <Modal.Header className="confirmbox-heading">
            <div className="col-lg-11 ">
              <div className="modal-title ">
                <h3
                  style={{
                    fontFamily: "Sans-serif",
                    color: "white",
                  }}
                  className="text-center mr-3 "
                >
                  DEACTIVATE
                </h3>
              </div>
            </div>
            <div className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
                onClick={handleCloseDno}
              />
            </div>
          </Modal.Header>

          <Modal.Body>
            {/* <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> */}

            <div className="text-dark">Choose Door No for Deactivate</div>
            <div className="checkbx">
              {/* eslint-disable-next-line array-callback-return */}
              {dno.map((ele) => {
                if (ele.status === "Avaiable") {
                  return (
                    <>
                      <input
                        type="checkbox"
                        id="checkbox"
                        value={ele.doorNo}
                        onChange={(e) => HandelCheck(e)}
                      />
                      &nbsp;
                      <label htmlFor="vehicle1">
                        {ele.doorNo}&nbsp; &nbsp;
                      </label>
                    </>
                  );
                }
              })}
            </div>
            <div className=" despace pt-3">Reason For Deactivating</div>
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
            <div>Are you sure You Want To Deactivate..?</div>
            {/* </Form.Group>
          </Form> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" id="deactivebtn" type="submit">
              <b>Deactive</b>
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      {/* modal for Deactivating the single Property ending */}
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
