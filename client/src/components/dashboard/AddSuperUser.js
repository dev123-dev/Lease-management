import React, { useEffect } from "react";
import AddUserModal from "./AddUserModal";
import tenants from "../../reducers/tenants";
import { getAllSettings } from "../../actions/tenants";
import { connect } from "react-redux";
import { getalluser } from "../../actions/tenants";
import PropTypes from "prop-types";

const AddSuperUser = ({
  auth: { isAuthenticated, loading, user, allTenantSetting },
  tenants: { allsuperuser }, //this is a reudcer
  getalluser, //this is a action function to call
}) => {
  //point to remember that this includes code for both Super user list and Admin user List it is based on condition

  useEffect(() => {
    getalluser();
  }, []);

  const onondelet = () => {
    alert("done");
  };
  return (
    <div>
      {!loading &&
      isAuthenticated &&
      user &&
      user.usergroup === "Super Admin" ? (
        <div className="container container_align ">
          <section className="sub_reg">
            <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
              <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
                <h2 className="heading_color">User Report </h2>
              </div>
              <AddUserModal />
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
                          <th> Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Group</th>
                          <th>Organization</th>
                          <th>Operation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allsuperuser &&
                          allsuperuser[0] &&
                          allsuperuser.map((allsuperuse, idx) => {
                            return (
                              <tr key={idx}>
                                <td>{allsuperuse.username}</td>
                                <td>{allsuperuse.useremail}</td>
                                <td>{allsuperuse.userphone}</td>
                                <td>{allsuperuse.usergroup}</td>
                                <td>{allsuperuse.AgreementStatus}</td>
                                <td>
                                  <img
                                    className="img_icon_size log"
                                    // onClick={() => onClickHandler()}
                                    //onClick={() => clicking()}
                                    src={require("../../static/images/edit_icon.png")}
                                    alt="Edit"
                                    title="Add User"
                                  />
                                  <img
                                    className="img_icon_size log"
                                    // onClick={() => onClickHandler()}
                                    onClick={() => onondelet()}
                                    src={require("../../static/images/delete.png")}
                                    alt="Add User"
                                    title="Add User"
                                  />
                                </td>

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
                    </table>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <>{console.log("admin page working")}</>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  tenants: state.tenants,
  auth: state.auth,
});
export default connect(mapStateToProps, { getalluser, getAllSettings })(
  AddSuperUser
); // to connect to particular function which is getalluser
