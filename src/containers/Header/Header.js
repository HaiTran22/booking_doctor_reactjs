import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import "./Header.scss";
import { adminMenu, doctorMenu } from "./menuApp";
import _ from "lodash";
import { USER_ROLE } from "../../utils";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }

  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }

  render() {
    const { processLogout, userInfo } = this.props;
    // console.log("check user info: ", userInfo);
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        <div className="welcome">
          <span>
            Welcome,{" "}
            {userInfo && userInfo.firstName ? " " + userInfo.firstName : ""} !
          </span>
        </div>
        {/* nút logout */}
        <div>
          {userInfo.roleId === USER_ROLE.PATIENT ? (
            <div className="btn ">
              <a href="/" className="btn-home">
                <i class="fas fa-home"></i>
              </a>
            </div>
          ) : (
            ""
          )}
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
