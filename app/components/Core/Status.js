// @flow
import React, { Component } from 'react';
import { apiAddr } from '../../config';

export default class Status extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api: false,
      rpc: false
    };
  }

  componentDidMount() {
    /*
    fetch(`${apiAddr}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          rpc: (json.connected) ? true : false,
          api: true
        });
      })
      .catch(e => {
        this.setState({
          rpc: false,
          api: false
        });
        console.warn('Error getting status');
      });
      */
  }

  render() {
    return (
      <div id="status">
        RPC
        {
          this.state.rpc &&
          <i className="fa fa-circle green" />
        }
        {
          !this.state.rpc &&
          <i className="fa fa-circle red" />
        }
        API
        {
          this.state.api &&
          <i className="fa fa-circle green" />
        }
        {
          !this.state.api &&
          <i className="fa fa-circle red" />
        }
      </div>
    );
  }
}
