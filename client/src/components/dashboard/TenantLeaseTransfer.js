import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { RenewTenantDetailsform, getAllSettings } from "../../actions/tenants";
import Select from "react-select";
import {
  // ParticularTenant,
  getParticularOrg,
  getParticularProperty,
  // getTenantDetails,
  AddUserActivity,
  ParticularTenantFilter,
  ParticularTenantLeaseTransferFilter,
  deactiveTenantsDetails,
  EditTenantLeaseTransferDetails,
} from "../../actions/tenants";
import EditTenantDetails from "./EditTenantDetails";
const TenantLeaseTransfer = ({
  auth: { isAuthenticated, user, users, finalDataRep },
  leaseTransferData,
  ModalClose,
  tenants: { allTenantSetting, particular_org_data, sortleasetransferdetails },
  ParticularTenantLeaseTransferFilter,
  ParticularTenantFilter,
  AddUserActivity,
  getAllSettings,
  EditTenantLeaseTransferDetails,
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));
  const [freshpage, setFreshPage] = useState(true);
  console.log("sortleasetransferdetails", sortleasetransferdetails);

  //   useEffect(() => {
  //     getAllSettings({
  //       OrganizationId: myuser && myuser.OrganizationId,
  //       userId: myuser && myuser._id,
  //     });
  // })
  useEffect(() => {
    // ParticularTenant();
    ParticularTenantLeaseTransferFilter();
    getParticularOrg({ OrganizationId: user && user.OrganizationId });
    // getParticularProperty({ OrganizationId: user && user.OrganizationId });
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }, [freshpage]);
  //propertywise dropdown
  const [PropertyName, SetPropertyName] = useState("");
  const onchangePrperty = (e) => {
    SetPropertyName(e);
    console.log(e);
    ParticularTenantLeaseTransferFilter({
      propertyname: e.label,
    });

    //   SetDoorNumber("");
    //   setselLoction("");
    //   SetTenantName("");
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
      TenantNames.push({
        label: ele.tenantName,
        value: ele._id,
      });
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
  };
  console.log("existingTenantDoorno", existingTenantDoorno);
  const [leaseTranferArr, setLeaseTrasferArr] = useState(
    leaseTransferData.shopDoorNo
  );
  console.log("leaseTranferArr", leaseTranferArr);

  const [selectedDoorNumber, setSelectedDoorNumber] = useState([]);
  //onselect button

  const onSelectChange = (inputuserdata) => {
    console.log("inputuserdata", inputuserdata);
    let temparray = [];
    temparray.push(...selectedDoorNumber, inputuserdata);
    setSelectedDoorNumber(temparray);

    setLeaseTrasferArr(
      leaseTranferArr.filter((x) => x.value !== inputuserdata.value)
    );

    // setFormData({
    //   ...formData,
    //   [inputuserdata.name]: 1,
    // });
  };

  //onremove button
  const onRemoveChange = (Doornumber) => {
    let temparray2 = [];
    temparray2.push(...leaseTranferArr, Doornumber);

    setLeaseTrasferArr(temparray2);
    setSelectedDoorNumber(
      selectedDoorNumber.filter((x) => x.value !== Doornumber.value)
    );
    // setFormData({
    //   ...formData,
    //   [Doornumber.name]: 0,
    // });
  };
  console.log("selectedDoorNumber", selectedDoorNumber);

  //validation for select
  const [errors, setErrors] = useState({
    tenantChecker: false,
    tenantErrorStyle: {},
  });
  const { tenantChecker, tenantErrorStyle } = errors;
  const checkError = () => {
    if (!tenantChecker) {
      setErrors({
        ...errors,
        tenantErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    // e.preventDefault();
    if (checkError() && selectedDoorNumber && selectedDoorNumber.length > 0) {
      const finalData = {
        OrganizationName: user.OrganizationName,
        OrganizationId: user.OrganizationId,
        fromId: leaseTransferData._id,
        fromTenantName: leaseTransferData.tenantName,
        toId:
          sortleasetransferdetails &&
          sortleasetransferdetails[0] &&
          sortleasetransferdetails[0]._id,
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
        expireAt: new Date().getTime() + 80,
      };
      AddUserActivity(ActivityDetail);
      // console.log("finalData submitttttttt", finalData);
      EditTenantLeaseTransferDetails(finalData);
      ModalClose();
      ParticularTenantFilter("");
      setExistingTenantDoorno(false);
    }
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <section>
        <div className="row ">
          <div className="col-lg-3">From :</div>
          <div className="col-lg-9">{leaseTransferData.tenantName}</div>
          <div className="col-lg-3 py-3">
            <label
              // className="control-label"
              style={tenantErrorStyle}
            >
              To<span style={{ color: "red" }}>*</span>
            </label>
          </div>
          <div className="col-lg-9">
            <div className="row ">
              <div className="col-lg-6 col-sm-12 col-md-6">
                <Select
                  className="dropdown text-left mt-sm-3"
                  placeholder="Property"
                  name="PropertyName"
                  options={propertyname}
                  value={PropertyName}
                  onChange={(e) => onchangePrperty(e)}
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
          {existingTenantDoorno ? (
            <>
              <div
                className="col-lg-3 font-weight-bold"
                style={{ color: "#095a4a" }}
              >
                Existing Rooms of{" "}
                {sortleasetransferdetails &&
                  sortleasetransferdetails[0] &&
                  sortleasetransferdetails[0].tenantName}{" "}
                :
              </div>
              <div className="col-lg-9">
                {sortleasetransferdetails &&
                  sortleasetransferdetails[0] &&
                  sortleasetransferdetails[0].shopDoorNo.map((ele) => {
                    return (
                      <span
                        className=" font-weight-bold"
                        style={{ color: "#095a4a" }}
                      >
                        {ele.value}&nbsp;,
                      </span>
                    );
                  })}
              </div>
            </>
          ) : (
            <></>
          )}

          <div className="row ">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div
                className="h4 "
                style={{ fontFamily: "Serif", color: "#095a4a" }}
              >
                Door No:
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
                  style={{ fontFamily: "Serif", color: "#095a4a" }}
                >
                  Transfer:
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
                  style={{ fontFamily: "Serif", color: "#095a4a" }}
                >
                  Transferred:
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

          <div className="float-right  text-right d-flex justify-content-end">
            {/* <button className="rewbtn float-right w-25" onClick={onSubmit}>
              Transfer
            </button> */}
          </div>
        </div>
      </section>
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
