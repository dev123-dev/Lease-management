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
    getAllSettings,
    getAllShops,
  } from "../../actions/tenants";
  import Select from "react-select";
  import Pagination from "../layout/Pagination";
  const ContactReport = ({
    auth: { user },
    tenants: { particular_org_data, particular_org_loc },
    deactiveProperty,
    getParticularOrg,
    getAllSettings,
    getParticularProperty,
  }) => {
    // console.log("data", particular_org_data);
    useEffect(() => {
      const myuser = JSON.parse(localStorage.getItem("user"));
  
      fun();
      getParticularOrg({ OrganizationId: user && user.OrganizationId });
      getAllSettings({
        OrganizationId: myuser && myuser.OrganizationId,
        userId: myuser && myuser._id,
      });
    }, []);
  
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
      particular_org_loc[0] &&
        Location.map((ele) => {
          Loc.push({
            label: ele,
            value: ele,
          });
          SetselLoction(Loc);
        });
    };

  
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleUpdateModalOpen = () => setShowUpdateModal(!showUpdateModal);
    const [property, setProperty] = useState([]);
  
  
  
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
   
    const onchangeLocation = (e) => {
      SetLocation(e);
      const OrgainationId_Loc_name = {
        OrganizationId: user && user.OrganizationId,
        LocationName: e.value,
      };
      getParticularProperty(OrgainationId_Loc_name);
    };
  
  
    const [showadd, setShowadd] = useState(false);
  
    //pagination code
    const [currentData, setCurrentData] = useState(1);
    const [dataPerPage] = useState(6);
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
    return (
      <>
        <div className="col mt-sm-4 space ">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
            <div className="row mt-5  ">
              <div className="col-lg-5 mt-3">
                <h2 className="heading_color  headsize  ml-4">Contact Report</h2>
              </div>
              <div className="col-lg-5 mt-3">
                <Select
                  className="dropdown text-left mt-sm-3"
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
              <div className="col-lg-2 text-end mt-sm-5">
                {" "}
               
                <img
                  className="ml-2"
                  style={{ cursor: "pointer" }}
                  height="20px"
                  onClick={() => refresh()}
                  src={require("../../static/images/refresh-icon.png")}
                  alt="Refresh"
                  title="Refresh"
                />
              </div>
            </div>
  
            <div className="container-fluid d-flex align-items-center justify-content-center mt-sm-1 ">
              <div className="col">
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
                          {/* <th>Door Number</th> */}
  
                          <th>Address</th>
                          <th>Location</th>
                          <th> Total Door No</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {currentDatas &&
                          currentDatas.map((Val, idx) => {
                            return (
                              <tr key={idx}>
                                <td className="headcolstatic secondlinebreak1">
                                  {Val.BuildingName}
                                </td>
  
                                <td>{Val.shopAddress}</td>
                                {/* <td title={AddDetail.shopDoorNo}> */}
                                <td>
                                
                                  {Val.Location}
                                </td>
                                <td>
                                  <img
                                    className="img_icon_size log"
                                    src={require("../../static/images/info.png")}
                                    alt="Govt Cards"
                                    title={Val.shopDoorNo.map((e) => e.doorNo)}
                                  />
                                 
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
                      No. of Property : {particular_org_data.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    getParticularProperty,
  })(ContactReport);
  
