// @flow
import React, { Component } from 'react';
import { apiAddr } from '../../config';
import Alert from '../Core/Alert';
import Warning from '../Core/Warning';


export default class AddLootable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      showAlert: false,
      error: false,
      loading: true,
      itemAddress: '',
      rarity: 'common'
    };
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

  listItemOptions() {
    return this.state.items.map((item) => {
      return (
        <option key={item.id} value={item.address}>{item._parsed.name}</option>
      );
    });
  }

  execute() {
    fetch(`${apiAddr}/lootbox/item/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        key: localStorage.getItem('apikey')
      },
      body: JSON.stringify({
        item: this.state.itemAddress,
        rarity: this.state.rarity
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
            error: 'Error adding item to loot table!'
          });
        }
        return null;
      })
      .catch(e => {
        console.warn('Error adding item to loot table', e);
        this.setState({
          error: 'Error adding item to loot table, check console for details.'
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
            message="Item successfully added to loot table!"
            confirm={() => {
              this.setState({
                showAlert: false
              });
            }}
          />
        }
        <div>
          <h2 style={{ float: 'left' }}>Add Lootbox Item</h2>
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
              <p className="description">This is the item you wish to add to the loot table.</p>
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
              <label htmlFor="id">Rarity Level</label>
              <p className="description">This is the the rarity of the item, chances are defined by the publisher.</p>
              <br />
              <select
                onChange={e => {
                  this.setState({
                    rarity: e.target.value
                  });
                }}
              >
                <option value="common">common</option>
                <option value="uncommon">uncommon</option>
                <option value="rare">rare</option>
                <option value="epic">epic</option>
              </select>
            </div>
            <div className="input-group">
              <button
                className="no yes hundredDistribute"
                style={{ margin: '1rem', width: 'calc(100% - 4rem)' }}
                onClick={() => {
                  this.execute();
                }}
              >
                Add Lootbox Item
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
