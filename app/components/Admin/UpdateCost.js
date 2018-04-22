// @flow
import React, { Component } from 'react';
import { apiAddr } from '../../config';
import Alert from '../Core/Alert';
import Warning from '../Core/Warning';


export default class UpdateCost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: false,
      error: false,
      cost: 0
    };
  }


  execute() {
    fetch(`${apiAddr}/lootbox/cost/${this.state.cost}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        key: 'pWpzWuxoKUKAmlHc0wPi7lFS38FTth'
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          this.setState({
            showAlert: true
          });
        } else {
          this.setState({
            error: 'Error updating lootbox cost!'
          });
        }
        return null;
      })
      .catch(e => {
        console.warn('Error updating lootbox cost', e);
        this.setState({
          error: 'Error updating lootbox cost, check console for details.'
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
            message="LootBox cost updated!"
            confirm={() => {
              this.setState({
                showAlert: false
              });
            }}
          />
        }
        <div>
          <h2 style={{ float: 'left' }}>Update Lootbox Cost</h2>
          { this.state.loading &&
            <h2
              className="refresh"
            >
              <i className="fas fa-spinner fa-pulse" />
            </h2>
          }
        </div>
        <div className="form">
          <div className="full" style={{ height: 'auto' }}>
            <div className="input-group">
              <label htmlFor="name">Lootbox cost</label>
              <p className="description">This is the cost in wei (or loot) to open a lootbox.</p>
              <br />
              <input
                type="number"
                name="name"
                onChange={e => {
                  this.setState({
                    cost: e.target.value
                  });
                }}
                placeholder="1"
              />
            </div>
            <div className="input-group">
              <button
                className="no yes hundred"
                style={{ margin: '1rem', width: 'calc(100% - 4rem)' }}
                onClick={() => {
                  this.execute();
                }}
              >
                Update LootBox Cost
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
