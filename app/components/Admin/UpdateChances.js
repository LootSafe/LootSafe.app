// @flow
import React, { Component } from 'react';
import { apiAddr } from '../../config';
import Alert from '../Core/Alert';
import Warning from '../Core/Warning';


export default class UpdateChances extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: false,
      error: false
    };
  }


  execute() {
    fetch(`${apiAddr}/lootbox/chances/update/${this.state.epicChance}/${this.state.rareChance}/${this.state.uncommonChance}`, {
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
            error: 'Error updating loot table chances!'
          });
        }
        return null;
      })
      .catch(e => {
        console.warn('Error updating loot table chances', e);
        this.setState({
          error: 'Error updating loot table chances, check console for details.'
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
            message="LootBox chances updated!"
            confirm={() => {
              this.setState({
                showAlert: false
              });
            }}
          />
        }
        <div>
          <h2 style={{ float: 'left' }}>Update Lootbox Chances</h2>
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
              <label htmlFor="name">Epic Chance</label>
              <p className="description">This is the percent chance you'll receive an epic item.</p>
              <br />
              <input
                type="number"
                name="name"
                onChange={e => {
                  this.setState({
                    epicChance: e.target.value
                  });
                }}
                placeholder="1"
              />
            </div>
            <div className="input-group">
              <label htmlFor="name">Rare Chance</label>
              <p className="description">This is the percent chance you'll receive a rare item.</p>
              <br />
              <input
                type="number"
                name="name"
                onChange={e => {
                  this.setState({
                    rareChance: e.target.value
                  });
                }}
                placeholder="3"
              />
            </div>
            <div className="input-group">
              <label htmlFor="name">Uncommon Chance</label>
              <p className="description">This is the percent chance you'll receive a uncommon item.</p>
              <br />
              <input
                type="number"
                name="name"
                onChange={e => {
                  this.setState({
                    uncommonChance: e.target.value
                  });
                }}
                placeholder="20"
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
                Update LootBox Chances
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
