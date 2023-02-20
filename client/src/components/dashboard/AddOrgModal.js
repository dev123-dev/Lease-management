import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Fragment } from "react";
import { connect } from "react-redux";
import { AddOrganization } from "../../actions/tenants";

const AddOrgModal = ({
  // tenants: {AddOrganization },
  auth: { isAuthenticated, user, users, finalDataRep },
  AddOrganization,
}) => {
  const [show, setshow] = useState("");
  const handleClose = () => setshow("false");
  const handleShow = () => setshow("true");

  const [inputdata, setinput] = useState("");
  const [items, setitem] = useState([]);

  const handleLocationclose = (index) => {
    const delitem = items.filter((ele, ind) => {
      return ind != index;
    });
    setitem(delitem);
  };

  const addItem = () => {
    if (!inputdata) {
    } else {
      setitem([...items, inputdata]);
      setinput("");
    }
  };
  const [formDataORG, setFormDataORG] = useState({
    OrganizationName: "",
    OrganizationEmail: "",
    OrganizationNumber: "",
    OrganizationAddress: "",
    Logo: "",
    Location: [],
  });
  const {
    OrganizationName,
    OrganizationEmail,
    OrganizationNumber,
    OrganizationAddress,
    Logo,
    Location,
  } = formDataORG;

  const onORGchange = (e) => {
    setFormDataORG({
      ...formDataORG,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitORGdata = () => {
    const finalORGdata = {
      OrganizationName: OrganizationName,
      OrganizationEmail: OrganizationEmail,
      OrganizationNumber: OrganizationNumber,
      OrganizationAddress: OrganizationAddress,
      Logo: "",
      Location: items,
    };
    console.log(
      "this is in main" + finalORGdata.OrganizationAddress,
      OrganizationNumber
    );

    AddOrganization(finalORGdata);
    setFormDataORG({
      ...formDataORG,
      OrganizationName: "" /*name*/,
      OrganizationEmail: "",
      OrganizationNumber: "",
      OrganizationAddress: "",
      Logo: "",
      Location: [],
    });
  };
  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <div>
      <Fragment>
        <div className="col-lg-2 col-md-11 col-sm-11 col-11 py-4">
          <img
            className="img_icon_size log"
            // onClick={() => onClickHandler()}
            onClick={() => handleShow()}
            src={require("../../static/images/add-icon.png")}
            alt="Add User"
            title="Add User"
          />
        </div>
        <Modal
          show={show}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="logout-modal"
        >
          <Modal.Header>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
              <h2 className="heading_color">Add Organization Details </h2>
            </div>
          </Modal.Header>

          <Modal.Body className="org_add">
            {/* <div className="container container_align">
              <div className=" col-lg-12 col-md-9 col-sm-9 col-12 py-3"> */}
            <div className="col-lg-3 col-md-2 col-sm-4 col-12">
              <label> OrganizationName:</label>

              {/* <div className="col-lg-3 col-md-4 col-sm-4 col-12"> */}
              <input
                type="text"
                name="OrganizationName"
                value={OrganizationName}
                onChange={(e) => onORGchange(e)}
                className="form-control"
                // onChange={(e) => onInputChange(e)}
              />
            </div>
            <br></br>
            {/* </div> */}
            <div className="col-lg-3 col-md-2 col-sm-4 col-12">
              <label>Email *:</label>
              {/* <div className="col-lg-3  col-md-4 col-sm-4 col-12"> */}
              <input
                type="email"
                name="OrganizationEmail"
                value={OrganizationEmail}
                onChange={(e) => onORGchange(e)}
                className="form-control"
                //onChange={(e) => onInputChange(e)}
                required
              />{" "}
            </div>
            <br></br>
            {/* </div> */}
            <div className="col-lg-3 col-md-2 col-sm-4 col-12">
              <label>Phone No:</label>

              {/* <div className="col-lg-4 col-md-4 col-sm-4 col-12"> */}
              <input
                type="number"
                name="OrganizationNumber"
                value={OrganizationNumber}
                onChange={(e) => onORGchange(e)}
                className="form-control"
                //onChange={(e) => onInputChange(e)}
              />
            </div>
            <br></br>
            {/* </div> */}
            <div className="col-lg-3 col-md-2 col-sm-4 col-12">
              <label>Number of User:</label>
              {/* <div className="col-lg-4 col-md-4 col-sm-4 col-12"> */}
              <input
                type="number"
                //  name="user"
                //value={}
                className="form-control"
                //onChange={(e) => onInputChange(e)}
              />{" "}
            </div>
            <br></br>
            {/* </div> */}
            {/* </div> */}

            <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
              <div className="col-lg-3 col-md-2 col-sm-4 col-12">
                <label> Address *:</label>
                {/* <div className="col-lg-3 col-md-4 col-sm-6 col-12"> */}
                <textarea
                  name="OrganizationAddress"
                  value={OrganizationAddress}
                  onChange={(e) => onORGchange(e)}
                  // id="tenantAddr"
                  className="textarea form-control"
                  rows="5"
                  cols="20"
                  placeholder="Address"
                  // onChange={(e) => onInputChange(e)}
                  style={{ width: "100%" }}
                  required
                ></textarea>{" "}
              </div>
              <br></br>
              {/* </div> */}
              <div className="addItem  col-lg-3 col-md-2 col-sm-4 col-12">
                <label className="field_font">
                  Location
                  <i className="text-danger ">
                    <b>*</b>
                  </i>{" "}
                  :
                </label>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-4 col-12">
                <input
                  className=""
                  type="text"
                  name="Location"
                  value={inputdata}
                  onChange={(e) => setinput(e.target.value)}
                  placeholder="Location"
                  id="Location"
                ></input>
                <Button className="loc_add_btn m-2" onClick={addItem}>
                  +
                </Button>
                <div className="showItem ">
                  {items.map((ele, index) => {
                    return (
                      <div className="eachItem" key={index}>
                        <span>{ele}</span>{" "}
                        <button
                          onClick={() => handleLocationclose(index)}
                          className="loc_close_btn m-2"
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/*------------- Multiple Location adding details Ending------------ */}
            </div>
            {/* </div> */}
          </Modal.Body>
          <Modal.Footer>
            <div className="col-lg-12 Savebutton " size="lg">
              <button
                variant="success"
                className="btn sub_form btn_continue Save float-right"
                onClick={() => onSubmitORGdata()}
              >
                Save
              </button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* <Modal
          show={showInformationModal}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="logout-modal"
        >
          <Modal.Header className="confirmbox-heading">
            <h4 className="mt-0">Information</h4>
          </Modal.Header>
          <Modal.Body>
            <h5>Details Added!!</h5>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn_green_bg"
              onClick={() => LogoutModalClose()}
            >
              OK
            </button>
          </Modal.Footer>
        </Modal> */}
      </Fragment>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});
export default connect(mapStateToProps, { AddOrganization })(AddOrgModal);
