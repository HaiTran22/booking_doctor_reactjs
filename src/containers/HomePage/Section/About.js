import React, { Component } from "react";
import { connect } from "react-redux";
// import Slider from "react-slick";
class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Những lợi ích khi dùng Smart Booking Care
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/rWCTDQgF2-o"
              title="Dấu hiệu nghi ngờ mắc bệnh lao phổi ​| Sống khỏe mỗi ngày - Kỳ 976"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="content right">
            <p>
              SmartBookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng
              đầu Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng
              khám uy tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch
              vụ, sản phẩm y tế chất lượng cao.
            </p>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
