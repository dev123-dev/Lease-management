import React, { useEffect, useState, Fragment, useRef } from "react";
import { connect } from "react-redux";
import AddShopDetails from "./AddShopDetails";
import { Modal, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";
import EditProperty from "../dashboard/EditProperty";
import {
  getParticularProperty,
  getParticularOrg,
  deactiveProperty,
  getAllSettings,
  getAllShops,
  // getDoorNo,
  AddUserActivity,
} from "../../actions/tenants";
import Select from "react-select";
import Pagination from "../layout/Pagination";
import Edit from "../../static/images/Edit.svg";
import Deactivate from "../../static/images/Deactivate.svg";
import Add from "../../static/images/Add.svg";
import Print from "../../static/images/Print.svg";
import Excel from "../../static/images/Microsoft Excel.svg";
import Refresh from "../../static/images/Refresh.svg";
const PropertyDetail = ({
  auth: { user },
  tenants: { particular_org_data, particular_org_loc },
  deactiveProperty,
  getParticularOrg,
  getAllSettings,
  AddUserActivity,
  // getDoorNo,
  getParticularProperty,
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // getDoorNo(); //no use
    fun();
    getParticularProperty({ OrganizationId: user && user.OrganizationId });

    getParticularOrg({ OrganizationId: user && user.OrganizationId });
    getAllSettings({
      OrganizationId: myuser && myuser.OrganizationId,
      userId: myuser && myuser._id,
    });
  }, []);

  let ActivePCount =
    particular_org_data &&
    particular_org_data.filter((ele) => {
      if (ele.shopStatus === "Active") {
        return ele;
      }
    });
  let DeactivePCount =
    particular_org_data &&
    particular_org_data.filter((ele) => {
      if (ele.shopStatus === "Deactive") {
        return ele;
      }
    });

  const [RoomAlreadyExist, SetRoomAlreadyExist] = useState({
    color: "white",

    display: "none",
  });

  const [formData, setFormData] = useState({
    deactive_reason: "",
    isSubmitted: false,
  });
  const [LOCATION, SetLocation] = useState(null);
  const [Sellocation, SetselLoction] = useState([]);
  const Loc = [];

  const { Location } = particular_org_loc && particular_org_loc[0];
  const fun = () => {
    particular_org_loc &&
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
      BuildingName: ele.BuildingName,
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
  const [propertyname, setPropertyname] = useState("");
  const onDelete = (id, Dno, Val) => {
    const DelDno = Dno.filter((ele) => ele && ele.status === "Avaiable");
    if (DelDno.length >= 1) {
      SetDno(Dno);
      setPropertyname(Val.BuildingName);
      setPropertyId(id);
      SetDoornumber(true);
    } else {
      SetDno(Dno);
      setPropertyname(Val.BuildingName);
      setPropertyId(id);
      handleShow();
    }
  };

  // TO DISPLAY DOOR NUMBER
  const [showDoorNo, setShowDoorNo] = useState(false);

  const [doorNumber, setDoorNumber] = useState([]);
  const openDoorNo = (dNo) => {
    setDoorNumber(dNo);
    setShowDoorNo(true);
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

    if (checkData.length !== 0) {
      setShow(false);
      const reason = {
        PropertyId: PropertyId,
        OrganizationId: user && user.OrganizationId,
        Dno: checkData,
        shopStatus: "Deactive",
        deactive_reason: deactive_reason,
      };
      const addUserActivity = {
        userId: user && user._id,
        userName: user && user.username,
        Menu: "property",
        Operation: "Deactive",
        Dno: checkData,
        OrganizationId: user.OrganizationId,
        NameId: PropertyId,
        Name: propertyname,
        expireAt: new Date().getTime() + 80,
      };
      AddUserActivity(addUserActivity);
      deactiveProperty(reason);
      getParticularOrg({ OrganizationId: user && user.OrganizationId });
      getParticularProperty({ OrganizationId: user && user.OrganizationId });
      handleShowDno();
      setCheckData([]);
    } else {
      SetRoomAlreadyExist({
        display: "inline",
        color: "#FF0000",
      });
    }
  };

  const onDeactivateall = (e) => {
    e.preventDefault();
    if (checkData.length === 0) {
      setShow(false);
      const reason = {
        PropertyId: PropertyId,
        OrganizationId: user && user.OrganizationId,
        Dno: [],
        shopStatus: "Deactive",
        deactive_reason: deactive_reason,
      };
      const addUserActivity = {
        userId: user && user._id,
        userName: user && user.username,
        Menu: "property",
        Operation: "Deactive",
        Dno: [],
        Name: propertyname,
        OrganizationId: user.OrganizationId,
        NameId: PropertyId,
        expireAt: new Date().getTime() + 80,
      };
      AddUserActivity(addUserActivity);
      deactiveProperty(reason);
      getParticularProperty({ OrganizationId: user && user.OrganizationId });
      getParticularOrg({ OrganizationId: user && user.OrganizationId });
      SetRoomAlreadyExist({
        display: "none",
        color: "",
      });
      handleShowDno();
    } else {
    }
  };

  const [showadd, setShowadd] = useState(false);

  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(8);
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
  const dnolen = dno.filter((ele) => ele.status === "Avaiable");

  const csvPropertyData = [
    ["Building Name", "Address", "Location", "Door No."],
  ];

  particular_org_data
    .filter((ele) => ele.shopStatus == "Active")
    .map((particular_org_data) => {
      var doorNo =
        particular_org_data &&
        particular_org_data.shopDoorNo.map((e) => e.doorNo).join(", "); // Join door numbers into a single string

      return csvPropertyData.push([
        particular_org_data.BuildingName,
        particular_org_data.shopAddress,
        particular_org_data.Location,

        doorNo,
      ]);
    });
  const [isPrinting, setIsPrinting] = useState(false);
  useEffect(() => {
    // Clean up after component unmounts
    return () => {
      setIsPrinting(false);
    };
  }, []);

  const [showPrint, setShowPrint] = useState({
    backgroundColor: "#095a4a",
    color: "white",
    fontWeight: "bold",
  });
  //Print Property Detail
  const OnPrint = () => {
    setIsPrinting(true);
    handlePrint();
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Property Detail",

    onAfterPrint: () => {
      setTimeout(() => {
        setIsPrinting(false);
        setShowPrint({
          backgroundColor: "#095a4a",
          color: "white",
          fontWeight: "bold",
        });
      }, 200);
    },
  });

  return (
    <>
      <div className="col mt-sm-4 space ">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
          <div className="row mt-5 ">
            <div className="col-lg-5  col-sm-12 col-md-12 mt-3">
              <h2 className="heading_color  headsize  ml-4">
                Property Details
              </h2>
            </div>

            <div className="col-lg-5  col-sm-12 col-md-12 mt-4 ">
              <div className="row">
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <Select
                    className="dropdown text-left "
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
                        primary25: "#e8a317",
                        primary: "#095a4a",
                      },
                    })}
                  ></Select>
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12"></div>
              </div>
            </div>
            {myuser.usergroup === "Admin" ? (
              <div className="col-lg-2  col-sm-12 col-md-12 text-end  pt-2 iconspace  ">
                {" "}
                <>
                  <button style={{ border: "none" }}>
                    <img
                      onClick={() => setShowadd(true)}
                      src={Add}
                      alt="Add Property"
                      title="Add Property"
                      className="iconSize"
                    />
                  </button>

                  <CSVLink
                    data={csvPropertyData}
                    filename={"Property-Details.csv"}
                  >
                    <img
                      className="iconSize"
                      src={Excel}
                      alt="Excel-Export"
                      style={{ cursor: "pointer" }}
                      title="Excel-Export"
                    />
                  </CSVLink>
                </>
                <button
                  style={{ border: "none" }}
                  onClick={async () => {
                    await setShowPrint({
                      backgroundColor: "#095a4a",
                      color: "black",
                      fontWeight: "bold",
                    });

                    OnPrint();
                  }}
                >
                  <img
                    src={Print}
                    alt="Print"
                    title="Print"
                    className="iconSize"
                  />
                </button>
                <button style={{ border: "none" }} className="mx-0 px-0">
                  <img
                    className="iconSize"
                    // className=" float-right "
                    style={{ cursor: "pointer" }}
                    onClick={() => refresh()}
                    src={Refresh}
                    alt="refresh"
                    title="Refresh"
                  />
                </button>
              </div>
            ) : (
              <div className="col-lg-2  col-sm-12 col-md-12 text-end  pt-2 iconspace  ">
                {" "}
                <>
                  <CSVLink
                    data={csvPropertyData}
                    filename={"Property-Details.csv"}
                  >
                    <img
                      className="iconSize"
                      src={Excel}
                      alt="Excel-Export"
                      style={{ cursor: "pointer" }}
                      title="Excel-Export"
                    />
                  </CSVLink>
                </>
                <button
                  style={{ border: "none" }}
                  onClick={async () => {
                    await setShowPrint({
                      backgroundColor: "#095a4a",
                      color: "black",
                      fontWeight: "bold",
                    });

                    OnPrint();
                  }}
                >
                  <img
                    src={Print}
                    alt="Print"
                    title="Print"
                    className="iconSize"
                  />
                </button>
                <button style={{ border: "none" }} className="mx-0 px-0">
                  <img
                    className="iconSize"
                    // className=" float-right "
                    style={{ cursor: "pointer" }}
                    onClick={() => refresh()}
                    src={Refresh}
                    alt="refresh"
                    title="Refresh"
                  />
                </button>
              </div>
            )}
          </div>

          <div className="container-fluid d-flex align-items-center justify-content-center ">
            <div className="col">
              <div ref={componentRef}>
                <div className="row ">
                  <div className="col-lg-1  col-sm-12 col-md-12"></div>
                  <div className="firstrowsticky body-inner no-padding table-responsive">
                    <table
                      className="table table-bordered table-striped table-hover mt-1"
                      id="datatable2"
                    >
                      <thead>
                        <tr>
                          <th className="headcolstatic" style={showPrint}>
                            Building Name
                          </th>
                          {/* <th>Door Number</th> */}
                          <th style={showPrint}>Location</th>
                          {myuser.usergroup === "IT Department" ? (
                            <>
                              {" "}
                              <th style={showPrint}>Address</th>
                              <th style={showPrint}>Door No0</th>
                            </>
                          ) : (
                            <>
                              {/* <th>Hike %</th>
                            <th>Stamp Duty</th>
                            <th>Lease Time Period</th> */}
                              <th style={showPrint}>Address</th>
                              <th style={showPrint}>Door No's</th>
                            </>
                          )}

                          {myuser.usergroup !== "Admin" ? (
                            <></>
                          ) : (
                            <>
                              {" "}
                              <th style={showPrint}>Operation</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {currentDatas &&
                          currentDatas.map((Val, idx) => {
                            return (
                              <tr key={idx}>
                                {Val.shopStatus === "Active" ? (
                                  <td className="headcolstatic secondlinebreak1">
                                    {Val.BuildingName}
                                  </td>
                                ) : (
                                  <td
                                    style={{ backgroundColor: "#dda6a6" }}
                                    className="headcolstatic secondlinebreak1"
                                  >
                                    {Val.BuildingName}
                                  </td>
                                )}

                                {/* <td>
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
                              </td> */}
                                <td>{Val.Location}</td>
                                {/* {myuser.usergroup === "IT Department" ||myuser.usergroup === "Manager"? (
                                  <></>
                                ) : (
                                  <>
                                    <td>{Val.hike}</td>
                                  <td>{Val.stampDuty}</td>
                                  <td>{Val.leaseTimePeriod}</td>
                                  </>
                                )} */}

                                <td>{Val.shopAddress}</td>
                                <td>
                                  {isPrinting ? (
                                    Val.shopDoorNo
                                      .map((e) => e.doorNo)
                                      .join(", ")
                                  ) : (
                                    <img
                                      className="img_icon_size "
                                      src={require("../../static/images/info.png")}
                                      alt="shop no."
                                      title={Val.shopDoorNo.map(
                                        (e) => e.doorNo
                                      )}
                                    />
                                  )}
                                </td>
                                {myuser.usergroup === "Admin" ? (
                                  <>
                                    {" "}
                                    <td
                                      className=" text-center
                                    "
                                    >
                                      {Val.shopStatus === "Active" ? (
                                        <>
                                          <img
                                            className=" iconSize"
                                            onClick={() => onEdit(Val)}
                                            src={Edit}
                                            alt="Edit Property"
                                            title="Edit Property"
                                          />
                                          &nbsp;
                                          {Val.shopDoorNo.some(
                                            (shop) => shop.status === "Avaiable"
                                          ) && (
                                            <img
                                              className="iconSize"
                                              onClick={() =>
                                                onDelete(
                                                  Val._id,
                                                  Val.shopDoorNo,
                                                  Val
                                                )
                                              }
                                              src={Deactivate}
                                              alt="Deactivate"
                                              title="Deactivate"
                                            />
                                          )}
                                        </>
                                      ) : (
                                        // <td></td>
                                        <></>
                                      )}
                                    </td>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-lg-1  col-sm-12 col-md-12"></div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6  col-sm-12 col-md-12">
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
                <div className="col-lg-6  col-sm-12 col-md-12">
                  <p
                    className="text-end h6 font-weight-bold"
                    style={{ color: "#095a4a" }}
                  >
                    Active Property: {ActivePCount.length} &nbsp;&nbsp;&nbsp;
                    <span style={{ color: "red" }}>
                      Deactive Property: {DeactivePCount.length}
                    </span>
                  </p>

                  {/* <p
                    className="text-end h6 font-weight-bold"
                    style={{ color: "#095a4a" }}
                  >
                    No. of Property : {particular_org_data.length}
                  </p> */}
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
          <div className="col-lg-10  col-sm-12 col-md-12">
            <div className="ml-4">
              <h4
                style={{
                  color: "white",
                }}
                className="text-center  ml-4"
              >
                Edit Property Details
              </h4>{" "}
            </div>
          </div>
          <div className="col-lg-2  col-sm-12 col-md-12">
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
        <form onSubmit={(e) => onDeactivateall(e)}>
          <Modal.Header className="confirmbox-heading">
            <div className="col-lg-10  col-sm-12 col-md-12">
              <div className="ml-4">
                <h4
                  style={{
                    color: "white",
                  }}
                  className=" text-center "
                >
                  DEACTIVATE
                </h4>
              </div>
            </div>
            <div className="col-lg-2  col-sm-12 col-md-12">
              <button onClick={() => setShow(false)} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>

          <Modal.Body>
            <div className="h5 despace">Reason For Deactivating *</div>
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

      {/* modal for Deactivating the mul Property ending */}
      <Modal show={selectDno} centered>
        <form onSubmit={(e) => onDeactivate(e)}>
          <Modal.Header className="confirmbox-heading">
            <div className="col-lg-10  col-sm-12 col-md-12">
              <div className="ml-1">
                <h4
                  style={{
                    color: "white",
                  }}
                  className="text-center "
                >
                  DEACTIVATE
                </h4>
              </div>
            </div>
            <div className="col-lg-2  col-sm-12 col-md-12">
              <button onClick={handleCloseDno} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>

          <Modal.Body>
            {/* <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> */}
            {dnolen.length > 0 ? (
              <div className="text-dark">Choose Door No for Deactivate</div>
            ) : (
              <></>
            )}
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
            <div className=" despace pt-3">Reason For Deactivating *</div>
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
            <p className="RoomAlreadyExist" style={RoomAlreadyExist}>
              Please Select Any Room
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" id="deactivebtn" type="submit">
              <b>Deactive</b>
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      {/* modal for Deactivating the mul Property ending */}

      {/* modal for displaying door number starting */}

      <Modal show={showDoorNo} centered>
        <Modal.Header className="confirmbox-heading">
          <div className="col-lg-10  col-sm-12 col-md-12">
            <div className="ml-4">
              <h4
                style={{
                  color: "white",
                }}
                className=" text-center "
              >
                DOOR NO.
              </h4>
            </div>
          </div>
          <div className="col-lg-2  col-sm-12 col-md-12">
            <button onClick={() => setShowDoorNo(false)} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>

        <Modal.Body>
          <div className="h5 despace">
            {doorNumber.map((ele) => {
              return (
                <button className="ml-2 doorNoButton mt-2">{ele.doorNo}</button>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
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
  getAllSettings,
  // getDoorNo,
  getParticularProperty,
  AddUserActivity,
})(PropertyDetail);
