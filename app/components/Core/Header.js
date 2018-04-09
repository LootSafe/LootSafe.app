// @flow
import React, { Component } from 'react';
import { remote } from 'electron';

export default class Header extends Component {
  componentDidMount() {
    this.minButton.addEventListener('click', () => {
      const window = remote.getCurrentWindow();
      window.minimize();
    });
    this.maxButton.addEventListener('click', () => {
      const window = remote.getCurrentWindow();
      if (!window.isMaximized()) {
        window.maximize();
      } else {
        window.unmaximize();
      }
    });
    this.closeButon.addEventListener('click', () => {
      const window = remote.getCurrentWindow();
      window.close();
    });
  }

  render() {
    return (
      <div id="header">
        <div id="context">
          <i className="fa fa-users" />
          <i className="fa fa-cogs" />
        </div>
        <img src="http://lootsafe.io/app/images/bearheadlogo.png" alt="LootSafe Logo" id="logo" />
        <div id="nav">
          <ul>
            <li className="active">Admin</li>
            <li>Trade</li>
            <li>Marketplace</li>
          </ul>
        </div>
        <div id="dragger" style={{ WebkitAppRegion: 'drag' }} />
        <div id="windowControls">
          <div className="windowBtn" style={{ background: '#2d3436' }} ref={(e) => { this.minButton = e; }}>
            <i className="far fa-window-minimize" />
          </div>
          <div className="windowBtn" style={{ background: '#55efc4' }} ref={(e) => { this.maxButton = e; }}>
            <i className="far fa-square" />
          </div>
          <div className="windowBtn" id="close-btn" style={{ background: '#00b894' }} ref={(e) => { this.closeButon = e; }}>
            <i className="fa fa-times" />
          </div>
        </div>

        <div id="version">
          <p>LootSafe<i className="fab fa-ethereum" />Interface Alpha</p>
        </div>
      </div>
    );
  }
}
