// @flow
import React, { Component } from 'react';

import Alert from '../Core/Alert';
import Warning from '../Core/Warning';

const apiAddr = localStorage.getItem('apiurl');
const apiKey = localStorage.getItem('apikey');

export default class NewItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      showAlert: false,
      name: '',
      id: '',
      symbol: '',
      supply: 0,
      metadata: ''
    };
  }

  componentWillMount() {
    fetch(`${apiAddr}/item/ledger`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          this.setState({
            items: json.data
          });
        }
        return null;
      })
      .catch(e => {
        console.warn('Error fetching items', e);
      });
  }

  execute() {
    const payload = {
      name: this.state.name,
      id: this.state.id,
      symbol: this.state.symbol,
      totalSupply: this.state.supply,
      metadata: this.state.metadata
    };

    this.setState({
      name: '',
      id: '',
      symbol: '',
      sypply: 0,
      metadata: ''
    })

    fetch(`${apiAddr}/item/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        key: apiKey
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          this.setState({
            showAlert: true
          });
        } else {
          this.setState({
            error: 'Error creating new item!'
          });
        }
        return null;
      })
      .catch(e => {
        console.warn('Error creating new item', e);
        this.setState({
          error: 'Error creating new item, check console for details.'
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
            message="New item created!"
            confirm={() => {
              this.setState({
                showAlert: false
              });
            }}
          />
        }
        <div>
          <h2 style={{ float: 'left' }}>New Item</h2>
        </div>
        <div className="form">
          <div className="half">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <p className="description">This is the human friendly name of the item.</p>
              <br />
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={e => {
                  this.setState({
                    name: e.target.value
                  });
                }}
                placeholder="Potato"
              />
            </div>
            <div className="input-group">
              <label htmlFor="id">ID</label>
              <p className="description">This is API friendly id of the item.</p>
              <br />
              <input
                type="text"
                name="id"
                value={this.state.id}
                onChange={e => {
                  this.setState({
                    id: e.target.value
                  });
                }}
                placeholder="potato"
              />
            </div>
            <div className="input-group">
              <label htmlFor="symbol">Symbol</label>
              <p className="description">This will be the symbol used for your item on wallets, exchanges, etc.</p>
              <br />
              <input
                type="text"
                name="symbol"
                value={this.state.symbol}
                onChange={e => {
                  this.setState({
                    symbol: e.target.value
                  });
                }}
                placeholder="TATR"
              />
            </div>
          </div>
          <div className="half darker">
            <div className="input-group">
              <label htmlFor="supply">Supply</label>
              <p className="description">The total number of this item that can ever be distributed.</p>
              <br />
              <input
                type="number"
                name="supply"
                value={this.state.supply}
                onChange={e => {
                  this.setState({
                    supply: e.target.value
                  });
                }}
                placeholder="100000"
              />
            </div>
            <div className="input-group">
              <label htmlFor="metadata">Metadata</label>
              <p className="description">Optional metadata, you can store anything you'd like here!</p>
              <br />
              <input
                type="text"
                name="metadata"
                value={this.state.metadata}
                onChange={e => {
                  this.setState({
                    metadata: e.target.value
                  });
                }}
                placeholder="{ img: 'http://cdn.com/potato.jpg' }"
              />
            </div>
            <div className="input-group">
              <button
                className="no yes right hundred"
                onClick={() => {
                  console.log('this.state', this.state);
                  this.execute();
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
