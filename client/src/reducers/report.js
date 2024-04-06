const initialState = {
  propertyReportList: [],
  renewalReportList: [],
  reportLoader: false,
};

const report = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "PROPERTY_REPORT_LIST":
      return {
        ...state,
        propertyReportList: payload,
      };

    case "RENEWAL_REPORT_LIST":
      return {
        ...state,
        renewalReportList: payload,
      };
    case "SET_REPORT_LOADER":
      return {
        ...state,
        reportLoader: payload,
      };

    default:
      return state;
  }
};

export default report;
