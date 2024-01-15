import React, { useState, Fragment, useEffect, useRef } from "react";

import { connect } from "react-redux";
import {
  // ParticularTenant,
  getParticularOrg,
  getParticularProperty,
  getTenantDetails,
  ParticularTenantFilter,
} from "../../actions/tenants";

import Pagination from "../layout/Pagination";

const ContactReport = ({
  auth: { user },
  tenants: { particular_org_data, sortetenantdetails, particular_org_loc },

  getParticularOrg,
  getParticularProperty,
  getTenantDetails,
  deactiveTenantsDetails,
}) => {
  const [freshpage, setFreshPage] = useState(true);
  const checkboxRef = useRef(null);
  const myuser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    ParticularTenantFilter();
    getParticularOrg({ OrganizationId: user && user.OrganizationId });
    getParticularProperty({ OrganizationId: user && user.OrganizationId });

    fun();
  }, [freshpage]);

  const [doorNumber, SetDoorNumber] = useState("");
  const [tenantName, SetTenantName] = useState("");
  const [PropertyName, SetPropertyName] = useState("");
  const [sellocation, setselLoction] = useState(null);
  const [location, setlocation] = useState([]);
  const Loc = [];
  const { Location } = particular_org_loc[0];

  const fun = () => {
    getParticularOrg({ OrganizationId: user && user.OrganizationId });
    particular_org_loc[0] &&
      Location.map((ele) => {
        Loc.push({
          label: ele,
          value: ele,
        });
        setlocation(Loc);
      });
  };

  // Modal for Deactivation
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectDno, SetDoornumber] = useState();
  const handleShowDno = () => SetDoornumber(false);
  const [DeactiveThisBiuldingID, setDeactiveThisBiuldingID] = useState("");
  const handleCloseDno = () => {
    SetDoornumber(false);
    setCheckData([]);
  };

  const [tId, setId] = useState("");
  const [dno, SetDno] = useState([]);
  const onDelete = (id, Dno, Val) => {
    setId(id);

    setDeactiveThisBiuldingID(Val.BuildingId);
    if (Dno.length >= 1) {
      SetDno(Dno);
      SetDoornumber(true);
    } else {
      SetDno(Dno);
      handleShow();
    }
  };
  // Edit model state
  const [EditTenant, setEditTenant] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const onEdit = (val) => {
    getTenantDetails(val);
    setEditTenant(val);
  };

  // const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const handleOpen = () => setShowEditModal(true);

  const [formData, setFormData] = useState({
    deactive_reason: "",
    DoorNumber: "",
    isSubmitted: false,
  });
  const { deactive_reason } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [selectedDoorNumber, SetSelectedDoorNumber] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const [checkData, setCheckData] = useState([]);
  const HandelCheck = (e) => {
    var updatedlist = [...checkData];
    if (e.target.checked) {
      updatedlist = [...checkData, { label: e.target.value }];
    } else {
      updatedlist.splice(checkData.indexOf(e.target.value), 1);
    }
    setCheckData(updatedlist);
  };

  const onchangeLocation = (loc) => {
    setselLoction(loc);
    ParticularTenantFilter({
      LocationName: loc.label,
    });
    SetDoorNumber("");
  };

  const onDeactivateall = (e) => {
    e.preventDefault();
    SetDoornumber(false);
    const reason = {
      OrganizationId: user && user.OrganizationId,
      Dno: checkData.length !== 0 ? checkData : dno,
      deactive_reason: deactive_reason,
      tid: tId,
      isSubmitted: "true",
      BiuldingID: DeactiveThisBiuldingID,
    };

    deactiveTenantsDetails(reason);
    handleClose();
    setFreshPage(!freshpage);
    setCheckData([]);
  };
  const [Error, setError] = useState("");
  const onDeactivate = (e) => {
    e.preventDefault();
    if (checkData.length == 0) {
      setError("Please Select DoorNumber");
      //alert();
    } else {
      SetDoornumber(false);
      const reason = {
        OrganizationId: user && user.OrganizationId,
        Dno: checkData.length !== 0 ? checkData : dno,
        deactive_reason: deactive_reason,
        tid: tId,
        isSubmitted: "true",
        BiuldingID: DeactiveThisBiuldingID,
      };

      deactiveTenantsDetails(reason);
      handleClose();
      setFreshPage(!freshpage);
      setCheckData([]);
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
    sortetenantdetails &&
    sortetenantdetails.slice(indexOfFirstData, indexOfLastData);
  const paginate = (nmbr) => {
    //nmbr is page  number
    setCurrentData(nmbr);
  };
  const refresh = () => {
    // ParticularTenant("");
    ParticularTenantFilter("");
    getParticularOrg("");
    getParticularProperty("");
    fun();
    SetDoorNumber("");
    setselLoction(null);
    SetTenantName("");
    SetPropertyName("");
  };

  const onchangeDoorNumberChange = (e) => {
    SetDoorNumber(e);

    ParticularTenantFilter({
      // LocationName: sellocation,
      DoorNumber: e.value,
    });
    setselLoction(null);
    SetTenantName("");
    SetPropertyName("");
  };

  //propertywise

  const onchangePrperty = (e) => {
    SetPropertyName(e);
    console.log(e);
    ParticularTenantFilter({
      propertyname: e.label,
    });

    SetDoorNumber("");
    setselLoction("");
    SetTenantName("");
  };

  //namewise

  const onchangeTenantNames = (e) => {
    SetTenantName(e);
    ParticularTenantFilter({
      tenantName: e.value,
    });
    SetPropertyName("");
    SetDoorNumber("");
    setselLoction("");
  };

  //propertywise
  const propertyname = [];
  particular_org_data &&
    particular_org_data.map((ele) =>
      propertyname.push({
        label: ele.BuildingName,
        value: ele.BuildingId,
      })
    );
  let Dno = [];
  particular_org_data &&
    particular_org_data.map(
      (ele) =>
        ele.shopDoorNo &&
        ele.shopDoorNo.map((dno) =>
          Dno.push({
            label: dno.doorNo,
            value: dno.doorNo,
          })
        )
    );
  let TenantNames = [];
  let cntDeActiveTenant = 0;
  sortetenantdetails &&
    sortetenantdetails.map((ele) => {
      if (ele.tenantstatus !== "Active") cntDeActiveTenant++;
      TenantNames.push({
        label: ele.tenantName,
        value: ele._id,
      });
    });
  console.log("currentDatas", currentDatas);
  return (
    <>
      <div className="col mt-sm-4 space ">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
          <div className="row mt-5  ">
            <div className="col-lg-5 mt-3">
              <h2 className="heading_color  headsize  ml-4">Contact Report</h2>
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
                          Tenant Name
                        </th>
                        {/* <th>Door Number</th> */}
                        <th>Building Name</th>
                        <th>Door No</th>
                        <th> Location</th>
                        <th>Rent Amount</th>
                        <th>Phone No</th>
                        <th>Pan No</th>
                        <th>Aadhaar no</th>
                        <th>Firm Name</th>
                        <th>leaseEndDate</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {currentDatas &&
                        currentDatas.map((Val, idx) => {
                          return (
                            <tr key={idx}>
                              <td className="headcolstatic secondlinebreak1">
                                {Val.tenantName}
                              </td>
                              <td>{Val.BuildingName}</td>
                              <td>
                                <img
                                  className="img_icon_size log"
                                  src={require("../../static/images/info.png")}
                                  alt="Govt Cards"
                                  title={Val.shopDoorNo.map((e) => e.value)}
                                />
                              </td>
                              <td>{Val.Location}</td>
                              <td>{Val.tenantRentAmount}</td>
                              <td>{Val.tenantPhone}</td>
                              <td>{Val.tenantPanNo}</td>
                              <td>{Val.tenantAdharNo}</td>
                              <td>{Val.tenantFirmName}</td>
                              {/* <td title={AddDetail.shopDoorNo}> */}
                              <td>{Val.tenantLeaseEndDate}</td>
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
                  {sortetenantdetails && sortetenantdetails.length !== 0 ? (
                    <Pagination
                      dataPerPage={dataPerPage}
                      totalData={sortetenantdetails.length}
                      paginate={paginate}
                      currentPage={currentData}
                    />
                  ) : (
                    <Fragment />
                  )}
                </div>
                <div className="col-lg-6">
                  <p className="text-end h6">
                    No. of Property : {sortetenantdetails.length}
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
  //getAllShops,
  // deactiveProperty,
  getParticularOrg,
  //getAllSettings,
  getParticularProperty,
  getTenantDetails,
})(ContactReport);
