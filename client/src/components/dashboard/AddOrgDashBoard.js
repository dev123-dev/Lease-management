import React, { useEffect } from "react";
import { connect } from "react-redux";
import AddOrgModal from "./AddOrgModal";
import { getAllOrganization } from "../../actions/tenants";
const AddOrgDashBoard=({
    tenants : {allorg },
    getAllOrganization, 
  }) => {
    useEffect(()=>{
      getAllOrganization("")
    },[])
    

  const clicking = ()=>{
    alert("Edit")
   
  }
  const onAdd = ()=>{
    
  }
  const onondelet = ()=>{
    alert("Delete")
  }

  return (
    <div>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
              <h2 className="heading_color">OrganiZation Reports </h2>
            </div>

            <AddOrgModal/>

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
                        <th>Org Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Number of Users</th>
                        <th>Operation</th>
                      </tr>
                    </thead>
                      <tbody>
                      {allorg &&
                        allorg[0] &&
                        allorg.map((orgVal, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{orgVal.OrganizationName}</td>
                              <td>{orgVal.OrganizationEmail}</td>
                              <td>{orgVal.OrganizationNumber}</td>
                              <td>{orgVal.OrganizationAddress}</td>
                              <td>{orgVal.AgreementStatus}</td>
                              <td><img
                          className="img_icon_size log"
                          // onClick={() => onClickHandler()}
                          onClick={() => clicking()}
                          src={require("../../static/images/edit_icon.png")}
                          alt="Edit"
                          title="Add User"
                        />
                          <img
                          className="img_icon_size log"
                          // onClick={() => onClickHandler()}
                          onClick={()=>onondelet()}
                          src={require("../../static/images/delete.png")}
                          alt="Add User"
                          title="Add User"
                        /></td>
                        
                              {/* {orgVal.AgreementStatus === "Expired" ? (
                                <td>
                                  <center>
                                     <button
                                      variant="success"
                                      className="btn sub_form"
                                      // onClick={() =>
                                      //   onRenewal(orgVal, idx)
                                      // }
                                    >
                                      Renewal
                                    </button> 
                                  </center>
                                </td>
                              
                              ) : (
                                <td></td>
                              )} */}
                            </tr>
                          );
                        })}
                    </tbody>  
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <center>
                        
                      
                      </center>
                    </td>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const mapStateToProps = (state)=>({
  tenants : state.tenants,
})
export default connect(mapStateToProps,{getAllOrganization})(AddOrgDashBoard)
