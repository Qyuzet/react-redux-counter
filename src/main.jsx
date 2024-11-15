import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import * as Redux from "redux";
import * as ReactRedux from "react-redux";
//Redux
const CLICK = "CLICK";

const ActionClick = () => {
  return {
    type: CLICK,
  };
};

const ActionClickReducer = (state = 0, action) => {
  switch (action.type) {
    case CLICK:
      return state + 10;
    default:
      return state;
  }
};

const store = Redux.createStore(ActionClickReducer);

//React Components
class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addNewCount();
  }

  render() {
    return (
      <>
        <h1>{this.props.countValue}</h1>
        <button onClick={this.handleClick}>increment</button>
      </>
    );
  }
}

//React-Redux

const mapStateToProps = (state) => {
  return {
    countValue: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { addNewCount: () => dispatch(ActionClick()) };
};

const Provider = ReactRedux.Provider;
const ReduxWrapped = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);

//React Parent Component
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="mainContainer">
          <Provider store={store}>
            <ReduxWrapped />
          </Provider>
        </div>
      </>
    );
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
