import React, { Component } from "react";
import "./RefuseModal.scss";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import moment from "moment";
// import { CommonUtils } from "../../../utils";

class RefuseModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      reason: "",
    };
  }

  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  handleOnchangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleOnchangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleSendRefuse = () => {
    let { dataModal } = this.props;
    dataModal.reason = this.state.reason;
    this.props.sendRefuse(this.props.dataModal);
    // console.log("reason: ", dataModal.reason);
  };

  render() {
    let { isOpenModal, closeRefuseModal, dataModal } = this.props;
    // console.log("check data modal:", dataModal);
    return (
      <Modal
        isOpen={isOpenModal}
        className="'booking-modal-container"
        size="md"
        centered
        // backdrop={true}
      >
        <div className="modal-header">
          <h5 className="modal-title">
            Bạn có chắc chắn từ chối lịch hẹn này?
          </h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={closeRefuseModal}
          >
            <span>
              <i class="fa-sharp fa-regular fa-circle-xmark"></i>
            </span>
          </button>
        </div>
        <ModalBody>
          <div className="row">
            <div className="col-6 form-group">
              <label>Tên của bệnh nhân:</label>
              <br />
              {dataModal.patientName}
            </div>
            {/* <div className="col-6 form-group">
              <label>Thời gian hẹn:</label>
              <br />
              {dataModal.timeTypeDataPatient}
            </div> */}
            <div className="col-6 form-group mail">
              <label>Email bệnh nhân:</label>
              <input
                className="form-control"
                type="email"
                value={this.state.email}
                onChange={(event) => this.handleOnchangeEmail(event)}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12 form-group mt-2">
              <label>Lý do từ chối:</label>
              <input
                className="form-control"
                onChange={(event) => this.handleOnchangeInput(event, "reason")}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="btn_modalFooter"
            onClick={this.handleSendRefuse}
          >
            Xác nhận
          </Button>{" "}
          <Button
            color="warning"
            className="btn_modalFooter"
            onClick={closeRefuseModal}
          >
            Thoát
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RefuseModal);
