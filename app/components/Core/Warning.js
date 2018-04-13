// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Sidebar extends Component {
  render() {
    return (
      <div id="alert" className="animatedFast slideInDown error" >
        <h3>{ this.props.message }</h3>
        <button
          className="yes"
          onClick={() => {
            this.props.confirm();
          }}
        >
          Ok
        </button>
      </div>
    );
  }
}
