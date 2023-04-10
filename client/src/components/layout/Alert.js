import React from "react";
import { connect } from "react-redux";
import { closeCustomAlert } from "../../actions/alert";

const Alert = ({ alerts, closeCustomAlert }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className="alert-container">
      <div className="row alert-heading">
        <span style={{ marginRight: "5px" }}>
          <i className="fa fa-bell" />
        </span>
        Information
      </div>
      <div className="row alert-body">{alert.msg}</div>
      <div className="alrt-close" onClick={() => closeCustomAlert(alert.id)}>
        {" "}
        Close{" "}
      </div>
    </div>
  ));

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { closeCustomAlert })(Alert);
