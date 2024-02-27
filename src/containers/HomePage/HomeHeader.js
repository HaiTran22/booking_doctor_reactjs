import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../assets/images/logo.png";

class HomeHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              {/* <i className="fa-solid fa-bars"></i> */}
              <img className="header-logo" src={logo} style={{width: '250px', height:'230px', marginTop:'10px'}} />
              <div className="header-logo"></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b> Chuyên khoa</b>
                </div>
                <div className="subs-title">
                  Tìm kiếm bác sĩ theo chuyên khoa
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>Cơ sở y tế</b>
                </div>
                <div className="subs-title">Chọn phòng khám/cơ sở y tế</div>
              </div>
              <div className="child-content">
                <div>
                  <b>Bác sĩ</b>
                </div>
                <div className="subs-title">Chọn bác sĩ giỏi</div>
              </div>
              <div className="child-content">
                <div>
                  <b>Gói khám</b>
                </div>
                <div className="subs-title">Khám sức khỏe tổng quát</div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fa-solid fa-circle-question"></i> Hỗ trợ
              </div>
              <div className="login">
                <a href="http://localhost:3000/login"><i class="fas fa-sign-in-alt"></i> Sign In</a>
              </div>
            </div>
          </div>
        </div>

        <div className="home-header-banner">
          <div className="content-up">
            <div className="title1">Nền tảng y tế</div>
            <div className="title2">Chăm sóc sức khỏe toàn diện</div>
            <div className="search">
              <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
