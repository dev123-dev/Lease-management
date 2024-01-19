import React, { useState, Fragment, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { connect } from "react-redux";
import {
  deactiveTenantsDetails,
  ParticularTenant,
  getAllTenants,
} from "../../actions/tenants";
import { Form, Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import RenewTenentAgreement from "./RenewTenentAgreement";
import logo from "../../static/images/lraLogo_wh.png";
import { CSVLink } from "react-csv";
const TenantReport = ({
  auth: { expReport, isAuthenticated, optName, user, users, finalDataRep }, //optName is months
  tenants: { allorg },
  ParticularTenant,
  deactiveTenantsDetails,
}) => {
  useEffect(() => {
    ParticularTenant({ OrganizationId: user && user.OrganizationId });

    let total = expReport.reduce((acc, obj) => acc + obj.chargesCal, 0);

    localStorage.setItem("total", total);
  }, []);

  const componentRef = useRef();
  const myuser = JSON.parse(localStorage.getItem("user"));
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const [userData, setUserData] = useState(null);

  // Modal for Deactivation
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tId, setId] = useState("");

  const [formData, setFormData] = useState({
    deactive_reason: "",
    isSubmitted: false,
  });
  const { deactive_reason } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onRenewal = (tenants) => {
    //setId(id);
    // console.log("x", tenants);
    setShowEditModal(true);
    setUserData(tenants);
  };
  const onReportModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };
  const onAdd = () => {
    const reason = {
      deactive_reason: deactive_reason,
      tid: tId,
      isSubmitted: "true",
    };
    deactiveTenantsDetails(reason);
    handleClose();
  };
  // const handlePrint = () => {
  //   alert();
  // };

  ///////////////////////receipt generation ////////////////////////
  const componentRef1 = useRef();
  // Modal for receipt generation
  const [showReceipt, setShowReceipt] = useState(false);
  const handleClosePrint = () => setShowReceipt(false);

  const handleGenerateReceipt = useReactToPrint({
    content: () => componentRef1.current,

    documentTitle:
      "Tenant Reports (" +
      (optName.find(
        (month) => Number(month.value) === Number(finalDataRep?.monthSearch)
      )?.label
        ? optName.find(
            (month) => Number(month.value) === Number(finalDataRep?.monthSearch)
          )?.label + " - "
        : "before ") +
      finalDataRep?.yearSearch +
      ")",
    onAfterPrint: () =>
      setShowPrint({
        backgroundColor: "#095a4a",
        color: "white",
        fontWeight: "bold",
      }),
  });
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

  const [viewdata, setviewdata] = useState([]);
  const handlePrintReceipt = (Val) => {
    console.log("Val", Val);
    setShowReceipt(true);
    setviewdata(Val);
  };

  console.log("viewdataaaaaaa", viewdata);
  //////////////end ///////////////////////
  const [showPrint, setShowPrint] = useState({
    backgroundColor: "#095a4a",
    color: "white",
    fontWeight: "bold",
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,

    documentTitle:
      "Tenant Reports (" +
      (optName.find(
        (month) => Number(month.value) === Number(finalDataRep?.monthSearch)
      )?.label
        ? optName.find(
            (month) => Number(month.value) === Number(finalDataRep?.monthSearch)
          )?.label + " - "
        : "before ") +
      finalDataRep?.yearSearch +
      ")",
    onAfterPrint: () =>
      setShowPrint({
        backgroundColor: "#095a4a",
        color: "white",
        fontWeight: "bold",
      }),
  });
  const csvTenantReportData = [
    [
      " Name",
      "Building Name",
      "File No.",
      "Location",
      "Stamp Duty",
      "Expiry Date",
      "Next Rent Amount",
      "Agreement Status",
    ],
  ];
  expReport.map((expReport) => {
    // var doorNo = expReport.shopDoorNo.map((e) => e.value).join(', '); // Join door numbers into a single string
    var ED = expReport.tenantLeaseEndDate.split(/\D/g);
    var tenantLeaseEndDate = [ED[2], ED[1], ED[0]].join("-");
    return csvTenantReportData.push([
      expReport.tenantName,
      expReport.BuildingName,
      expReport.tenantFileNo,

      expReport.Location,
      expReport.stampDuty,
      tenantLeaseEndDate,
      expReport.chargesCal,
      expReport.AgreementStatus,
    ]);
  });
  //console.log("finalDataRep", finalDataRep);
  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      {user.usergroup === "Super Admin" ? (
        <div>
          <div className="container container_align ">
            <section className="sub_reg">
              <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
                <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
                  <h2
                    style={{
                      position: "relative",
                      top: "60px",
                    }}
                    className=" heading_color  headsize  ml-4 "
                  >
                    {" "}
                    DashBoard
                  </h2>
                </div>
                <div className="col-lg-2 col-md-11 col-sm-11 col-11">
                  <img
                    className="img_icon_size log"
                    src={require("../../static/images/print.png")}
                    alt="Add User"
                    title="Add User"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-11 col-md-11 col-sm-11 col-11 text-center ">
                  <section className="body">
                    <div className="body-inner no-padding  table-responsive fixTableHead">
                      <table
                        className="table table-bordered table-striped table-hover"
                        id="datatable2"
                      >
                        <thead>
                          <tr>
                            <th>Main page Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>StartDate</th>
                            <th>Org-Status</th>
                            <th>End Date</th>
                            <th>Operation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allorg &&
                            allorg[0] &&
                            allorg.map((org, index) => {
                              var ED = org.enddate && org.enddate.split(/\D/g);
                              var Enddate = [
                                ED && ED[2],
                                ED && ED[1],
                                ED && ED[0],
                              ].join("-");
                              var SD = org.date && org.date.split(/\D/g);
                              var StartDate = [
                                SD && SD[2],
                                SD && SD[1],
                                SD && SD[0],
                              ].join("-");
                              return (
                                <tr key={index}>
                                  <td>{org.OrganizationName}</td>
                                  <td>{org.OrganizationEmail}</td>
                                  <td>{org.OrganizationNumber}</td>
                                  <td>{org.OrganizationAddress}</td>
                                  <td>{org.AgreementStatus}</td>
                                  <td>{Enddate}</td>
                                  <td>
                                    {org.AgreementStatus === "Expired" ? (
                                      <button className="rewbtn">
                                        Renewal
                                      </button>
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
                  </section>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <>
          <div className="col mt-sm-4 space ">
            <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
              <div className="row mt-5 ">
                <div className="col-lg-10  col-sm-12 col-md-12 mt-3">
                  <h2 className="heading_color  headsize  ml-4">
                    Tenant Report &nbsp;
                    {"(" +
                      (optName.find(
                        (month) =>
                          Number(month.value) ===
                          Number(finalDataRep?.monthSearch)
                      )?.label
                        ? optName.find(
                            (month) =>
                              Number(month.value) ===
                              Number(finalDataRep?.monthSearch)
                          )?.label + " - "
                        : "before ") +
                      finalDataRep?.yearSearch +
                      ")"}
                  </h2>
                </div>

                {/* <div className="col-lg-5  col-sm-12 col-md-12 mt-4">
             
            </div> */}
                <div className="col-lg-2 col-md-1 col-sm-1 col-1  text-end  mediaprint mt-4 pt-3">
                  <button
                    style={{ border: "none" }}
                    onClick={async () => {
                      await setShowPrint({
                        backgroundColor: "#095a4a",
                        color: "black",
                        fontWeight: "bold",
                      });

                      handlePrint();
                    }}
                  >
                    <img
                      height="20px"
                      //  onClick={() => refresh()}
                      src={require("../../static/images/print.png")}
                      alt="Print"
                      title="Print"
                    />
                  </button>
                  {myuser.usergroup === "Admin" ? (
                    <CSVLink data={csvTenantReportData}>
                      <img
                        className="img_icon_size log float-right ml-2 mt-1"
                        src={require("../../static/images/excel_icon.png")}
                        alt="Excel-Export"
                        title="Excel-Export"
                      />
                    </CSVLink>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="container-fluid d-flex align-items-center justify-content-center ">
                <div className="col">
                  <div className="row " ref={componentRef}>
                    <div className="col-lg-1  col-sm-12 col-md-12"></div>
                    <div className="firstrowsticky body-inner no-padding table-responsive">
                      {/* ref={componentRef} */}
                      <img
                        alt={""}
                        src={
                          myuser && myuser.output ? myuser.output.Logo : logo
                        }
                        className={"watermark"}
                      />
                      <table
                        className="table table-bordered table-striped table-hover mt-1"
                        id="datatable2"
                      >
                        <thead>
                          <tr>
                            <th style={showPrint}>Name</th>
                            <th style={showPrint}>Building Name</th>

                            <th style={showPrint}>File No</th>
                            <th style={showPrint}>Location</th>
                            <th style={showPrint}>Stamp Duty</th>
                            <th style={showPrint}>Expiry Date</th>
                            <th style={showPrint}>Next Rent Amount</th>
                            <th style={showPrint}>Agreement Status</th>
                            <th style={showPrint}>Expired</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {expReport &&
                            expReport[0] &&
                            expReport.map((Val, idx) => {
                              console.log("newwww", Val);
                              var ED = Val.tenantLeaseEndDate.split(/\D/g);
                              var tenantLeaseEndDate = [
                                ED[2],
                                ED[1],
                                ED[0],
                              ].join("-");
                              return (
                                <tr key={idx}>
                                  <td>{Val.tenantName}</td>
                                  <td>{Val.BuildingName}</td>
                                  {/* <td>
                                {Val.tenantDoorNo.map((ele) => {
                                  return ele.label;
                                })}
                              </td> */}

                                  <td>{Val.tenantFileNo}</td>
                                  <td>{Val.Location}</td>
                                  <td>{Number(Val.stampDuty).toFixed(2)}</td>

                                  <td>{tenantLeaseEndDate}</td>
                                  <td>{Number(Val.chargesCal).toFixed(2)}</td>
                                  <td>{Val.AgreementStatus}</td>
                                  {
                                    Val.AgreementStatus === "Expired" ? (
                                      <td>
                                        <center>
                                          <button
                                            variant="success"
                                            className="rewbtn"
                                            style={{
                                              backgroudColor: "#e8a317",
                                            }}
                                            onClick={() => onRenewal(Val, idx)}
                                          >
                                            Renewal
                                          </button>
                                        </center>
                                      </td>
                                    ) : Val.AgreementStatus === "Renewed" ? (
                                      <td>
                                        <button
                                          style={{ border: "none" }}
                                          onClick={() =>
                                            handlePrintReceipt(Val, idx)
                                          }
                                        >
                                          <img
                                            height="20px"
                                            //  onClick={() => refresh()}
                                            src={require("../../static/images/print.png")}
                                            alt="Print"
                                            title="Print"
                                          />
                                        </button>
                                      </td>
                                    ) : (
                                      <td></td>
                                    )

                                    // <td></td>
                                  }
                                </tr>
                              );
                            })}
                          {expReport.length < 1 && (
                            <td className="text-center" colSpan={10}>
                              No Data Available
                            </td>
                          )}
                        </tbody>
                        {/*<tfoot className="report-footer">
                              <tr>
                                <td className="report-footer-cell">
                                  <div className="footer-info">
                                    <div className={"page-footer"}>footer content....</div>
                                  </div>
                                </td>
                              </tr>
                            </tfoot>*/}
                      </table>
                      {/* <div className="col-lg-1"></div> */}
                      {/*link to renewal page */}
                    </div>
                    <div className="col-lg-1  col-sm-12 col-md-12"></div>
                  </div>
                  <div
                    className="col-lg-12 col-md-12 col-sm-12 text-right font-weight-bold ml-3"
                    style={{ color: "#095a4a" }}
                  >
                    {"Tenant Leases Expiring : " + expReport.length}
                  </div>
                </div>
              </div>
            </div>
            {/* <RenewalReportPrint expReport={expReport} ref={componentRef} /> */}
            <Modal
              show={showEditModal}
              backdrop="static"
              keyboard={false}
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header className="confirmbox-heading">
                <div className="col-lg-10  col-sm-12 col-md-12">
                  <h3
                    style={{
                      color: "white",
                    }}
                  >
                    Renewal Agreement
                  </h3>
                </div>
                <div className="col-lg-2  col-sm-12 col-md-12">
                  <button onClick={handleEditModalClose} className="close">
                    <img
                      src={require("../../static/images/close.png")}
                      alt="X"
                      style={{ height: "20px", width: "20px" }}
                    />
                  </button>
                </div>
              </Modal.Header>
              <Modal.Body>
                <RenewTenentAgreement
                  tenantsData={userData}
                  onReportModalChange={onReportModalChange}
                />
              </Modal.Body>
            </Modal>
          </div>

          {/* Deactivating the tenant start*/}
          <Modal
            show={show}
            // onHide={handleClose}
            centered
          >
            <Modal.Title>Deactivate</Modal.Title>

            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Reason For Deactivating</Form.Label>
                  <Form.Control
                    type="text"
                    name="deactive_reason"
                    onChange={(e) => onInputChange(e)}
                    autoFocus
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="bg-dark" onClick={onAdd}>
                Save
              </Button>
              <Button className="bg-dark" onClick={handleClose}>
                close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Deactivating the tenant start*/}
          <Modal
            show={show}
            // onHide={handleClose}
            centered
          >
            <Modal.Title>Deactivate</Modal.Title>
            <Modal.Header className="lg" closeButton>
              x
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Reason For Deactivating</Form.Label>
                  <Form.Control
                    type="text"
                    name="deactive_reason"
                    onChange={(e) => onInputChange(e)}
                    autoFocus
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={onAdd}>
                Save
              </Button>
              <Button variant="primary" onClick={handleClose}>
                close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Deactivation End */}

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
                      src={require("../../static/images/closeHerb.png")}
                      width="20px"
                      Height="20px"
                    />
                  </button>
                </div>
              </div>
              <div ref={componentRef1}>
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
                      <td>{viewdata.tenantName}</td>
                      <td></td>
                      <td>Receipt No</td>
                      <td>12345</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Firm Name</td>
                      <td>{viewdata.tenantFirmName}</td>
                      <td></td>
                      <td>Date</td>
                      <td>{todayDateymd}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Address</td>
                      <td>{viewdata.tenantAddr}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Phone</td>
                      <td>{viewdata.tenantPhone}</td>
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
                      viewdata.tenantDoorNo &&
                      viewdata.tenantDoorNo.map((ele, idx) => {
                        return (
                          <tr>
                            <td></td>

                            <td>{idx + 1}</td>
                            <td>{ele.label}</td>
                            <td></td>
                            <td></td>
                            <td>{viewdata.tenantRentAmount}</td>
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
                      <th>8,000</th>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>Less: Discounts</td>
                      <td></td>
                      <td></td>
                      <td>1,000</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>Add: Other Charges</td>
                      <td></td>
                      <td></td>
                      <td>3,000</td>
                      <td></td>
                    </tr>
                    <br />
                    <tr>
                      <td></td>
                      <td></td>
                      <th>Sub-Total After Adjustments</th>
                      <th></th>
                      <th></th>
                      <th>10,000</th>
                      <td></td>
                    </tr>
                    <br/>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>GST (18%)</td>
                      <td></td>
                      <td></td>
                      <td>1800</td>
                      <td></td>
                    </tr>
                    <br />
                    <tr>
                      <td></td>
                      <td></td>
                      <th>Grand Total</th>
                      <td></td>
                      <td></td>
                      <th>11800</th>
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
                   {viewdata.tenantPaymentMode==="Cash"?(<>
                   <td>cash</td>
                     <td></td>
                      <td></td>
                      <td></td></>):viewdata.tenantPaymentMode==="Cheque"?(<>
                    <td>Cheque</td>
                    <td></td>
                      <td>ChequeNo.<br/>{viewdata.tenantChequenoOrDdno}</td>
                      <td>Date<br/>{viewdata.tenantchequeDate}</td>
                   </>):viewdata.tenantPaymentMode==="Neft"?(<>
                    <td>Neft</td>
                     <td></td>
                      <td>Bank Name<br/>{viewdata.tenantBankName}</td>
                      <td>Trans Id<br/>{viewdata.tenantTransId}</td>
                   </>):viewdata.tenantPaymentMode==="Card"?(<>
                    <td>{viewdata.tenantCardType}</td>
                     <td></td>
                     <td>Bank Name<br/>{viewdata.tenantBankName}</td>
                      <td>Trans Id<br/>{viewdata.tenantTransId}</td>
                   </>):viewdata.tenantPaymentMode==="Upi"?(<>
                    <td>UPI</td>
                     <td></td>
                      <td></td>
                      <td>Trans Id<br/>{viewdata.tenantTransId}</td>
                   </>):(<></>)}
                    
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
                  await setShowPrint({
                    backgroundColor: "#095a4a",
                    color: "black",
                    fontWeight: "bold",
                  });

                  handleGenerateReceipt();
                }}
              >
                Print
              </button>
              {/* <Button variant="primary" onClick={onPrint}>
               Print
              </Button> */}
              <button  onClick={handleClosePrint}  className=" sub_form    ">
                close
              </button>
            </Modal.Footer>
          </Modal>

          {/*receipt generation end*/}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  getAllTenants,
  deactiveTenantsDetails,
  ParticularTenant,
})(TenantReport);
