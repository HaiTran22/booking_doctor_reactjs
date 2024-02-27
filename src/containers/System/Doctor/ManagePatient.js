import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getAllPatientForDoctor,
  postSendRemedy,
  postSendRefuse,
  getConfirm,
} from "../../../services/userService";
import moment from "moment";
import RemedyModal from "./RemedyModal";
import RefuseModal from "./RefuseModal";
import MapDoctor from "../../../Patient/Map/MapDoctor.js";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: {},
      isOpenRemedyModal: false,
      isOpenRefuseModal: false,
      dataModal: {},
      isShowLoading: false,
      arrayPatient: [],
      addressDoctor: "",
      dataPatientBookAtHome: [],
      dataPatientBookOnline: [],
      date: "",
      isDisable: true,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
    let { user } = this.props;
    this.setState({
      addressDoctor: user.address,
    });
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();
    let date = moment.unix(+formattedDate / 1000).format("dddd - DD/MM/YYYY");
    // console.log("date", date);
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formattedDate,
    });
    let arrTempAtHome = [];
    let arrTempOnline = [];
    let arr = res.data;
    let countAtHome = 0;
    let countOnline = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].bookingType === "ATHOME")
        if (arr[i].statusId === "S2" || arr[i].statusId === "S3")
          arrTempAtHome[countAtHome++] = arr[i];
      if (arr[i].bookingType === "ONLINE")
        if (arr[i].statusId === "S2" || arr[i].statusId === "S3")
          arrTempOnline[countOnline++] = arr[i];
    }

    // console.log("check arr ", res.data);
    if (res && res.errCode == 0) {
      this.setState({
        dataPatient: res.data,
        dataPatientBookAtHome: arrTempAtHome,
        dataPatientBookOnline: arrTempOnline,
        date: date,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) { }

  handleChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      },
    );
  };

  handleBtnConfirmOn = (item) => {
    // console.log(">>> Check item: ", item);
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      timeTypeDataPatient: item.timeTypeDataPatient.valueVI,
      patientName: item.patientData.lastName + " " + item.patientData.firstName,
      bookingType: "ONLINE",
      date: this.state.date,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
    // console.log(">>> Check data: ", data);
  };

  handleBtnConfirmAtHome = (item) => {
    // console.log(">>> Check item: ", item);
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      time: "",
      patientName: item.patientData.lastName + " " + item.patientData.firstName,
      bookingType: "ATHOME",
      date: this.state.date,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
    // console.log(">>> Check data: ", data);
  };

  //fix
  handleBtnRefuse = (item) => {
    // console.log(">>> Check item: ", item);
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeTypeDataPatient,
      patientName: item.patientData.firstName + " " + item.patientData.lastName,
      reason: "",
    };
    this.setState({
      isOpenRefuseModal: true,
      dataModal: data,
    });
    // console.log(">>> Check data: ", data);
  };

  closeRefuseModal = () => {
    this.setState({
      isOpenRefuseModal: false,
      dataModal: {},
    });
  };

  sendRefuse = async (dataChild) => {
    // console.log("check data child", dataChild);
    this.setState({
      isShowLoading: true,
    });
    let res = await postSendRefuse({
      email: dataChild.email,
      doctorId: dataChild.doctorId,
      patientId: dataChild.patientId,
      timeType: dataChild.timeType,
      patientName: dataChild.patientName,
      reason: dataChild.reason,
      date: this.state.date,
    });
    // console.log("check modal:res", res);
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("Gửi email từ chối thành công: ");
      this.closeRefuseModal();
      await this.getDataPatient();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Có lỗi đang xảy ra... !!!");
      console.log("Có lỗi khi gửi email: ", res);
    }
  };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };

  handleConfirm = async (dataChild) => {
    console.log(
      "check data handleConfirm",
      dataChild.doctorId,
      dataChild.patientId,
    );
    let res = await getConfirm({
      doctorId: dataChild.doctorId,
      patientId: dataChild.patientId,
    });
    // console.log("check res confirm", res);
    if (res && res.errCode === 0) {
      toast.success("Xác nhận thành công!!! ");
      await this.getDataPatient();
    } else {
      toast.error("Có lỗi đang xảy ra... !!!");
      console.log("Có lỗi khi gửi email: ", res);
    }
  };

  sendRemedy = async (dataChild) => {
    console.log("check data child", dataChild);
    this.setState({
      isShowLoading: true,
    });
    let res = await postSendRemedy({
      email: dataChild.email,
      doctorId: dataChild.doctorId,
      patientId: dataChild.patientId,
      timeType:
        dataChild.bookingType === "ONLINE"
          ? dataChild.timeTypeDataPatient
          : dataChild.time,
      // timeType: dataChild.time,
      patientName: dataChild.patientName,
      date: this.state.date,
    });
    // console.log("check modal:res", res);
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
        // isDisable: !this.state.isDisable,
      });
      toast.success("Gửi email xác nhận thành công: ");
      this.closeRemedyModal();
      await this.getDataPatient();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Có lỗi đang xảy ra... !!!");
      console.log("error send remedy: ", res);
    }
  };

  render() {
    return <div className="title">Quản lý lịch hẹn</div>;
    // let {
    //   isOpenRemedyModal,
    //   isOpenRefuseModal,
    //   dataModal,
    //   dataPatientBookAtHome,
    //   dataPatientBookOnline,
    // } = this.state;
    // console.log("arr Online", dataPatientBookOnline);
    // console.log("arr At home", dataPatientBookAtHome);
    // return (
    //   <>
    //     <LoadingOverlay
    //       active={this.state.isShowLoading}
    //       spinner
    //       text="Loading..."
    //     >
    //       <div className="manage-patient-container">
    //         <div className=" title text-center mt-4">
    //           quản lý bệnh nhân khám bệnh
    //         </div>
    //         <div className="m-p-body row">
    //           <div className="col-4 form-group">
    //             <label>Chọn ngày khám:</label>
    //             <br />
    //             <DatePicker
    //               onChange={this.handleChangeDatePicker}
    //               className="form-group datePicker"
    //               value={this.state.currentDate}
    //             />
    //           </div>
    //           <div className="col-12 table-m-p mt-3">
    //             <p className="h5">
    //               Danh sách bệnh nhân đặt lịch khám trực tuyến:
    //             </p>
    //             <table style={{ width: "100%" }}>
    //               <tbody>
    //                 <tr>
    //                   <th>STT</th>
    //                   <th>Thời gian</th>
    //                   <th>Họ và tên</th>
    //                   <th>Email</th>
    //                   <th>Địa chỉ</th>
    //                   <th>Giới tính</th>
    //                   <th>Lý do</th>
    //                   <th>Actions</th>
    //                 </tr>
    //                 {dataPatientBookOnline &&
    //                   dataPatientBookOnline.length > 0 ? (
    //                   dataPatientBookOnline.map((item, index) => {
    //                     return item.bookingType === "ONLINE" ? (
    //                       <tr key={index}>
    //                         <td>{index + 1}</td>
    //                         <td>{item.timeTypeDataPatient.valueVI}</td>
    //                         <td>
    //                           {item.patientData.lastName +
    //                             " " +
    //                             item.patientData.firstName}
    //                         </td>
    //                         <td>{item.patientData.email}</td>
    //                         <td>{item.patientData.address}</td>
    //                         <td>{item.patientData.genderData.valueVI}</td>
    //                         <td>{item.reason}</td>
    //                         <td>
    //                           <button
    //                             className="btn btn-info px-1 mx-1"
    //                             onClick={() => this.handleBtnConfirmOn(item)}
    //                             hidden={item.statusId === "S2" ? false : true}
    //                           >
    //                             Đồng ý
    //                           </button>
    //                           <button
    //                             className="btn btn-success px-1 mx-1"
    //                             onClick={() => this.handleConfirm(item)}
    //                             hidden={item.statusId === "S3" ? false : true}
    //                           >
    //                             Xác nhận
    //                           </button>
    //                           <button
    //                             className="btn btn-danger px-1 mx-1"
    //                             onClick={() => this.handleBtnRefuse(item)}
    //                           >
    //                             Từ chối
    //                           </button>
    //                         </td>
    //                       </tr>
    //                     ) : (
    //                       ""
    //                     );
    //                   })
    //                 ) : (
    //                   <tr>
    //                     <td colspan="8" className="no-data">
    //                       Ngày hôm nay không có lịch đặt hẹn nào
    //                     </td>
    //                   </tr>
    //                 )}
    //               </tbody>
    //             </table>
    //             <p className="h5 mt-4">
    //               Danh sách bệnh nhân đặt lịch khám tại nhà:
    //             </p>
    //             <table style={{ width: "100%" }}>
    //               <tbody>
    //                 <tr>
    //                   <th>STT</th>
    //                   <th>Họ và tên</th>
    //                   <th>Email</th>
    //                   <th>Địa chỉ</th>
    //                   <th>Giới tính</th>
    //                   <th>Lý do</th>
    //                   <th>Actions</th>
    //                 </tr>
    //                 {dataPatientBookAtHome &&
    //                   dataPatientBookAtHome.length > 0 ? (
    //                   dataPatientBookAtHome.map((item, index) => {
    //                     return item.bookingType === "ATHOME" ? (
    //                       <tr key={index}>
    //                         <td>{index + 1}</td>
    //                         <td>
    //                           {item.patientData.lastName +
    //                             " " +
    //                             item.patientData.firstName}
    //                         </td>
    //                         <td>{item.patientData.email}</td>
    //                         <td>{item.patientData.address}</td>
    //                         <td>{item.patientData.genderData.valueVI}</td>
    //                         <td>{item.reason}</td>
    //                         <td>
    //                           <button
    //                             className="btn btn-info px-1 mx-1"
    //                             onClick={() =>
    //                               this.handleBtnConfirmAtHome(item)
    //                             }
    //                             hidden={item.statusId === "S2" ? false : true}
    //                           >
    //                             Đồng ý
    //                           </button>
    //                           <button
    //                             className="btn btn-success px-1 mx-1"
    //                             onClick={() => this.handleConfirm(item)}
    //                             hidden={item.statusId === "S3" ? false : true}
    //                           >
    //                             Xác nhận
    //                           </button>
    //                           <button
    //                             className="btn btn-danger px-1 mx-1"
    //                             onClick={() => this.handleBtnRefuse(item)}
    //                           >
    //                             Từ chối
    //                           </button>
    //                         </td>
    //                       </tr>
    //                     ) : (
    //                       ""
    //                     );
    //                   })
    //                 ) : (
    //                   <tr>
    //                     <td colspan="8" className="no-data">
    //                       Ngày hôm nay không có lịch đặt hẹn nào
    //                     </td>
    //                   </tr>
    //                 )}
    //               </tbody>
    //             </table>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="container-fluid">
    //         <div className="row">
    //           <div className="col-12 mt-4">
    //             <MapDoctor
    //               address={this.state.addressDoctor}
    //               arrayPatient={this.state.dataPatientBookAtHome}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       <RemedyModal
    //         isOpenModal={isOpenRemedyModal}
    //         dataModal={dataModal}
    //         closeRemedyModal={this.closeRemedyModal}
    //         sendRemedy={this.sendRemedy}
    //       />
    //       <RefuseModal
    //         isOpenModal={isOpenRefuseModal}
    //         dataModal={dataModal}
    //         closeRefuseModal={this.closeRefuseModal}
    //         sendRefuse={this.sendRefuse}
    //       />
    //     </LoadingOverlay>
    //   </>
    // );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
