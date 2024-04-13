import React, { useState, Fragment, useEffect, useRef } from "react";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import { ParticularTenantFilterContactReport,getTenantReceiptNo ,AddTenantReceiptDetails,AddUserActivity} from "../../actions/tenants";
import { Modal } from "react-bootstrap";
import RenewalReportPrint from "../printPdf/renewalReportPrint";
import { useReactToPrint } from "react-to-print";
import Pagination from "../layout/Pagination";
import { Link } from "react-router-dom";
import Print from "../../static/images/Print.svg";
import Excel from "../../static/images/Microsoft Excel.svg";
import Refresh from "../../static/images/Refresh.svg";
import Back from "../../static/images/Back.svg";
import Receipt from "../../static/images/Receipts.svg";
const ContactReport = ({
  auth: { user },
  tenants: { sortContactReport,tenantreceiptno },
  ParticularTenantFilterContactReport,
  getTenantReceiptNo,
   AddTenantReceiptDetails,
  AddUserActivity,
}) => {
  const [freshpage, setFreshPage] = useState(true);
  const myuser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    ParticularTenantFilterContactReport();
  }, [freshpage]);

  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(9);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const activeData =
    sortContactReport &&
    sortContactReport.filter((ele) => ele.tenantstatus === "Active");

  const currentDatas =
    activeData && activeData.slice(indexOfFirstData, indexOfLastData);
  const paginate = (nmbr) => {
    //nmbr is page  number
    setCurrentData(nmbr);
  };
  const csvContactReportData = [
    [
      "Tenant Name",
      "Building Name",
      "Location",
      "Door No.",
      "Rent Amount",
      "Deposite Amount",
      "leaseEndDate",
      "Firm Name",
      "Phone No",
      "Pan No",
      "Aadhaar No.",
      // "Tenant Status",
      "Agreement Status",
    ],
  ];
   const [viewdata, setviewdata] = useState([]);
  const handlePrintReceipt = (Val) => {
    setShowReceipt(true);
    setviewdata(Val);
  };

  sortContactReport &&
    sortContactReport.map((sortContactReport) => {
      var doorNo =
        sortContactReport &&
        sortContactReport.shopDoorNo &&
        sortContactReport.shopDoorNo.map((e) => e.value).join(", "); // Join door numbers into a single string
      var ED = sortContactReport.tenantLeaseEndDate.split(/\D/g);
      var tenantLeaseEndDate = [ED[2], ED[1], ED[0]].join("-");
      return csvContactReportData.push([
        sortContactReport.tenantName,
        sortContactReport.BuildingName,
        sortContactReport.Location,
        doorNo,
        sortContactReport.tenantRentAmount,
        sortContactReport.tenantDepositAmt,
        tenantLeaseEndDate,
        sortContactReport.tenantFirmName,
        sortContactReport.tenantPhone,
        sortContactReport.tenantPanNo,
        sortContactReport.tenantAdharNo,
        // sortContactReport.tenantstatus,
        sortContactReport.output.AgreementStatus,
      ]);
    });

  //Print
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
   // increment the receipt number  for string (ex :MOS0001)
  const tenantReceiptNo1 = tenantreceiptno.toString();
  const numericPart = tenantReceiptNo1.replace(/^\D+/g, "");
  const nextNumericValue = (parseInt(numericPart, 10) + 1)
    .toString()
    .padStart(numericPart.length, "0");
  const nextTenantReceiptNo =
    tenantReceiptNo1.replace(/\d+/g, "") + nextNumericValue;

  const OnPrint = () => {
    setIsPrinting(true);
    handlePrint();
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Contact Report",

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
    const componentRef1 = useRef();
  const [showOnPrint, setShowOnPrint] = useState({
    border: "1px solid black",
  });
  const handleGenerateReceipt = useReactToPrint({
    content: () => componentRef1.current,

    documentTitle: "Receipt ",

    onAfterPrint: () =>
      setShowOnPrint({
        border: "1px solid black",
      }),
  });
   var Doorlength =
    viewdata && viewdata.shopDoorNo && viewdata.shopDoorNo.length;
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
  var todayDateymd = dd + "-" + mm + "-" + yyyy;
  var todatDatedmy = yyyy + "-" + mm + "-" + dd;
  

 // /////////////////// calculation////////////////////////////////
  const [tenantDiscount, setTenantDiscount] = useState(0);
  const [tenantOtherCharges, setTenantOtherCharges] = useState(0);
  const [tenantSubTotalAfterAdjustments, SettenantSubTotalAfterAdjustments] =
    useState(0);
  const [tenantsubTotal, settenantsubTotal] = useState(0);
  const [tenantGst, setTenantGst] = useState(0);
  const [tenantGrandTotal, setTenantGrandTotal] = useState(0);
  useEffect(() => {
    settenantsubTotal(viewdata.tenantRentAmount * Doorlength);
    SettenantSubTotalAfterAdjustments(
      tenantsubTotal -
        parseFloat(tenantDiscount) +
        parseFloat(tenantOtherCharges)
    );
    setTenantGst((tenantSubTotalAfterAdjustments * 18) / 100);
  }, [
    tenantDiscount,
    tenantOtherCharges,
    viewdata,
    tenantSubTotalAfterAdjustments,
    handlePrintReceipt,
  ]);

  useEffect(() => {
    setTenantGrandTotal(
      parseFloat(tenantSubTotalAfterAdjustments) + parseFloat(tenantGst)
    );
  }, [tenantGst]);

  //////////////////////////////////////////
  var leaseMonth = myuser.output.leaseTimePeriod;
  // Modal for receipt generation
     const [showReceipt, setShowReceipt] = useState(false);
  const handleClosePrint = () => {
    settenantsubTotal(0);
    setTenantDiscount(0);
    setTenantOtherCharges(0);
    setTenantGst(0);
    setTenantGrandTotal(0);
    setTenantReceiptNotes("");
    SettenantSubTotalAfterAdjustments(0);
    setShowReceipt(false);
  };

  //  useeffect to load receipt number
  useEffect(() => {
    getTenantReceiptNo({ OrganizationId: user && user.OrganizationId });
  }, [showReceipt]);

  // validation for discount amt

  const handletenantDiscountChange = (e) => {
    const inputValue = e.target.value;
    setTenantDiscount(inputValue);
  };

  // validation for othercharges amt

  const handleotherChangesChange = (e) => {
    const inputValue = e.target.value;

    setTenantOtherCharges(inputValue);
  };


  const handleGSTChange = (e) => {
    const inputValue = e.target.value;


    setTenantGst(inputValue);
  
  };
    var ED =
    viewdata &&
    viewdata.tenantchequeDate &&
    viewdata.tenantchequeDate.split(/\D/g);
  var chequeDate = [ED && ED[2], ED && ED[1], ED && ED[0]].join("-");
      var leaseStart =
    viewdata &&
    viewdata.tenantLeaseStartDate &&
    viewdata.tenantLeaseStartDate.split(/\D/g);
  var leaseStartDate = [leaseStart && leaseStart[2], leaseStart && leaseStart[1], leaseStart && leaseStart[0]].join("-");
      var leaseEnd =
    viewdata &&
    viewdata.tenantLeaseEndDate &&
    viewdata.tenantLeaseEndDate.split(/\D/g);
  var leaseEndDate = [leaseEnd && leaseEnd[2], leaseEnd && leaseEnd[1], leaseEnd && leaseEnd[0]].join("-");

  // validation for notes

  const [tenantReceiptNotes, setTenantReceiptNotes] = useState("");

  const handleNotesChange = (e) => {
    const inputValue = e.target.value;
 

    setTenantReceiptNotes(inputValue);
  };
   const onPrint = () => {
    handleGenerateReceipt();
    const finalData = {
      OrganizationName: user.OrganizationName,
      OrganizationId: user.OrganizationId,
      tenantId: viewdata && viewdata._id,

      tenantsubTotal: tenantsubTotal,
      tenantDiscount: tenantDiscount,
      tenantOtherCharges: tenantOtherCharges,
      tenantGst: tenantGst,
      tenantGrandTotal: tenantGrandTotal,
      tenantReceiptNotes: tenantReceiptNotes,
      // tenantReceiptNo:
      //   tenantreceiptno && tenantreceiptno.length === 0
      //     ? "0001"
      //     : nextTenantReceiptNo,
      tenantReceiptNo:
        tenantreceiptno.length === 0 ? "R0001" : nextTenantReceiptNo,
      tenantReceiptDateTime: today,
      tenantPaymentMode: viewdata && viewdata.tenantPaymentMode,
      tenantReceiptEnteredBy: user && user._id,
    };
    const ActivityDetail = {
      userId: user && user._id,
      userName: user && user.username,
      Menu: "Tenant",
      Operation: "Receipt Generation",
      Name: viewdata && viewdata.tenantName,
      NameId: viewdata && viewdata._id,
      OrganizationId: user.OrganizationId,
      expireAt: new Date().getTime() + 80,
    };

    AddTenantReceiptDetails(finalData);
    AddUserActivity(ActivityDetail);
    
  };



  return (
    <>
      <div className="col mt-sm-4 space ">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
          <div className="row mt-5  ">
            <div className="col-lg-5 mt-3">
              <h2 className="heading_color  headsize  ml-4">Contact Report</h2>
            </div>
            <div className="col-lg-7 mt-4 iconspace ">
              <Link to="/Report">
                <button style={{ border: "none" }}>
                  <img src={Back} alt="Back" title="Back" className="iconSize" />
                </button>
              </Link>
          
                <CSVLink data={csvContactReportData} filename={"Contact-Report.csv"}>
                  <img src={Excel} alt="Excel-Export" title="Excel-Export" className="iconSize" />
                </CSVLink>
            

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
                <img src={Print} alt="Print" title="Print" className="iconSize"/>
              </button>
            </div>
          </div>

          <div className="container-fluid d-flex align-items-center justify-content-center mt-sm-1 ">
            <div className="col">
              <div ref={componentRef}>
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
                            // style={{ height: "-10px !important"}}
                            style={showPrint}
                          >
                            Tenant Name
                          </th>

                          <th style={showPrint}>Building Name</th>
                          <th style={showPrint}>Door No.</th>
                          <th style={showPrint}> Location</th>
                          <th style={showPrint}>Rent Amount</th>
                          <th style={showPrint}>Phone No.</th>
                          <th style={showPrint}>Pan No.</th>
                          <th style={showPrint}>Aadhaar No.</th>
                          <th style={showPrint}>Firm Name</th>
                          <th style={showPrint}>Deposite Amount</th>
                          <th style={showPrint}>Lease End Date</th>
                          <th style={showPrint}>Agreement Status</th>
                            {/* <th style={showPrint}>Receipt</th> */}
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {currentDatas &&
                          currentDatas.map((Val, idx) => {
                            var ED =
                              Val.tenantLeaseEndDate &&
                              Val.tenantLeaseEndDate.split(/\D/g);
                            var tenant = [
                              ED && ED[2],
                              ED && ED[1],
                              ED && ED[0],
                            ].join("-");

                            return (
                              <>
                                <tr key={idx}>
                                  <td className="headcolstatic secondlinebreak1">
                                    {Val.tenantName}
                                  </td>
                                  <td>{Val.BuildingName}</td>
                                  {/* <td>
                                  <img
                                    className="img_icon_size log"
                                    src={require("../../static/images/info.png")}
                                    alt="Govt Cards"
                                    title={Val.shopDoorNo.map((e) => e.value)}
                                  />
                                </td> */}
                                  <td>
                                    {isPrinting ? (
                                      Val.shopDoorNo
                                        .map((e) => e.value)
                                        .join(", ")
                                    ) : (
                                      <img
                                        className="img_icon_size log"
                                        src={require("../../static/images/info.png")}
                                        alt="shop no."
                                        title={Val.shopDoorNo.map(
                                          (e) => e.value
                                        )}
                                      />
                                    )}
                                  </td>
                                  <td>{Val.Location}</td>
                                  <td>{Val.tenantRentAmount}</td>
                                  <td>{Val.tenantPhone}</td>
                                  <td>{Val.tenantPanNo}</td>
                                  <td>{Val.tenantAdharNo}</td>
                                  <td>{Val.tenantFirmName}</td>
                                  <td>{Val.tenantDepositAmt}</td>

                                  <td>{tenant}</td>
                                  <td>{Val.output.AgreementStatus}</td>
                                  {/* <td>
                                   <button
                                          style={{ border: "none" }}
                                          onClick={() =>
                                            handlePrintReceipt(Val, idx)
                                          }
                                        >
                                          <img
                                            src={Receipt}
                                            className="iconSize"
                                            alt="Print"
                                            title="Generate Receipt"
                                          />
                                        </button>
                                        </td> */}
                                </tr>
                              </>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-lg-1"></div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  {activeData && activeData.length !== 0 ? (
                    <Pagination
                      dataPerPage={dataPerPage}
                      totalData={activeData.length}
                      paginate={paginate}
                      currentPage={currentData}
                    />
                  ) : (
                    <Fragment />
                  )}
                </div>
                <div className="col-lg-6">
                  <p className="text-end h6 font-weight-bold"
                      style={{ color: "#095a4a" }}>
                    No. of Tenants : {activeData.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
         {/* receipt generation start*/}
          <Modal
            show={showReceipt}
            size="lg"
            dialogClassName="my-modal1"
            centered
            contentClassName="custom-modal"
            aria-labelledby="contained-modal-title-vcenter"
            //style={{ width: '95vw', maxWidth: '100vw' }} // Adjust the width here
          >
            {/* <Modal.Title>Print Receipt</Modal.Title> */}

            <Modal.Body>
              <div className="row col-lg-12 col-md-12 col-sm-12  pb-4">
                <div className=" col-lg-12 col-md-12 col-sm-10 text-right">
                  <button
                    className=" text-right CloseBtn1"
                    onClick={handleClosePrint}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={require("../../static/images/closemodal.png")}
                      width="20px"
                      Height="20px"
                      title="Close"
                    />
                  </button>
                </div>
              </div>
              <div 
              ref={componentRef1}
              >
                <div
                  className="col-lg-12 "
                  style={{ border: "1px solid black" }}
                >
                  {/* header */}
                  <div className="col-lg-12 text-center ">
                    <span className=" receiptHeader ">Rent Receipt</span>
                  </div>
                  <hr />

                  <table className="receiptTable  w-100">
                    <tr>
                      <td></td>
                      <td>Name</td>
                      <td>Mother of Sorrows Church</td>
                      <td></td>
                      <td colSpan={2} rowSpan={5} className="text-center">
                        <img
                          src={require("../../static/images/MOSLogo.png")}
                          alt=""
                          className="img-fluid"
                          height={140}
                          width={140}
                        />
                      </td>

                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Address</td>
                      <td>KM Marg, Brahmagiri, Udupi, Karnataka 576101</td>
                      <td></td>

                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Phone</td>
                      <td>0820 - 2520908</td>
                      <td></td>

                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Email</td>
                      <td>motherofsorrowschurch@gmail.com</td>
                      <td></td>

                      <td></td>
                    </tr>
                       
                    <tr>
                      <td></td>
                      <td>Website</td>
                      <td>https://udupichurch.com/</td>
                      <td></td>

                      <td></td>
                    </tr>
                    <br />
                    <tr>
                      <td colSpan={7}>
                        <hr className="customHr" />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <th>Billed To</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    {/* {viewdata &&
                      viewdata.map((Val, idx) => {
                        console.log("newwww", Val);
                        // var ED = Val.tenantLeaseEndDate.split(/\D/g);
                        // var tenantLeaseEndDate = [ED[2], ED[1], ED[0]].join(
                        //   "-"
                        // );
                        return (
                          <> */}
                    <tr>
                      <td></td>
                      <td>Tenant Name</td>
                      <td>
                        {viewdata.tenantName}
                        </td>
                      <td></td>
                      <td>Receipt No</td>
                      {/* <td>
                        {tenantreceiptno && tenantreceiptno.length === 0
                          ? "0001"
                          : nextTenantReceiptNo}
                      </td> */}
                      <td>
                        {tenantreceiptno.length === 0
                          ? "R0001"
                          : nextTenantReceiptNo}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Firm Name</td>
                      <td>
                        {viewdata.tenantFirmName}
                        </td>
                      <td></td>
                      <td>Date</td>
                      <td>
                        {todayDateymd}
                        </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Address</td>
                      <td>
                        {viewdata.tenantAddr}
                        </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Phone</td>
                      <td>
                        {
                      viewdata.tenantPhone}
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Email</td>
                      <td>motherofsorrowschurch@gmail.com</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                     <tr>
                      <td></td>
                      <td>Agreement Date</td>
                      <td>{leaseStartDate} to {leaseEndDate}</td>
                     <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <br />
                    <tr>
                      <td colSpan={7}>
                        <hr className="customHr" />
                      </td>
                    </tr>
                    {/* tables  */}
                    <tr>
                      <td></td>
                      <th>Sl</th>
                      <th>Property Details</th>
                      <th></th>
                      <th></th>
                      <th>Amount</th>
                      <td></td>
                    </tr>
                    {viewdata &&
                      viewdata.shopDoorNo &&
                      viewdata.shopDoorNo.map((ele, idx) => {
                        return (
                          <tr>
                            <td></td>

                            <td>{idx + 1}</td>
                            <td>{ele.label}</td>
                            <td></td>
                            <td></td>
                            <td>
                          {Number(viewdata.tenantRentAmount).toFixed(2)}
                            </td>
                            <td></td>
                          </tr>
                        );
                      })}

                    <tr>
                      <td colSpan={7}>
                        <hr className="customHr" />
                      </td>
                    </tr>
                    {/* subtable  */}
                    <tr>
                      <td></td>
                      <td></td>
                      <th>Sub-Total</th>
                      <th></th>
                      <th></th>
                      <th>
                        {(Number(tenantsubTotal)*leaseMonth).toFixed(2)}
                        </th>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>Less: Discounts</td>
                      <td></td>
                      <td></td>
                      <td>
                        {" "}
                        <input
                          type="number"
                          name="tenantDiscount"
                          className="textBoxWidth"
                          value={tenantDiscount}
                          onChange={(e) => handletenantDiscountChange(e)}
                          style={showOnPrint}
                        />
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>Add: Other Charges</td>
                      <td></td>
                      <td></td>
                      <td>
                        <input
                          type="number"
                          name="tenantOtherCharges"
                          className="textBoxWidth"
                          value={tenantOtherCharges}
                          onChange={(e) => handleotherChangesChange(e)}
                          style={showOnPrint}
                        />
                      </td>
                      <td></td>
                    </tr>
                    <br />
                    <tr>
                      <td></td>
                      <td></td>
                      <th>Sub-Total After Adjustments</th>
                      <th></th>
                      <th></th>

                      <th>
                        {isNaN(parseFloat(tenantSubTotalAfterAdjustments)) ||
                        parseFloat(tenantSubTotalAfterAdjustments) === 0
                          ? " "
                          : (Number(tenantSubTotalAfterAdjustments)*leaseMonth).toFixed(2)}
                      </th>
                      <td></td>
                    </tr>
                    <br />
                    <tr>
                      <td></td>
                      <td></td>
                      <td>GST (18%)</td>
                      <td></td>
                      <td></td>
                      <td>
                        <input
                          type="number"
                          name="tenantGST"
                          className="textBoxWidth"
                          value={
                            isNaN(parseFloat(tenantGst)) ||
                            parseFloat(tenantGst) === 0
                              ? " "
                              : (Number(tenantGst)*leaseMonth).toFixed(1)
                          }
                          onChange={(e) => handleGSTChange(e)}
                          style={showOnPrint}
                        />
                      </td>
                      <td></td>
                    </tr>
                    <br />
                    <tr>
                      <td></td>
                      <td></td>
                      <th>Grand Total</th>
                      <td></td>
                      <td></td>
                      
                      <th>
                        {isNaN(parseFloat(tenantGrandTotal)) ||
                        parseFloat(tenantGrandTotal) === 0
                          ? " "
                          : (Number(tenantGrandTotal)*leaseMonth).toFixed(2)}
                      </th>

                      <td></td>
                    </tr>
                    <br />
                    <tr>
                      <td colSpan={7}>
                        <hr className="customHr" />
                      </td>
                    </tr>
                    {/* payment  */}
                    <tr>
                      <td></td>
                      <td>Payment Mode</td>
                      {viewdata.tenantPaymentMode === "Cash" ? (
                        <>
                          <td>cash</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </>
                      ) : viewdata.tenantPaymentMode === "Cheque" ? (
                        <>
                          <td>Cheque</td>
                          <td>
                            Bank
                            <br />
                            {viewdata.tenantBankName
                              ? viewdata.tenantBankName
                              : "--"}
                          </td>
                          <td>
                            ChequeNo.
                            <br />
                            {viewdata.tenantChequenoOrDdno === "null"
                              ? "--"
                              : viewdata.tenantChequenoOrDdno}
                          </td>
                          <td>
                            Date
                            <br />
                            {chequeDate}
                          </td>
                        </>
                      ) : viewdata.tenantPaymentMode === "NEFT" ? (
                        <>
                          <td>NEFT</td>
                          <td></td>
                          <td>
                            Bank Name
                            <br />
                            {viewdata.tenantBankName}
                          </td>
                          <td>
                            Trans Id
                            <br />
                            {viewdata.tenantTransId}
                          </td>
                        </>
                      ) : viewdata.tenantPaymentMode === "Card" ? (
                        <>
                          <td>
                            {viewdata.tenantCardType}
                          </td>
                          <td></td>
                          <td>
                            Bank Name
                            <br />
                            {viewdata.tenantBankName}
                          </td>
                          <td>
                            Trans Id
                            <br />
                            {viewdata.tenantTransId}
                          </td>
                        </>
                      ) : viewdata.tenantPaymentMode === "UPI" ? (
                        <>
                          <td>UPI</td>
                          <td></td>
                          <td></td>
                          <td>
                            Trans Id
                            <br />
                            {viewdata.tenantTransId}
                          </td>
                        </>
                      ) : (
                        <></>
                      )}

                      <td></td>
                    </tr>
                    <br />
                    <tr>
                      <td colSpan={7}>
                        <hr className="customHr" />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Notes :</td>
                      <td colSpan={3}>
                        <textarea
                          rows={2}
                          type="text"
                          name="tenantNotes"
                          className="form-control"
                          value={tenantReceiptNotes}
                          onChange={(e) => handleNotesChange(e)}
                          style={showOnPrint}
                        />
                      </td>

                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </table>

                  {/* receipt generation  */}
                  <div className="text-center mt-5">
                    <span className="font-italic">
                      This is computer generated receipt, signature is not
                      required
                    </span>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="printBtn"
                onClick={async () => {
                  await setShowOnPrint({
                    border: "none",
                  });

                  onPrint();
                }}
              >
                Print
              </button>

              <button 
              onClick={handleClosePrint}
               className=" sub_form    ">
                Close
              </button>
            </Modal.Footer>
          </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  tenants: state.tenants,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  ParticularTenantFilterContactReport,
  getTenantReceiptNo,
   AddTenantReceiptDetails,
  AddUserActivity,
})(ContactReport);
