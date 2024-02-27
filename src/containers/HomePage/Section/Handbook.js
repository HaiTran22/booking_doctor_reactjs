import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
class Handbook extends Component {
  render() {
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cẩm nang sức khỏe</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <div>Tiêu đề bài viết</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <div>Tiêu đề bài viết</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <div>Tiêu đề bài viết</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <div>Tiêu đề bài viết</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <div>Tiêu đề bài viết</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <div>Tiêu đề bài viết</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
