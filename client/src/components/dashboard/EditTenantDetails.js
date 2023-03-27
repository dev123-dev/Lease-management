import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  getAllTenants,
  getParticularProperty,
  tenantsDetailsHistory,
  getAllSettings,
  UpdateTenantsDetails,
} from "../../actions/tenants";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import tenants from "../../reducers/tenants";
const EditTenantDetails = ({
  auth: { isAuthenticated, user, users },
  tenants: {
    particular_org_data,
    allTenantSetting,
    particular_tenant_EditData,
  },
  UpdateTenantsDetails,
  getAllSettings,
  getParticularProperty,
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    fun();
    checkDoorNumber();
    getParticularProperty({ OrganizationId: myuser.OrganizationId });
    getAllSettings({
      OrganizationId: myuser && myuser.OrganizationId,
      userId: myuser && myuser._id,
    });
  }, []);





  const [AvaiableRoomBuilding, setAvaiableRoomBuilding] = useState([]);
  const fun = () => {
    let AvaiableRoomBuilding = particular_org_data.filter(
      (item) =>
        !item.shopDoorNo.every((nameItem) => nameItem.status !== "Avaiable")
    );
    setAvaiableRoomBuilding(AvaiableRoomBuilding);
  };


  

  const [buildingData, getbuildingData] = useState();
  const [buildingId, setBuildingID] = useState();
  const allBuildingNames = [];
  AvaiableRoomBuilding.map((buildingData) =>
    allBuildingNames.push({
      buildingId: buildingData._id,
      label: buildingData.buildingName,
      value: buildingData._id,
    })
  );


//
//console.log("edit data",particular_tenant_EditData.shopDoorNo);

  // building name start

  const [buildingName, setBuildingName] = useState("");
  if (
    !buildingName &&
    particular_tenant_EditData &&
    particular_tenant_EditData.BuildingName &&
    allBuildingNames.length > 0
  ) {
    setBuildingName(
      particular_tenant_EditData
        ? allBuildingNames &&
            allBuildingNames.filter(
              (x) => x.label === particular_tenant_EditData.BuildingName
            )[0]
        : ""
    );
  }

  const [orgname, setOrgname] = useState();
  if (
    !buildingName &&
    particular_tenant_EditData &&
    particular_tenant_EditData.BuildingName &&
    allBuildingNames.length > 0
  ) {
    setBuildingName(
      particular_tenant_EditData
        ? allBuildingNames &&
            allBuildingNames.filter(
              (x) => x.label === particular_tenant_EditData.BuildingName
            )[0]
        : ""
    );
  }

  const [Dno, setDno] = useState([])    //[]);

  const [LocList, SetLocList] = useState();
  const [doorno, setdno] = useState([]);
  let doorNos = [];
  const onchangeDoor = (e) => {
    setdno(e);
  };
  const LocName = [];
  AvaiableRoomBuilding.map((loc) => {
    LocName.push({
      label: loc.Location,
      value: loc._id,
    });
  });
  let temp = [];
  const onBuildingChange = (e) => {
    setBuildingID(e.value);
    setBuildingName(e);
    let temp = []; //here we are adding blank arrray bcz to refresh everytime when new name is selected
    AvaiableRoomBuilding &&
      AvaiableRoomBuilding.map((ele) => {
        if (e.buildingId === ele._id) {
          SetLocList(ele.Location);
          ele.shopDoorNo.map((doornumber) => {
            //console.log("x", doornumber);
            if (doornumber.status === "Avaiable") {
              temp.push({
                label: doornumber.doorNo,
                value: doornumber.doorNo,
                status: "Avaiable",
              });
            }
          });
          setDno(temp);
        }
      });
    getbuildingData(e);
    setBuildingID(e.buildingId ? e.buildingId : null);
    setBuildingName(e.label ? e : "");

    //   if (
    //     doorno.length < 1 &&
    //     particular_tenant_EditData &&
    //     particular_tenant_EditData.shopDoorNo.length > 0 &&
    //     Dno.length > 0
    //   ) {
    //     particular_tenant_EditData &&
    //       Dno &&
    //       Dno.map((x) => {
    //         particular_tenant_EditData.shopDoorNo.map((ele) => {
    //           if (x.value === ele) doorNos.push(x);
    //         });
    //       });
    //     setdno(doorNos);
    //   }
  };
  // location listing end
  //const [selectedDoorNumber, setSelectedDoorNumber] = useState(particular_tenant_EditData.shopDoorNo);
  const [testdno, settestdno] = useState();

  const [DnoList, SetDnoList] = useState();
  const checkDoorNumber = () => {
    let TenantDoor =
      particular_tenant_EditData &&
      particular_tenant_EditData.shopDoorNo.map((ele) => {
        return ele;
      });
    //console.log(TenantDoor, "yy");
    // let RoomBuilding = particular_tenant_EditData.filter(
    //   (item) =>
    //     !item.shopDoorNo.every((nameItem) => nameItem.status !== "Avaiable")
    // );
    // setAvaiableRoomBuilding(AvaiableRoomBuilding);
  };

  const[selectedDno,setSelectedDno]=useState(particular_tenant_EditData.shopDoorNo);

  const[unselectedDno, setUnselectedDno]=useState(particular_org_data[0].shopDoorNo.filter((ele)=>ele.status!=="Deleted the Door Number" && ele.status!=="Acquired"))
  
  console.log("selectedDno",selectedDno);
  console.log("unselectedDno",unselectedDno);
  


  const onSelectChange = (inputuserdata) => {
    setUnselectedDno(unselectedDno.filter((ele)=>ele.doorNo !==inputuserdata.doorNo ));
    console.log("one data",inputuserdata);
    console.log("full arr",selectedDno);
    setSelectedDno([...selectedDno,{label: inputuserdata.doorNo, value: inputuserdata.doorNo, status: inputuserdata.status}])
    
    
    // let temparray = [];
    // temparray.push(...selectedDoorNumber, inputuserdata);
    // setSelectedDoorNumber(temparray);
    // setDno(Dno.filter((x) => x.value !== inputuserdata.doorNo));
    // setFormData({
    //   ...formData,
    //   [inputuserdata.name]: 1,
    // });
  };
   const onRemoveChange = (Doornumber) => {
    console.log("x",Doornumber); //val labl status

setSelectedDno(selectedDno.filter((ele)=>ele.label!==Doornumber.label))
setUnselectedDno([...unselectedDno,
  {doorNo: Doornumber.label, status: 'Avaiable'}])
  //   let temparray2 = [];
  //   temparray2.push(...DnoList, Doornumber);
  //   setDno(temparray2);
  //   setSelectedDoorNumber(
  //     selectedDoorNumber.filter((x) => x.value !== Doornumber.value)
  //   );
  //   setFormData({
  //     ...formData,
  //     [Doornumber.name]: 0,
  //   });
   };

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
  console.log("f no", particular_tenant_EditData)
  const [formData, setFormData] = useState({
    isSubmitted: false,
    BuildingName: particular_tenant_EditData.BuildingName,
    BuildingId: particular_tenant_EditData.BuildingId,
    tenantId: particular_tenant_EditData._id,
    tenantLocation: particular_tenant_EditData.Location,
    tenantDoorNo: particular_tenant_EditData.shopDoorNo,
    tenantFileNo: particular_tenant_EditData.tenantFileNo,
    tenantRentAmount: particular_tenant_EditData.tenantRentAmount,
    tenantName: particular_tenant_EditData.tenantName,
    tenantPhone: particular_tenant_EditData.tenantPhone,
    tenantFirmName: particular_tenant_EditData.tenantFirmName,
    tenantAddr: particular_tenant_EditData.tenantAddr,
    tenantAdharNo: particular_tenant_EditData.tenantAdharNo,
    tenantPanNo: particular_tenant_EditData.tenantPanNo,
    tenantDepositAmt: particular_tenant_EditData.tenantDepositAmt,
    tenantBankName: particular_tenant_EditData.tenantBankName,
    tenantChequenoOrDdno: particular_tenant_EditData.tenantChequenoOrDdno
      ? particular_tenant_EditData.tenantChequenoOrDdno
      : "null",
    startSelectedDate: particular_tenant_EditData.tenantchequeDate,
    tenantLeaseStartDate: new Date(
      particular_tenant_EditData.tenantLeaseStartDate
    ),
    tenantLeaseEndDate: new Date(particular_tenant_EditData.tenantLeaseEndDate),
    AgreementStatus: particular_tenant_EditData.AgreementStatus,
    generatordepoAmt: particular_tenant_EditData.generatordepoAmt,
    tenantPaymentMode:
      particular_tenant_EditData && particular_tenant_EditData.tenantPaymentMode
        ? {
            value: particular_tenant_EditData.tenantPaymentMode,
            label: particular_tenant_EditData.tenantPaymentMode,
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

  const onDateChangeEntry = (e) => {
    setEntryDate(e.target.value);
    var newDate = e.target.value;
    var calDate = new Date(newDate);

    var leaseMonth = allTenantSetting.leaseTimePeriod;

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
  const onUpdate = (e) => {
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
    UpdateTenantsDetails(finalData);

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
  };
  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <Modal.Header>
        <div className=" row col-lg-12 col-md-12 col-sm-12 col-12 modhead ">
          <div className="ml-5">
            <b className="text-center h3 ml-4 ">EDIT TENANT DETAILS</b>
          </div>
        </div>
        <div className=" col-lg-2"></div>
      </Modal.Header>{" "}
      <Modal.Body>
        <form onSubmit={(e) => onUpdate(e)}>
          <div className="conatiner-fluid ">
            <div className="row card-new pb-3">
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Property Name*:</label>
                <Select
                  name="buildingName"
                  options={allBuildingNames}
                  value={buildingName}
                  onChange={(e) => onBuildingChange(e)}
                ></Select>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Door No*: </label>
                <Select
                  name="doorno"
                  options={Dno}
                  value={testdno}
                  onChange={(e) => onchangeDoor(e)}
                  isMulti={true}
                  required
                ></Select>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Location*: </label>
                <input
                  type="text"
                  placeholder={tenantLocation}
                  className="form-control"
                  readOnly
                ></input>
                <br></br>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
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
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
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
              <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                <label>Phone No:</label>
                <input
                  type="number"
                  name="tenantPhone"
                  value={tenantPhone}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                />
                <br></br>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Firm Name: </label>
                <input
                  type="text"
                  name="tenantFirmName"
                  value={tenantFirmName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                <label>Adhaar No:</label>
                <input
                  type="number"
                  name="tenantAdharNo"
                  value={tenantAdharNo}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                />
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label className="ml-2"> Pan Number: </label>
                <input
                  type="text"
                  name="tenantPanNo"
                  placeholder="PanNo"
                  value={tenantPanNo}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                />{" "}
                <br></br>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label className="ml-2">Rent Amount*: </label>
                <input
                  type="number"
                  name="tenantRentAmount"
                  placeholder="RentAmount"
                  value={tenantRentAmount}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                  required
                />
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label className="ml-2">Deposit Amount*: </label>
                <input
                  type="number"
                  name="tenantDepositAmt"
                  value={tenantDepositAmt}
                  placeholder="DepositAmount"
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                  required
                />
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label className="ml-2">Generator Deposit Amount :</label>
                <input
                  type="number"
                  name="generatordepoAmt"
                  placeholder="GeneratorDepositAmount"
                  value={generatordepoAmt}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                />
                <br></br>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label> Mode Of Payment*:</label>
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
                <br></br>
              </div>{" "}
              {showChequenoSection ? (
                <>
                  <div className="row">
                    <div className="  col-lg-3 col-md-12 col-sm-12 col-12">
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

                    <div className="col-lg-3 col-md-12 col-sm-12 col-12  col-md-4 col-sm-4 col-12">
                      <label>Bank Name :</label>
                      <input
                        type="text"
                        name="tenantBankName"
                        value={tenantBankName}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>

                    <div className="col-lg-3 col-md-12 col-sm-12 col-12  col-md-4 col-sm-4 col-12">
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
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Lease Start Date*: </label>
                <input
                  type="date"
                  className="form-control cpp-input datevalidation"
                  name="tenantLeaseStartDate"
                  value={entryDate}
                  onChange={(e) => onDateChangeEntry(e)}
                  style={{
                    width: "100%",
                  }}
                />
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                <label>Lease End Date*: </label>
                <input
                  placeholder="dd-mm-yyyy"
                  className="form-control cpp-input datevalidation"
                  value={leaseEndDate}
                  required
                ></input>
                <br></br>
              </div>
              <div className="col-lg-2  col-md-12 col-sm-12 col-12">
                <label>Tenant's Address *:</label>
                <textarea
                  name="tenantAddr"
                  value={tenantAddr}
                  id="tenantAddr"
                  className="textarea form-control"
                  rows="4"
                  placeholder="Address"
                  onChange={(e) => onInputChange(e)}
                  required
                ></textarea>{" "}
              </div>


              {/*  switch */}
              <div className="row ">
              
                <div
                  className=" col-lg-6 col-md-12"
                  style={{ border: "1px solid black", minHeight: "80px" }}
                >Seleted 
                  {selectedDno && 
                    selectedDno.length > 0 &&
                    selectedDno.map((Doornumber, idx) => {
                      return (
                        <p key={idx} className="DoorCover">
                          <button
                            type="button"
                            name="selectedWorkMistake"
                            className="DoorNumber"
                          >
                            {Doornumber.value}
                            <span
                              className="mx-2"
                              onClick={() => onRemoveChange(Doornumber)}
                            >
                              X
                            </span>
                          </button>
                        </p>
                      );
                    })}
                </div>
                <div
                  className="col-lg-6 col-md-12 col-sm-12  button_Door"
                  style={{ border: "1px solid black", minHeight: "80px" }}
                >to Select
                  {unselectedDno &&
                    unselectedDno.map((DoorNumber, idx) => {
                      return (
                        <div key={idx}>
                          <button
                            type="button"
                            name="workMistake"
                            className="btnLink"
                            onClick={() => onSelectChange(DoorNumber)}
                          >
                            {DoorNumber.doorNo}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
              {/* end switch */}
              <div className="col-lg-9 text-danger">
                * Indicates mandatory fields, Please fill mandatory fields
                before Submit
              </div>
              <div className="col-lg-3">
                <button
                  type="submit"
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
      </Modal.Body>
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
  getAllSettings,
  tenantsDetailsHistory,
})(EditTenantDetails);
