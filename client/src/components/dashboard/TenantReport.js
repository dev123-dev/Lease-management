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
                              console.log(Val);
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
                                  {Val.AgreementStatus === "Expired" ? (
                                    <td>
                                      <center>
                                        <button
                                          variant="success"
                                          className="rewbtn"
                                          style={{ backgroudColor: "#e8a317" }}
                                          onClick={() => onRenewal(Val, idx)}
                                        >
                                          Renewal
                                        </button>
                                      </center>
                                    </td>
                                  ) : (
                                    <td></td>
                                  )}
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
