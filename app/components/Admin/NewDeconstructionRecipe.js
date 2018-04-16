// @flow
import React, { Component } from 'react';

import Alert from '../Core/Alert';
import Warning from '../Core/Warning';

const apiAddr = localStorage.getItem('apiurl');

export default class NewDeconstructionRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      error: false,
      loading: true,
      showAlert: false,
      reqCount: 1,
      craftedItem: false,
      requiredItems: [],
      requiredCounts: []
    };

    this.buildItemOptions = this.buildItemOptions.bind(this);
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

  execute() {
    fetch(`${apiAddr}/recipe/deconstruction/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        key: 'pWpzWuxoKUKAmlHc0wPi7lFS38FTth'
      },
      body: JSON.stringify({
        result: this.state.craftedItem,
        materials: this.state.requiredItemsm,
        counts: this.state.requiredCounts
      })
    })
      .then(res => res.json())
      .then(json => {
        const content = document.getElementById('content');
        content.scrollTop = 0;
        if (json.status === 200) {
          console.log('test');
          this.setState({
            showAlert: true
          });
        } else {
          this.setState({
            error: 'Error creating new recipe!'
          });
        }
        return null;
      })
      .catch(e => {
        console.warn('Error creating new recipe', e);
        this.setState({
          error: 'Error creating new recipe, check console for details.'
        });
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
        <div key={`requirement-${index}`} className="input-group iterator" style={{ padding: '2rem 1rem' }}>
          <label htmlFor="id">Required Item</label>
          <p className="description">This is one of the required items received when deconstructing the target.</p>
          <br />
          {
          /*
            on change set requiredCounts[index] = val
            requiredItems[index] = val
          */
          }
          <select
            onChange={e => {
              const unmod = this.state.requiredItems;
              unmod[index] = e.target.value;
              this.setState({
                requiredItems: unmod
              });
            }}
          >
            { this.buildItemOptions() }
          </select>
          <br />
          <br />
          <label htmlFor="id">Required Amount</label>
          <p className="description">How many of this item are received?</p>
          <br />
          <input
            type="number"
            name="id"
            onChange={e => {
              const unmod = this.state.requiredCounts;
              unmod[index] = e.target.value;
              this.setState({
                requiredCounts: unmod
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
          <h2 style={{ float: 'left' }}>New / Update Deconstructing Recipe</h2>
          { this.state.loading &&
            <h2
              className="refresh"
            >
              <i className="fas fa-spinner fa-pulse" />
            </h2>
          }
        </div>
        <div className="form">
          <div className="input-group" style={{ padding: '3rem 2rem' }}>
            <label htmlFor="name">Target Item</label>
            <p className="description">This is the item which will be dismantled.</p>
            <br />
            <select
              onChange={e => {
                this.setState({
                  craftedItem: e.target.value
                });
              }}
            >
              { this.buildItemOptions() }
            </select>
          </div>

           
          <div className="darker" style={{ position: 'relative' }}>
            { this.buildRequirements() }
            <div className="input-group" style={{ padding: '1rem', marginTop: '3rem' }}>
              <button
                className="no hundred iteratorBtn"
                onClick={() => {
                  this.setState({
                    reqCount: this.state.reqCount + 1
                  });
                }}
              >
                <i className="fas fa-plus"></i> Add Another Result
              </button>
            </div>
          </div>

          <div className="darker" style={{ position: 'relative', padding: '3rem 2rem' }}>
            <label>Ready?</label>
            <p className="description">If you're all ready just hit create below and we'll add your recipe to the chain.</p>
            <div className="input-group" style={{ padding: '1rem', marginTop: '3rem' }}>
              <button
                className="no yes hundred iteratorBtn"
                onClick={() => {
                  this.execute();
                }}
              >
                Create Deconstruction Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
