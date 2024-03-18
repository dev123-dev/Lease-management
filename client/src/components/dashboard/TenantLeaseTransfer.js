import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import {
  // ParticularTenant,
  getParticularOrg,

  // getTenantDetails,
  AddUserActivity,
  ParticularTenantFilter,
  ParticularTenantLeaseTransferFilter,
  EditTenantLeaseTransferDetails,
} from "../../actions/tenants";

const TenantLeaseTransfer = ({
  auth: { isAuthenticated, user, users },
  leaseTransferData,
  ModalClose,
  sendDataToParent,
  tenants: { particular_org_data, sortleasetransferdetails},
  ParticularTenantLeaseTransferFilter,
  ParticularTenantFilter,
  AddUserActivity,

  EditTenantLeaseTransferDetails,
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));
  const [freshpage, setFreshPage] = useState(true);

  useEffect(() => {
    ParticularTenantLeaseTransferFilter();
    getParticularOrg({ OrganizationId: user && user.OrganizationId });
  }, [freshpage]);
  //propertywise dropdown
  const [PropertyName, SetPropertyName] = useState("");
  const onchangeProperty = (e) => {
    SetPropertyName(e);

    ParticularTenantLeaseTransferFilter({
      propertyname: e.label,
    });

    //   SetDoorNumber("");
    //   setselLoction("");
    SetTenantName("");
  };

  //propertywise dropdown
  const propertyname = [];
  particular_org_data &&
    particular_org_data.map((ele) =>
      propertyname.push({
        label: ele.BuildingName,
        value: ele.BuildingId,
      })
    );

  // tenant dropdown

  const [existingTenantDoorno, setExistingTenantDoorno] = useState(false);
  const [tenantName, SetTenantName] = useState("");
  let TenantNames = [];

  sortleasetransferdetails &&
    sortleasetransferdetails.map((ele) => {
      if (ele._id !== leaseTransferData._id) {
      TenantNames.push({
        label: ele.tenantName,
        value: ele._id,
      });
    }
    });
  const onchangeTenantNames = (e) => {
    setErrors({
      ...errors,
      tenantChecker: true,
      tenantErrorStyle: { color: "#000" },
    });
    SetTenantName(e);
    ParticularTenantLeaseTransferFilter({
      tenantName: e.value,
    });
    setExistingTenantDoorno(true);
    // SetPropertyName("");
  };

  const [leaseTranferArr, setLeaseTrasferArr] = useState(
    leaseTransferData.shopDoorNo
  );

  const [selectedDoorNumber, setSelectedDoorNumber] = useState([]);
  //onselect button

  const onSelectChange = (inputuserdata) => {
    let temparray = [];
    temparray.push(...selectedDoorNumber, inputuserdata);
    setSelectedDoorNumber(temparray);

    setLeaseTrasferArr(
      leaseTranferArr.filter((x) => x.value !== inputuserdata.value)
    );
    setErrors({
      ...errors,
      DoorChecker: true,
      DoorErrorStyle: { color: "#000" },
    });
  };

  //onremove button
  const onRemoveChange = (Doornumber) => {
    setErrors({
      ...errors,
      DoorChecker: false,
      DoorErrorStyle: { color: "#F00" },
    });
    let temparray2 = [];
    temparray2.push(...leaseTranferArr, Doornumber);

    setLeaseTrasferArr(temparray2);
    setSelectedDoorNumber(
      selectedDoorNumber.filter((x) => x.value !== Doornumber.value)
    );
  };

  //validation for select
  const [errors, setErrors] = useState({
    tenantChecker: false,
    tenantErrorStyle: {},
    DoorChecker: false,
    DoorErrorStyle: {},
  });
  const { tenantChecker, tenantErrorStyle, DoorErrorStyle, DoorChecker } =
    errors;
  const checkError = () => {
    if (!tenantChecker) {
      setErrors({
        ...errors,
        tenantErrorStyle: { color: "#F00" },
      });
      return false;
    }
    if (!DoorChecker) {
      setErrors({
        ...errors,
        DoorErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };
  const [show, setShow] = useState(false);

  const onSubmit = () => {
    if (checkError() && selectedDoorNumber && selectedDoorNumber.length > 0) {
      setShow(true);
    }
  };

  const onTransfer = () => {
    const finalData = {
      OrganizationName: user.OrganizationName,
      OrganizationId: user.OrganizationId,
      fromId: leaseTransferData._id,
      fromTenantName: leaseTransferData.tenantName,
      toId:
        sortleasetransferdetails &&
        sortleasetransferdetails[0] &&
        sortleasetransferdetails[0]._id,
      toTenantName:
        sortleasetransferdetails &&
        sortleasetransferdetails[0] &&
        sortleasetransferdetails[0].tenantName,
      Dno: leaseTransferData.shopDoorNo,
      transferShoopDoorNo: selectedDoorNumber,
    };
    const ActivityDetail = {
      userId: user && user._id,
      userName: user && user.username,
      Menu: "Tenant",
      Operation: "Lease Transfer",
      Name: leaseTransferData.tenantName,
      NameId: leaseTransferData._id,
      OrganizationId: user.OrganizationId,
      Dno: selectedDoorNumber,
      Remarks:
        sortleasetransferdetails &&
        sortleasetransferdetails[0] &&
        sortleasetransferdetails[0].tenantName,
      expireAt: new Date().getTime() + 80,
    };
    AddUserActivity(ActivityDetail);
    EditTenantLeaseTransferDetails(finalData);
    ModalClose();
    ParticularTenantFilter("");
    setExistingTenantDoorno(false);
    setShow(false);

    sendDataBackToParent();
  };

  //Send status and transfer to fields back to tenant_Details page
  var transferredTo =
    sortleasetransferdetails &&
    sortleasetransferdetails[0] &&
    sortleasetransferdetails[0].tenantName;
  const sendDataBackToParent = () => {
    const dataToSendBack = "true";
    const transferTo = transferredTo;
    sendDataToParent(dataToSendBack, transferTo);
  };

  const onBack = () => {
    setShow(false);
  };

  const [leaseStartDate, setLeaseStartDate] = useState("");
  const [leaseEndDate, setLeaseEndDate] = useState("");

  // Function to format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // Function to update lease start and end dates based on dropdown change
  useEffect(() => {
    if (tenantName) {
      if (sortleasetransferdetails && sortleasetransferdetails.length > 0) {
        const leaseStart = sortleasetransferdetails[0].tenantLeaseStartDate;
        const leaseEnd = sortleasetransferdetails[0].tenantLeaseEndDate;
        setLeaseStartDate(formatDate(leaseStart));
        setLeaseEndDate(formatDate(leaseEnd));
      }
    } else {
      setLeaseStartDate("");
      setLeaseEndDate("");
    }
  }, [sortleasetransferdetails, tenantName]);

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <section>
        <div className="row">
          <div className="col-lg-12 d-flex align-items-center">

       
<div className="col-lg-3">
<label >From :</label>
</div>
<div className="col-lg-9">
{leaseTransferData.tenantName}
</div>
</div>
<div className="col-lg-12 d-flex align-items-center">
<div className="col-lg-3">
<label
              // className="control-label"
              style={tenantErrorStyle}
            >
              To<span style={{ color: "red" }}>* </span>:
            </label>
</div>
<div className="col-lg-9">
<div className="row ">
              <div className="col-lg-6 col-sm-12 col-md-6 mx-0 px-0">
                <Select
                  className="dropdown text-left mt-sm-3"
                  placeholder="Property"
                  name="PropertyName"
                  options={propertyname}
                  value={PropertyName}
                  onChange={(e) => onchangeProperty(e)}
                ></Select>
              </div>
              <div className="col-lg-6 col-sm-12 col-md-6">
                <Select
                  className="dropdown text-left mt-sm-3"
                  placeholder="Name"
                  name="tenantName"
                  options={TenantNames}
                  value={tenantName}
                  onChange={(e) => onchangeTenantNames(e)}
                ></Select>
              </div>
            </div>
</div>
</div>






{existingTenantDoorno ? (
            <>
<div className="containerBox ">
<div className="row ">
<h4 className="my-0 py-0 " style={{ color: "#095a4a" }}>Existing Lease Details of    <span className="font-weight-bold">
  {sortleasetransferdetails &&
                  sortleasetransferdetails[0] &&
                  sortleasetransferdetails[0].tenantName}  </span> :
                  </h4>
<div className="col-lg-6 ">
                <span
                  // className=" font-weight-bold"
                  // style={{ color: "#095a4a" }}
                >
                  Lease Start Date :
                </span>
                &nbsp;
                <span 
               >{leaseStartDate}</span>
                &nbsp;&nbsp;&nbsp;
                </div>
                <div className="col-lg-6 ">
                <span
                  // className=" font-weight-bold"
                  // style={{ color: "#095a4a" }}
                >
                  Lease End Date :
                </span>
                &nbsp;
                <span >{leaseEndDate}</span>
              </div>
              <div
                className="col-lg-12  mt-2"
                // style={{ color: "#095a4a" }}
              >
                Existing Rooms of{" "}
                {sortleasetransferdetails &&
                  sortleasetransferdetails[0] &&
                  sortleasetransferdetails[0].tenantName}{" "}
                :
              </div>
              <div className="col-lg-12">
                {tenantName ? (
                  <>
                    {" "}
                    {sortleasetransferdetails &&
                      sortleasetransferdetails[0] &&
                      sortleasetransferdetails[0].shopDoorNo.map((ele) => {
                        return (
                          <span 
                          // style={{ color: "#095a4a" }}
                          >
                            {ele.value}&nbsp;,
                          </span>
                        );
                      })}
                  </>
                ) : (
                  <></>
                )}
              </div>

</div>



          
</div>
              
            </>
          ) : (
            <></>
          )}
















<div>
          <div className="row ">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="h4 " style={DoorErrorStyle}>
                Door No* :
              </div>
            </div>
          </div>
          <div className="row mx-0 px-0 ">
            {/* {isavail && isavail.length !== 0 ? ( */}
            <>
              <div
                className="col-lg-6 col-md-12 col-sm-12 card-new button_Door bg-white border-dark border-right"
                style={{ border: "transparent", minHeight: "90px" }}
              >
                <div
                  className="h4 "
                  style={{  color: "#095a4a" }}
                >
                  Transfer :
                </div>{" "}
                <br></br>
                {leaseTranferArr &&
                  leaseTranferArr.map((DoorNumber, idx) => {
                    return (
                      <button
                        key={idx}
                        type="button"
                        className="btn btn-success doorbtn"
                        onClick={() => onSelectChange(DoorNumber)}
                      >
                        {DoorNumber.value}
                        <span className="ml-4">
                          <b className="text-dark ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="16"
                              fill="currentColor"
                              class="bi bi-plus-square-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                            </svg>
                          </b>
                        </span>
                      </button>
                    );
                  })}
              </div>

              <div
                className=" col-lg-6 col-md-12  card-new  bg-white"
                style={{ border: "transparent", minHeight: "80px" }}
              >
                <div
                  className="h4"
                  style={{  color: "#095a4a" }}
                >
                  Transferred :
                </div>
                <br></br>
                {selectedDoorNumber &&
                  selectedDoorNumber.length > 0 &&
                  selectedDoorNumber.map((Doornumber, idx) => {
                    return (
                      <button
                        key={idx}
                        type="button"
                        className="btn  doorbtn"
                        onClick={() => onRemoveChange(Doornumber)}
                      >
                        {Doornumber.value}
                        <span className="ml-4">
                          <b className="text-light">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="16"
                              fill="currentColor"
                              class="bi bi-dash-square-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2.5 7.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z" />
                            </svg>
                          </b>
                        </span>
                      </button>
                    );
                  })}
              </div>
            </>
          </div>
   </div>
















<div className="float-right  text-right d-flex justify-content-end">
            <button className="rewbtn float-right w-25" onClick={onSubmit}>
              Transfer
            </button>
          </div>




        </div>
      </section>





      
      <Modal
        show={show}
        backdrop="static"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="confirmboxleasetransfer">
          <div className="col-lg-10 col-sm-10 col-md-10 ">
            <h3
              style={{
                color: "white",
              }}
              className=" text-center "
            >
              Confirmation
            </h3>
          </div>

          <div className="col-lg-2  col-sm-12 col-md-12 ">
            <button onClick={onBack} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px", marginLeft: "-15px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to transfer Lease to{" "}
          <span className=" font-weight-bold" style={{ color: "#095a4a" }}>
            {sortleasetransferdetails &&
              sortleasetransferdetails[0] &&
              sortleasetransferdetails[0].tenantName}
          </span>{" "}
          with Lease start Date :
          <span className=" font-weight-bold" style={{ color: "#095a4a" }}>
            {leaseStartDate}
          </span>{" "}
          and Lease end Date :
          <span className=" font-weight-bold" style={{ color: "#095a4a" }}>
            {leaseEndDate}
          </span>{" "}
          ?
          <div className="float-right  text-right d-flex justify-content-end mt-4 pt-4">
            <button className="rewbtn float-right " onClick={onBack}>
              Cancel
            </button>
            &emsp;&nbsp;
            <button className="rewbtn float-right " onClick={onTransfer}>
              Confirm
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  ParticularTenantLeaseTransferFilter,
  getParticularOrg,
  EditTenantLeaseTransferDetails,
  ParticularTenantFilter,
  AddUserActivity,
})(TenantLeaseTransfer);
