const initialState = {
  propertyReportList: [],
};

const report = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "PROPERTY_REPORT_LIST":
      return {
        ...state,
        propertyReportList: payload,
      };

    default:
      return state;
  }
};

export default report;
