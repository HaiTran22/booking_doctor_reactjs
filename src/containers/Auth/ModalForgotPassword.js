import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "./ModalForgotPassword.scss";
import {getEmailForgotPassword} from "../../services/userService";
import { checkAccount, handleResetPassword } from "../../services/userService";
import { tail } from "lodash";

class ModalForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      code: "",
      newPassword: "",
      cofirmPassword: "",
      isShowPassword1: false,
      isShowPassword2: false,
    };
  }
  async componentDidMount() {
    // handleShowHidePassword1 = () => {
    //   this.setState({
    //     isShowPassword1: !this.state.isShowPassword1,
    //   });
    // };
    // handleShowHidePassword2 = () => {
    //   this.setState({
    //     isShowPassword2: !this.state.isShowPassword2,
    //   });
    // };
  }

  handleShowHidePassword1 = () => {
      this.setState({
        isShowPassword1: !this.state.isShowPassword1,
      });
    };
    handleShowHidePassword2 = () => {
      this.setState({
        isShowPassword2: !this.state.isShowPassword2,
      });
    };

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInputEmail = () => {
    let isValue = true;
    
    let arrInput = [
      "email",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValue = false;
        if (arrInput[i] === "email") toast.warn("Vui lòng nhập : email của bạn");
        break;
      }
    }
    return isValue;
  };

  // check email có tồn tài trong sever không
  checkEmail = async (data) => {
    try {
      let response = await checkAccount(data);
      console.log("check user: ", data);
      if (response && response.errCode == 0) {
        
        toast.success("Đã gửi mã về email, vui lòng kiểm tra email của bạn!!!");
        // console.log("response: ", response)
        // if (response && response.errCode === 1) {
        // }
      } else {
        toast.error("Email không tồn tại trong hệ thống !!!");
        // this.toggle();
      }
    } catch (e) {
      console.log(e);
    }

    // console.log("check data from child :", data);
  };

  sendCodeToEmail = async () => {
    let isValid = this.checkValidateInputEmail();
    if (isValid === false)  return;
    await this.checkEmail({
      email: this.state.email,
    });
    // console.log("email: " , this.state.email)     
  }

  checkValidateInputCofirm = () => {
    let isValue = true;
    
    let arrInput = [
      "email",
      "code",
      "newPassword",
      "cofirmPassword"

    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValue = false;
        if (arrInput[i] === "email") toast.warn("Vui lòng nhập email của bạn");
        if (arrInput[i] === "code") toast.warn("Vui lòng nhập mã OTP của bạn");
        if (arrInput[i] === "newPassword") toast.warn("Vui lòng nhập mật khẩu mới của bạn");
        if (arrInput[i] === "cofirmPassword") toast.warn("Vui lòng nhập xác nhận mật khẩu mới của bạn");
        break;
      }
    }
    return isValue;
  };

  //btn xác nhận đổi mật khẩu xog
  handleConfirm = async () => {
    //check có input vào ô mail
    let isValid = this.checkValidateInputCofirm();
    if (isValid === false) return;

    await this.checkOTP({
      email: this.state.email,
      code: this.state.code,
      newPassword: this.state.newPassword,
      cofirmPassword: this.state.cofirmPassword,
    });
   
    
  };

  //check mã otp đúng không
  checkOTP = async (data) => {
    try {
      let response = await handleResetPassword(data);
      // console.log("check user: ", data);
      if (response && response.errCode == 0) { 
        toast.success("Bạn đã thay đổi mật khẩu thành công!");
        this.toggle();
      } else {
        toast.error("Mã OTP sai vui lòng nhập lại");
      }
    } catch (e) {
      console.log(e);
    }

    // console.log("check data from child :", data);
  };



  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        className="modal-container"
        size="md"
        centered
      >
        <ModalHeader toggle={this.toggle}>Quên mật khẩu</ModalHeader>
        <ModalBody>
          <div className="modal-body w-100 d-flex justify-content-center modal-body">
            <div className="input-container w-100  ">
              <label className="mail label-text">Nhập email của bạn:</label>
              <div className="col2">
                <input
                  className="input input-mail"
                  type="email"
                  placeholder="Nhập email lấy mã xác nhận"
                  value={this.state.email}
                  onChange={(event) => {
                    this.handleChangeInput(event, "email");
                  }}
                  
                />
                <Button
                  color="success"
                  className="btn"
                  onClick={() => this.sendCodeToEmail()}
                >
                  Gửi mã
                </Button>
              </div>
            </div>

            <div className="input-container w-100  ">
              <label className="code-confirm label-text">Nhập mã xác nhận:</label>
              <div className="col2">
                <input
                  className="input"
                  type="text"
                  placeholder="Nhập mã xác nhận"
                  onChange={(event) => {
                    this.handleChangeInput(event, "code");
                  }}
                  value={this.state.code}
                />
                
              </div>
            </div>

            <div className="input-container w-100  ">
              <label className="new-password label-text">Nhập mật khẩu mới:</label>
              <div className="col2">
                <input
                  className="input"
                  value={this.state.newPassword}
                  type={this.state.isShowPassword1 ? "text" : "password"}
                  placeholder="Nhập mật khẩu mới"
                  onChange={(event) => {
                    this.handleChangeInput(event, "newPassword");
                  }}
                />
                <span
                    className="eye"
                    onClick={() => {this.handleShowHidePassword1();}}
                  >
                    <i
                      className={
                        this.state.isShowPassword1
                          ? "far fa-eye"
                          : "fas fa-eye-slash"
                      }
                    ></i>
                  </span>
              </div>
            </div>

            <div className="input-container w-100  ">
              <label className="Confirm-password label-text">Xác thực lại mật khẩu:</label>
              <div className="col2">
                <input
                  className="input"
                  value={this.state.cofirmPassword}
                  type={this.state.isShowPassword2 ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu mới"
                  onChange={(event) => {
                    this.handleChangeInput(event, "cofirmPassword");
                  }}
                />
                <span
                    className="eye"
                    onClick={() => {this.handleShowHidePassword2();}}
                  >
                    <i
                      className={
                        this.state.isShowPassword2
                          ? "far fa-eye"
                          : "fas fa-eye-slash"
                      }
                    ></i>
                  </span>
              </div>
            </div>

          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="btn"
            onClick={() => this.handleConfirm()}
          >
            Xác nhận
          </Button>
          <Button color="secondary" onClick={this.toggle} className="btn">
            Đóng
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalForgotPassword);
