// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Warning from './Warning';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      apiurl: false,
      apikey: false
    };
  }

  checkConnection() {
    fetch(`${this.state.apiurl}`)
      .then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json['uptime(ms)']) {
          if (!this.state.apikey) {
            this.setState({
              error: 'Please enter your API key!'
            });
          } else {
            console.log('success!', this.state);
            localStorage.setItem('apikey', this.state.apikey);
            localStorage.setItem('apiurl', this.state.apiurl);
            this.props.close();
          }
        }
        return null;
      })
      .catch(e => {
        console.warn('Error connecting to api', e);
        this.setState({
          error: 'Couldn\'t reach API, please check your API address'
        });
      });
  }

  render() {
    return (
      <div id="welcome">
        { this.state.error &&
          <Warning
            confirm={() => {
              this.setState({
                error: false
              });
            }}
            message={this.state.error}
          />
        }
        <div className="half">
          <img src="http://lootsafe-cachestash.9egbdneg7uzvgp.maxcdn-edge.com/welcome.png" className="welcomeImage" />
        </div>
        <div className="half">
          <h3>Welcome</h3>
          <p>Let's get you started, to begin we'll need a bit of information from you.</p>
          <br />
          <br />
          <div className="input-group">
            <label htmlFor="name">API Address</label>
            <p className="description">This is the address of your API it should have been provided to you during setup.</p>
            <br />
            <input
              type="text"
              name="name"
              onChange={e => {
                this.setState({
                  apiurl: e.target.value
                });
              }}
              placeholder="http://api.lootsafe.io/yourgame"
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">API Key</label>
            <p className="description">This is the access key of your API it should have been provided to you during setup.</p>
            <br />
            <input
              type="text"
              name="apikey"
              onChange={e => {
                this.setState({
                  apikey: e.target.value
                });
              }}
              placeholder="xxxxxxxxxx-xxxxxxxxxxxxxxxx"
            />
          </div>
          <div className="input-group">
            <button
              className="no yes right"
              style={{ width: '100%' }}
              onClick={() => {
                console.log('this.state', this.state);
                this.checkConnection();
              }}
            >
              Let's Build
            </button>
          </div>
        </div>
      </div>
    );
  }
}
