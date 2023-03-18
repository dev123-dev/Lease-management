import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  getAllTenants,
  getParticularProperty,
  getParticularTenantSetting,
  tenantsDetailsHistory,
  UpdateTenantsDetails,
} from "../../actions/tenants";
import Select from "react-select";
import tenants from "../../reducers/tenants";
const EditTenantDetails = ({
  auth: { isAuthenticated, user, users },
  tenants: { particular_org_data, get_Particular_org_Tenantsetting },
  tenantsdetails,
  UpdateTenantsDetails,
  setShowEditModal,
  setFreshPage,
  freshpage,
  getAllTenants,
  getParticularTenantSetting,
  getParticularProperty,
}) => {
  useEffect(() => {
    getParticularProperty({ OrganizationId: user.OrganizationId });
    getParticularTenantSetting({
      OrganizationId: user && user.OrganizationId,
    });
    getAllTenants();
  }, []);

  // building name start
  const [buildingData, getbuildingData] = useState();
  const [buildingId, setBuildingID] = useState();
  const [buildingName, setBuildingName] = useState();

  const allBuildingNames = [];
  particular_org_data.map((buildingData) =>
    allBuildingNames.push({
      buildingId: buildingData._id,
      label: buildingData.buildingName,
    })
  );

  const [orgname, setOrgname] = useState(
    tenantsdetails
      ? allBuildingNames &&
          allBuildingNames.filter(
            (x) => x.label === tenantsdetails.BuildingName
          )[0]
      : ""
  );

  const [DnoList, setDnoList] = useState([]);
  // if (DnoList && particular_org_data) {
  //   let temp = []; //here we are adding blank arrray bcz to refresh everytime when new name is selected
  //   particular_org_data &&
  //     particular_org_data.map((ele) => {
  //       console.log("=", tenantsdetails.BuildingId, "===", ele._id);
  //       if (tenantsdetails.BuildingId === ele._id) {
  //         SetLocList(ele.Location);
  //         ele.shopDoorNo.map((doornumber) => {
  //           temp.push({
  //             label: doornumber,
  //             value: doornumber,
  //           });
  //         });
  //       }
  //       setDnoList(temp);
  //     });
  // }
  const [LocList, SetLocList] = useState([]);

  const LocName = [];
  particular_org_data.map((loc) => {
    LocName.push({
      label: loc.Location,
      value: loc._id,
    });
  });

  const onBuildingChange = (e) => {
    setBuildingID(e.value);
    setBuildingName(e.label);
    let temp = []; //here we are adding blank arrray bcz to refresh everytime when new name is selected
    particular_org_data &&
      particular_org_data.map((ele) => {
        if (e.buildingId === ele._id) {
          SetLocList(ele.Location);
          ele.shopDoorNo.map((doornumber) => {
            temp.push({
              label: doornumber,
              value: doornumber,
            });
          });
        }
        setDnoList(temp);
      });

    getbuildingData(e);
    setBuildingID(e.buildingId ? e.buildingId : null);
    setBuildingName(e.label ? e.label : "");
  };

  // location listing end

  const PaymentMethods = [
    { value: "Cash", label: "Cash" },
    { value: "Cheque", label: "Cheque" },
  ];
  const [showHide, setShowHide] = useState({
    showChequenoSection:
      tenants && tenants.tenantPaymentMode === "Cheque" ? true : false,
    showChequenoSection: false,
  });
  const { showChequenoSection } = showHide;
  const [startSelectedDate, setStartDate] = useState(tenants.tenantchequeDate);
  const onDateChange = (e) => {
    setStartDate(e.target.value);
  };
  const onPaymentModeChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        tenantPaymentMode: e,
      });
    }
    if (e.value === "Cheque") {
      setShowHide({
        ...showHide,
        showChequenoSection: true,
      });
    } else {
      setShowHide({
        ...showHide,
        showChequenoSection: false,
      });
    }
  };
  const [formData, setFormData] = useState({
    isSubmitted: false,
    BuildingName: tenantsdetails.BuildingName,
    BuildingId: tenantsdetails.BuildingId,
    tenantId: tenantsdetails._id,
    tenantLocation: tenantsdetails.Location,
    tenantDoorNo: tenantsdetails.shopDoorNo,
    tenantFileNo: tenantsdetails.tenantFileNo,
    tenantRentAmount: tenantsdetails.tenantRentAmount,
    tenantName: tenantsdetails.tenantName,
    tenantPhone: tenantsdetails.tenantPhone,
    tenantFirmName: tenantsdetails.tenantFirmName,
    tenantAddr: tenantsdetails.tenantAddr,
    tenantAdharNo: tenantsdetails.tenantAdharNo,
    tenantPanNo: tenantsdetails.tenantPanNo,
    tenantDepositAmt: tenantsdetails.tenantDepositAmt,
    tenantBankName: tenantsdetails.tenantBankName,
    tenantChequenoOrDdno: tenantsdetails.tenantChequenoOrDdno
      ? tenantsdetails.tenantChequenoOrDdno
      : "null",
    startSelectedDate: tenantsdetails.tenantchequeDate,
    tenantLeaseStartDate: tenantsdetails.tenantLeaseStartDate,
    tenantLeaseEndDate: tenantsdetails.tenantLeaseEndDate,
    AgreementStatus: tenantsdetails.AgreementStatus,
    generatordepoAmt: tenantsdetails.generatordepoAmt,
    tenantPaymentMode:
      tenantsdetails && tenantsdetails.tenantPaymentMode
        ? {
            value: tenantsdetails.tenantPaymentMode,
            label: tenantsdetails.tenantPaymentMode,
          }
        : "null",
  });
  const {
    tenantId,
    BuildingName,
    tenantLocation,
    tenantFileNo,
    tenantDoorNo,
    tenantName,
    tenantPhone,
    tenantFirmName,
    tenantAddr,
    tenantAdharNo,
    tenantPanNo,
    tenantDepositAmt,
    tenantPaymentMode,
    tenantChequenoOrDdno,
    tenantBankName,
    generatordepoAmt,
    tenantchequeDate,
    tenantRentAmount,
    tenantLeaseStartDate,
    tenantLeaseEndDate,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [doorno, setdno] = useState([]);
  const onchangeDoor = (e) => {
    setdno(e);
  };
  let doorNos = [];
  if (
    doorno.length < 1 &&
    tenantsdetails &&
    tenantsdetails.shopDoorNo.length > 0 &&
    DnoList.length > 0
  ) {
    tenantsdetails &&
      DnoList &&
      DnoList.map((x) => {
        tenantsdetails.shopDoorNo.map((ele) => {
          if (x.value === ele) doorNos.push(x);
        });
      });
    setdno(doorNos);
  }

  const onDateChangeEntry = (e) => {
    setEntryDate(e.target.value);
    var newDate = e.target.value;
    var calDate = new Date(newDate);

    var leaseMonth = get_Particular_org_Tenantsetting[0].leaseTimePeriod;

    //Calculating lease end date
    var dateData = calDate.getDate();
    calDate.setMonth(calDate.getMonth() + +leaseMonth);
    if (calDate.getDate() !== dateData) {
      calDate.setDate(0);
    }
    var dd1 = calDate.getDate();
    var mm2 = calDate.getMonth() + 1;
    var yyyy1 = calDate.getFullYear();
    if (dd1 < 10) {
      dd1 = "0" + dd1;
    }

    if (mm2 < 10) {
      mm2 = "0" + mm2;
    }
    var leaseEndDate = dd1 + "-" + mm2 + "-" + yyyy1;
    setLeaseEndDate(leaseEndDate);
    var newLeaseEndDate = yyyy1 + "-" + mm2 + "-" + dd1;
    setNewLeaseEndDate(newLeaseEndDate);
  };

  const [entryDate, setEntryDate] = useState(tenants.tenantLeaseStartDate);
  const [leaseEndDate, setLeaseEndDate] = useState(tenants.tenantLeaseEndDate);
  const [newLeaseEndDate, setNewLeaseEndDate] = useState("null");

  //For setting mindate as todays date
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  var todayDateymd = yyyy + "-" + mm + "-" + dd;

  //For setting mindate as todays date
  const onUpdate = (tenantsdetails, idx, e) => {
    e.preventDefault();
    const finalData = {
      recordId: tenantId,
      OrganizationId: user && user.OrganizationId,
      OrganizationName: user && user.OrganizationName,
      BuildingName: buildingName,
      tenantDoorNo: doorno,
      tenantFileNo: tenantFileNo,
      tenantRentAmount: tenantRentAmount,
      tenantName: tenantName,
      tenantPhone: tenantPhone,
      tenantFirmName: tenantFirmName,
      tenantAddr: tenantAddr,
      tenantAdharNo: tenantAdharNo,
      tenantPanNo: tenantPanNo,
      tenantDepositAmt: tenantDepositAmt,
      tenantBankName: tenantBankName,
      tenantChequenoOrDdno: tenantChequenoOrDdno,
      tenantPaymentMode: tenantPaymentMode.value,
      tenantchequeDate: startSelectedDate,
      tenantLeaseStartDate: entryDate,
      tenantLeaseEndDate: newLeaseEndDate,
      generatordepoAmt: generatordepoAmt,
      tenantEnteredBy: user && user._id,
      tenantDate: todayDateymd,
    };
    console.log(finalData);
    // UpdateTenantsDetails(finalData);
    // setFreshPage(!freshpage);

    // const historyData = {
    //   tdId: tenantId,
    //   //tenantDoorNo: tenantsdetails.shopDoorNo,
    //   //  tenantFileNo: tenantsdetails.tenantFileNo,
    //   thRentAmount: tenantsdetails.tenantRentAmount,
    //   thName: tenantsdetails.tenantName,
    //   thPhone: tenantsdetails.tenantPhone,
    //   thFirmName: tenantsdetails.tenantFirmName,
    //   thAddr: tenantsdetails.tenantAddr,
    //   thAdharNo: tenantsdetails.tenantAdharNo,
    //   thPanNo: tenantsdetails.tenantPanNo,
    //   thDepositAmt: tenantsdetails.tenantDepositAmt,
    //   thPaymentMode: tenantsdetails.tenantPaymentMode,
    //   thBankName: tenantsdetails.tenantBankName,
    //   thChequenoOrDdno: tenantsdetails.tenantChequenoOrDdno,
    //   thgeneratordepoAmt: tenantsdetails.generatordepoAmt,
    //   thStatus: "Edit",
    //   tenantBankName: tenantsdetails.tenantBankName,
    //   tenantChequenoOrDdno: tenants.tenantChequenoOrDdno,
    //   tenantPaymentMode: "",
    //   tenantchequeDate: tenantsdetails.startSelectedDate
    //     ? tenantsdetails.startSelectedDate
    //     : "",
    //   thLeaseStartDate: tenantsdetails.tenantLeaseStartDate,
    //   thLeaseEndDate: tenantsdetails.tenantLeaseEndDate,
    //   AgreementStatus: tenantsdetails.AgreementStatus,
    //   thEnteredBy: user && user._id,
    //   thDate: todayDateymd,
    // };

    // tenantsDetailsHistory(historyData);
    setShowEditModal(false);
  };
  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <form onSubmit={(e) => onUpdate(e)}>
        <div className="conatiner-fluid ">
          <div className="row">
            <div className="col-lg-4">
              <label className="ml-2">Property Name*:</label>
              <Select
                name="Property name"
                options={allBuildingNames}
                value={orgname}
                onChange={(e) => onBuildingChange(e)}
                required
              ></Select>
            </div>
            <div className="col-lg-4">
              <label className="ml-2">Door No*: </label>
              <Select
                name="doorno"
                options={DnoList}
                value={doorno}
                onChange={(e) => onchangeDoor(e)}
                isMulti={true}
                required
              ></Select>
              <br></br>
            </div>
            <div className="col-lg-4">
              <label className="ml-2">Location*: </label>
              <input
                type="text"
                placeholder={tenantLocation}
                className="form-control"
                readOnly
              ></input>
              <br></br>
            </div>
            <div className="col-lg-4">
              <label className="ml-2">File No*: </label>
              <input
                type="text"
                name="tenantFileNo"
                placeholder="FileNo"
                value={tenantFileNo}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="col-lg-4">
              <label className="ml-2">Tenant Name*: </label>
              <input
                type="text"
                name="tenantName"
                placeholder="Name"
                value={tenantName}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="col-lg-4 ">
              <label>Phone No:</label>
              <input
                type="number"
                name="tenantPhone"
                value={tenantPhone}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
              />
              <br></br>
            </div>
            <div className="col-lg-4">
              <label>Firm Name: </label>
              <input
                type="text"
                name="tenantFirmName"
                value={tenantFirmName}
                className="form-control"
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="col-lg-4 ">
              <label>Adhaar No:</label>
              <input
                type="number"
                name="tenantAdharNo"
                value={tenantAdharNo}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
              />
            </div>

            <div className="col-lg-4">
              <label className="ml-2"> Pan Number: </label>
              <input
                type="text"
                name="tenantPanNo"
                placeholder="PanNo"
                value={tenantPanNo}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
              />{" "}
              <br></br>
            </div>
            <div className="col-lg-4">
              <label className="ml-2">Rent Amount*: </label>
              <input
                type="number"
                name="tenantRentAmount"
                placeholder="RentAmount"
                value={tenantRentAmount}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
                required
              />
            </div>
            <div className="col-lg-4">
              <label className="ml-2">Deposit Amount*: </label>
              <input
                type="number"
                name="tenantDepositAmt"
                value={tenantDepositAmt}
                placeholder="DepositAmount"
                className="form-control"
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
                required
              />
            </div>
            <div className="col-lg-4">
              <label className="ml-2">Generator Deposit Amount :</label>
              <input
                type="number"
                name="generatordepoAmt"
                placeholder="GeneratorDepositAmount"
                value={generatordepoAmt}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
              />
              <br></br>
            </div>
            <div className="col-lg-4">
              Mode Of Payment*:
              <Select
                name="tenantPaymentMode"
                options={PaymentMethods}
                isSearchable={false}
                value={tenantPaymentMode}
                placeholder="Select..."
                onChange={(e) => onPaymentModeChange(e)}
                theme={(theme) => ({
                  ...theme,
                  height: 26,
                  minHeight: 26,
                  borderRadius: 1,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
              />
            </div>
            <div className="col-lg-4">
              Lease Start Date*:
              <input
                type="date"
                className="form-control cpp-input datevalidation"
                name="tenantLeaseStartDate"
                value={entryDate}
                placeholder={tenantLeaseStartDate}
                onChange={(e) => onDateChangeEntry(e)}
                style={{
                  width: "100%",
                }}
              />
            </div>
            <div className="col-lg-4 ">
              Lease End Date*:
              <input
                placeholder="dd-mm-yyyy"
                className="form-control cpp-input datevalidation"
                value={leaseEndDate}
                required
              ></input>
              <br></br>
            </div>

            <div className="col-lg-12">
              {showChequenoSection ? (
                <>
                  <div className="row">
                    <div className="  col-lg-4">
                      <label>Cheque No/DD No:</label>
                      <input
                        placeholder="Cheque Date"
                        type="text"
                        name="tenantChequenoOrDdno"
                        value={tenantChequenoOrDdno}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                      />
                      <br></br>
                    </div>

                    <div className="col-lg-4  col-md-4 col-sm-4 col-12">
                      <label>Bank Name :</label>
                      <input
                        type="text"
                        name="tenantBankName"
                        value={tenantBankName}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>

                    <div className="col-lg-4  col-md-4 col-sm-4 col-12">
                      <label>Cheque Date:</label>
                      <input
                        type="date"
                        placeholder="dd-mm-yyyy"
                        className="form-control cpp-input datevalidation"
                        name="tenantchequeDate"
                        value={startSelectedDate}
                        onChange={(e) => onDateChange(e)}
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="col-lg-8  col-md-4 col-sm-4 col-12">
              <label>Tenant's Address *:</label>
              <textarea
                name="tenantAddr"
                value={tenantAddr}
                id="tenantAddr"
                className="textarea form-control"
                rows="4"
                placeholder="Address"
                onChange={(e) => onInputChange(e)}
                style={{ width: "100%" }}
                required
              ></textarea>{" "}
            </div>
            <div className="col-lg-9 text-danger">
              * Indicates mandatory fields, Please fill mandatory fields before
              Submit
            </div>
            <div className="col-lg-3">
              <button
                variant="success"
                className="btn sub_form btn_continue Save float-right"
                id="savebtn"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants1: state.tenants,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  UpdateTenantsDetails,
  getAllTenants,
  getParticularProperty,
  tenantsDetailsHistory,
  getParticularTenantSetting,
})(EditTenantDetails);
