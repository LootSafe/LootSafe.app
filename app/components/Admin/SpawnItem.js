// @flow
import React, { Component } from 'react';
import { apiAddr } from '../../config';
import Alert from '../Core/Alert';
import Warning from '../Core/Warning';


export default class SpawnItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      showAlert: false,
      error: false,
      loading: true,
      itemAddress: '',
      receiverAddress: ''
    };

    this.checkAddress = this.checkAddress.bind(this);
  }

  componentWillMount() {
    fetch(`${apiAddr}/item/ledger`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          this.setState({
            items: json.data,
            loading: false
          });
        }
        return null;
      })
      .catch(e => {
        console.warn('Error fetching items', e);
      });
  }

  checkAddress(address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
      return true;
    }
  }

  listItemOptions() {
    return this.state.items.map((item) => {
      return (
        <option key={item.id} value={item.address}>{item._parsed.name}</option>
      );
    });
  }

  execute() {
    fetch(`${apiAddr}/item/spawn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        key: localStorage.getItem('apikey')
      },
      body: JSON.stringify({
        itemAddress: this.state.itemAddress,
        receiverAddress: this.state.receiverAddress
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          this.setState({
            showAlert: true
          });
        } else {
          this.setState({
            error: 'Error spawning item!'
          });
        }
        return null;
      })
      .catch(e => {
        console.warn('Error spawning item', e);
        this.setState({
          error: 'Error spawning item, check console for details.'
        });
      });
  }

  render() {
    return (
      <div className="wtf">
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
        { this.state.showAlert &&
          <Alert
            message="Item successfully distributed!"
            confirm={() => {
              this.setState({
                showAlert: false
              });
            }}
          />
        }
        <div>
          <h2 style={{ float: 'left' }}>Distribute Item</h2>
          { this.state.loading &&
            <h2
              className="refresh"
            >
              <i className="fas fa-spinner fa-pulse" />
            </h2>
          }
        </div>
        <div className="form">
          <div className="full">
            <div className="input-group">
              <label htmlFor="name">Item</label>
              <p className="description">This is the item you wish to distribute.</p>
              <br />
              <select
                onChange={e => {
                  this.setState({
                    itemAddress: e.target.value
                  });
                }}
              >
                <option>Please select an item.</option>
                { this.listItemOptions() }
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="id">Receiver Address</label>
              <p className="description">This is the address of the person receiving the item. (COPY PASTE PLEASE)</p>
              <br />
              <input
                value={this.state.receiverAddress}
                type="text"
                name="id"
                onChange={e => {
                  // DO WEB3 ADDRESS VALIDATION BEFORE SETTING STATE
                  if (this.checkAddress(e.target.value) || e.target.value === '') {
                    this.setState({
                      receiverAddress: e.target.value
                    });
                  }
                }}
                placeholder="0x1337c0de2ce6f6f75044ebaf22449db048faec5d"
              />
            </div>
            <div className="input-group">
              <button
                className="no yes hundredDistribute"
                onClick={() => {
                  this.execute();
                }}
              >
                Distribute
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
