// @flow
import React, { Component } from 'react';

import Alert from '../Core/Alert';
import Warning from '../Core/Warning';

const apiAddr = localStorage.getItem('apiurl');

export default class NewRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      error: false,
      showAlert: false,
      reqCount: 1,
      name: '',
      id: '',
      symbol: '',
      supply: '',
      metadata: ''
    };

    this.buildItemOptions = this.buildItemOptions.bind(this);
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

  buildItemOptions() {
    return this.state.items.map((item, index) => {
      return (
        <option key={item.id} value={item.address}>{item._parsed.name}</option>
      );
    });
  }

  buildRequirements() {
    return [...Array(this.state.reqCount)].map((i, index) => {
      return (
        <div key={`requirement-${index}`} className="input-group iterator" style={{ padding: '1rem' }}>
          <label htmlFor="id">Required Item</label>
          <p className="description">This is one of the required items used to craft target.</p>
          <br />
          <select>
            { this.buildItemOptions() }
          </select>
          <br />
          <br />
          <label htmlFor="id">Required Amount</label>
          <p className="description">How many of this item are required?</p>
          <br />
          <input
            type="number"
            name="id"
            onChange={e => {
              this.setState({
                id: e.target.value
              });
            }}
            placeholder="1"
          />
        </div>
      );
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
            message="New recipe created!"
            confirm={() => {
              this.setState({
                showAlert: false
              });
            }}
          />
        }
        <div>
          <h2 style={{ float: 'left' }}>New Crafting Recipe</h2>
        </div>
        <div className="form">
          <div className="input-group" style={{ padding: '1rem' }}>
            <label htmlFor="name">Target Item</label>
            <p className="description">This is the item which will be crafted.</p>
            <br />
            <select>
              { this.buildItemOptions() }
            </select>
          </div>

           
          <div className="darker" style={{ position: 'relative' }}>
            { this.buildRequirements() }
            <div className="input-group" style={{ padding: '1rem', marginTop: '3rem' }}>
              <button
                className="no yes hundred"
                onClick={() => {
                  this.setState({
                    reqCount: this.state.reqCount + 1
                  });
                }}
              >
                Add Another Requirement
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
