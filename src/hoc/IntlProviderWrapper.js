import React, { Component } from "react";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";

import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-pluralrules/locale-data/en";
import "@formatjs/intl-pluralrules/locale-data/vi";

import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/locale-data/en";
import "@formatjs/intl-relativetimeformat/locale-data/vi";

class IntlProviderWrapper extends Component {
  render() {
    const { children } = this.props;
    return <IntlProvider>{children}</IntlProvider>;
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

export default connect(mapStateToProps, null)(IntlProviderWrapper);
