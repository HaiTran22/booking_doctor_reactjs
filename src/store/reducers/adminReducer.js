import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  adminInfo: null,
  allDoctors: [],
  allScheduleTime: [],
  users: [],
  topDoctors: [],
  allRequiredDoctorInfor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        adminInfo: action.adminInfo,
      };
    case actionTypes.ADMIN_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        adminInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        adminInfo: null,
      };

    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctors = action.dataDoctors;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTOR_FAILDED:
      state.allDoctors = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.allScheduleTime = action.dataDoctors;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED:
      state.allScheduleTime = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.dataDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAILDED:
      state.allDoctors = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
      state.allRequiredDoctorInfor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
      state.allRequiredDoctorInfor = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
