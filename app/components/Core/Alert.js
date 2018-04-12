// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Sidebar extends Component {
  render() {
    return (
      <div id="alert" className="animatedFast slideInDown" >
        <h3>{ this.props.message }</h3>
        { this.props.cancel &&
          <button
            className="no"
            onClick={() => {
              this.props.cancel();
            }}
          >
            Cancel
          </button>
        }
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
