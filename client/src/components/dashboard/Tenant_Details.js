// import { Fragment } from "react";
// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import AddTenantDetails from "./AddTenantDetails";
// import  { getAllTenants }  from "../../actions/tenants";
// const Tenant_Details=({
//   tenants : {allTenants},
//   getAllTenants,
//  })=>{
//   useEffect(()=>{
//     getAllTenants();
//   })
//   // getAllTenants();
//   console.log("property page")
//   return (
//     // tenant starting
//     <>
//     <div className="container container_align ">
//     <section className="sub_reg">
//       <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
//         <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
//           <h2 className="heading_color">Tenant  Reports </h2>
//         </div>
//         <AddTenantDetails/>
//       </div>
//       <div className="row">
//         <div className="col-lg-11 col-md-11 col-sm-11 col-11 text-center ">
//           <section className="body">
//             <div className="body-inner no-padding  table-responsive fixTableHead">
//               <table
//                 className="table table-bordered table-striped table-hover"
//                 id="datatable2"
//               >
//                 <thead>
//                   <tr>
//                     <th>Org Name</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>Address</th>
//                     {/* <th>Number of Users</th> */}
//                     <th>Current Status</th>
//                     <th>Operation</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {allorg &&
//                     allorg[0] &&
//                     allorg.map((orgVal, idx) => {
//                       return (
//                         <tr key={idx}>
//                           <td>{orgVal.OrganizationName}</td>
//                           <td>{orgVal.OrganizationEmail}</td>
//                           <td>{orgVal.OrganizationNumber}</td>
//                           <td>{orgVal.OrganizationAddress}</td>
//                           <td>{orgVal.org_status}</td>
//                           <td>
//                             <img
//                               className="img_icon_size log"
//                               // onClick={() => onClickHandler()}
//                               onClick={() => clicking()}
//                               src={require("../../static/images/edit_icon.png")}
//                               alt="Edit"
//                               title="Edit User"
//                             />
//                             <img
//                               className="img_icon_size log"
//                               // onClick={() => onClickHandler()}
//                               onClick={() => onDelete(orgVal._id)}
//                               src={require("../../static/images/delete.png")}
//                               alt="delete User"
//                               title="delete User"
//                             />
//                           </td>

//                           {/* {orgVal.AgreementStatus === "Expired" ? (
//                             <td>
//                               <center>
//                                  <button
//                                   variant="success"
//                                   className="btn sub_form"
//                                   // onClick={() =>
//                                   //   onRenewal(orgVal, idx)
//                                   // }
//                                 >
//                                   Renewal
//                                 </button> 
//                               </center>
//                             </td>
                          
//                           ) : (
//                             <td></td>
//                           )} */}
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td>
//                   <center></center>
//                 </td>
//               </table>
//             </div>
//           </section>
//         </div>
//       </div>
//     </section>
//   </div>

//     // tenant ending
   
           
         
//            {/* here addd the modal code for adding the tenant */}

        
          
   
//                     {/* {allTenants &&
//                         allTenants[0] &&
//                         allTenants.map((tenant, idx) => {
//                           return (
//                             <tr key={idx}>
//                               <td>{tenant.tenantName}</td>
//                               <td>{tenant.tenantDoorNo}</td>
//                               <td>{tenant.tenantFileNo}</td>
//                               {/* <td>{tenantLeaseEndDate}</td> */}
//                               <td>{tenant.tenantRentAmount}</td>
//                               <td>{tenant.chargesCal.toFixed(2)}</td>
//                               <td>{tenant.stampDuty.toFixed(2)}</td>
//                               <td>{tenant.AgreementStatus}</td>
//                               {tenant.AgreementStatus === "Expired" ? ( */}
//                                 <td>
//                                   <center>
//                                     {/* <button
//                                       variant="success"
//                                       className="btn sub_form"
//                                       onClick={() =>
//                                         onRenewal(tenant, idx)
//                                       }
//                                     >
//                                       Renewal
//                                     </button> */}
                                
//         {/* <div style={{ display: "none" }}> */}
//           {/* <RenewalReportPrint expReport={expReport} ref={componentRef} /> */}
//         {/* </div> */}

//         {/* renewal modal */}
//         {/* <Modal
//           show={showEditModal}
//           backdrop="static"
//           keyboard={false}
//           size="md"
//           aria-labelledby="contained-modal-title-vcenter"
//           centered
//         >
//           <Modal.Header>
//             <div className="col-lg-10">
//               <h4
//                 className="modal-title text-center"
//                 style={{ fontWeight: "bold" }}
//               >
//                 Renewal Tenant Agreement
//               </h4>
//             </div>
//             <div className="col-lg-2">
//               <button onClick={handleEditModalClose} className="close">
//                 <img
//                   src={require("../../static/images/close.png")}
//                   alt="X"
//                   style={{ height: "20px", width: "20px" }}
//                 />
//               </button>
//             </div>
//           </Modal.Header>
//           <Modal.Body>
//             <RenewTenentAgreement
//               tenantsData={userData}
//               onReportModalChange={onReportModalChange}
//             />
//           </Modal.Body>
//         </Modal> */}
    
          


//           {/* <div className="row">
//             <div className="col-lg-11 col-md-11 col-sm-11 col-11 text-center ">
//               <section className="body">
//                 <div className="body-inner no-padding  table-responsive fixTableHead">
//                   <table
//                     className="table table-bordered table-striped table-hover"
//                     id="datatable2"
//                   >
//                     <thead>
//                       <tr>
//                         <th>Tenant Name</th>
//                         <th>Tenant Number</th>
//                         <th>Tenant Location</th>
//                         <th>Tenant Address</th>
//                         <th>Stamp Duty</th>
//                         <th>Lease Time Period</th>
//                         <th>Lease something</th>
//                         <th>Operation</th>
//                       </tr>
//                     </thead>
//                       <tbody>
//                       {allorg &&
//                         allorg[0] &&
//                         allorg.map((orgVal, idx) => {
//                           return (
//                             <tr key={idx}>
//                               <td>{orgVal.OrganizationName}</td>
//                               <td>{orgVal.OrganizationEmail}</td>
//                               <td>{orgVal.OrganizationNumber}</td>
//                               <td>{orgVal.OrganizationAddress}</td>
//                               <td>{orgVal.AgreementStatus}</td>
                              
                        
//                               {orgVal.AgreementStatus === "Expired" ? (
//                                 <td>
//                                   <center>
//                                      <button
//                                       variant="success"
//                                       className="btn sub_form"
//                                       // onClick={() =>
//                                       //   onRenewal(orgVal, idx)
//                                       // }
//                                     >
//                                       Renewal
//                                     </button> 
//                                   </center>
//                                 </td>
                              
//                               ) : (
//                                 <td></td>
//                               )}
//                             </tr>
//                           );
//                         })}
//                     </tbody>   
//                     // <td>1</td>
//                     // <td>2</td>
//                     // <td>3</td>
//                     // <td>4</td>
//                     // <td>5</td>
//                     // <td>6</td>
//                     // <td>7</td>

//                      <td>
//                     <img className="img_icon_size log"
//                          // onClick={() => clicking()}
//                           src={require("../../static/images/edit_icon.png")}
//                           alt="Edit"
//                           title="Add User"
//                         />
//                           <img
//                           className="img_icon_size log"
//                           // onClick={() => onClickHandler()}
//                           //onClick={()=>onondelet()}
//                           src={require("../../static/images/delete.png")}
//                           alt="Add User"
//                           title="Add User"
//                         /></td> 
//                   </table>
//                 </div>
//               </section>
//             </div>
//           </div> */}
//       </>
//   );
// }

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   tenants : state.auth,
// });

// export default connect(mapStateToProps, {getAllTenants})(Tenant_Details);