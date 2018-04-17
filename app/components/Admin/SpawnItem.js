// @flow
import React, { Component } from 'react';
import { apiAddr } from '../../config';
import Alert from '../Core/Alert';

export default class SpawnItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      showAlert: false,
      name: '',
      id: '',
      symbol: '',
      supply: '',
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
  listItemOptions() {
    return this.state.items.map((item, index) => {
      return (
        <option key={item.id} value={item.address}>{item._parsed.name}</option>
      );
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
    

  }

  render() {
    return (
      <div className="wtf">
        { this.state.showAlert &&
          <Alert
            message="New item created!"
            confirm={() => {}}
          />
        }
        <div>
          <h2 style={{ float: 'left' }}>Spawn Item</h2>
        </div>
        <div className="form">
          <div className="half">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <p className="description">This is the human friendly name of the item.</p>
              <br />
              <select >
                {
      this.listItemOptions()
    }
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="id">Item Endpoint</label>
              <p className="description">This is API friendly enpoint where the item will be located.</p>
              <br />
              <input
                type="text"
                name="id"
                onChange={e => {
                  this.setState({
                    id: e.target.value
                  });
                }}
                placeholder="/newItemname"
              />
            </div>
            
            <div className="input-group">
              <button
                className="no yes right hundred"
                onClick={() => {
                  console.log('this.state', this.state);
                }}
              >
                Spawn
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
