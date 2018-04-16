// @flow
import React, { Component } from 'react';

import Alert from '../Core/Alert';
import Warning from '../Core/Warning';

const apiAddr = localStorage.getItem('apiurl');

export default class Deconstructables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      recipes: {}
    };

    this.buildTableData = this.buildTableData.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    fetch(`${apiAddr}/deconstructables`)
      .then(res => res.json())
      .then(json => {
        let craftables = json.data;
        // HACK: remove when duplicate craftables are fixed
        craftables = craftables.filter((item, pos) => {
          return craftables.indexOf(item) === pos;
        });
        console.log('craftables', craftables);

        fetch(`${apiAddr}/item/ledger`)
          .then(res => res.json())
          .then(ledger => {
            const items = [];
            craftables.map(craftable => {
              const item = ledger.data.filter(i => i.address === craftable);
              if (item[0]) {
                items.push(item[0]);
                fetch(`${apiAddr}/recipe/deconstruction/get/${item[0].address}`)
                  .then(res => res.json())
                  .then(recipe => {
                    this.setState({
                      recipes: Object.assign({}, this.state.recipes, {
                        [item[0].address]: recipe.data
                      })
                    });
                    return null;
                  })
                  .catch(e => {
                    console.warn('Error fetching recipe', e);
                    this.setState({
                      error: 'Error fetching recipe, check console.'
                    });
                  });
              }
            });
            this.setState({
              items,
              ledger: ledger.data,
              loading: false,
              refreshing: false
            });
            return null;
          })
          .catch(e => {
            console.warn('Error fetching item', e);
            this.setState({
              error: 'Error fetching item, check console.'
            });
          });
        return null;
      })
      .catch(e => {
        console.warn('Error getting craftables', e);
        this.setState({
          error: 'Error getting craftables, check console.'
        });
      });
  }

  refresh() {
    this.setState({ refreshing: true });
    this.getData();
  }


  checkMetadataFormat(meta) {
    try {
      const img = JSON.parse(meta).img;
      return true;
    } catch (e) {
      return false;
    }
  }

  renderRequirements(reqs, address) {
    return reqs[0].map((req, i) => {
      const item = this.state.ledger.filter(i => i.address === req);
      if (item[0]) {
        console.log('item', item)
        return (
          <span>
            {`${item[0]._parsed.name} (${reqs[1][i]}), `}
          </span>
        );
      }
    });
  }

  buildTableData() {
    return this.state.items.map((item, i) => {
      return (
        <tr key={`${item.name}-${i}`} className="animated flipInX">
          <td className="icon">
            { this.checkMetadataFormat(item.metadata) &&
              <img src={`${JSON.parse(item.metadata).img}`} alt="Icon of Item" height="45" />
            }
          </td>
          <td >{item._parsed.name}</td>
          <td className="address">
            { this.state.recipes[item.address] &&
              <span>{this.renderRequirements(this.state.recipes[item.address], item.address)}</span>
            }
          </td>
          <td>{item._parsed.id}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="wtf">
        { this.state.showAlert &&
          <Alert
            message="Really remove new supply of items?"
            cancel={() => {
              this.setState({ showAlert: false });
            }}
            confirm={() => {
              this.setState({ refreshing: true });
              fetch(`${apiAddr}/item/clearAvailability`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  key: 'pWpzWuxoKUKAmlHc0wPi7lFS38FTth'
                },
                body: JSON.stringify({
                  itemAddress: this.state.activeItem
                })
              })
              .then(res => res.json())
              .then(() => {
                this.setState({ showAlert: false });
                this.refresh();
                return null;
              })
              .catch(e => {
                console.log('Error clearing availability', e);
              });
            }}
          />
        }
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
        <h2 style={{ float: 'left' }}>Deconstruction Recipes</h2>
        { !this.state.refreshing &&
          <h2
            className="refresh"
            onClick={() => {
              this.refresh();
            }}
          >
            <i className="fas fa-sync" />
          </h2>
        }
        { this.state.refreshing &&
          <h2
            className="refresh"
            onClick={() => {
              this.refresh();
            }}
          >
            <i className="fas fa-spin fa-sync" />
          </h2>
        }
        <table>
          <tr className="table-heading">
            <th>Icon</th>
            <th>Name</th>
            <th>Requirements</th>
            <th>Id</th>
          </tr>
          {this.buildTableData()}
          { this.state.loading &&
            <tr className="loading">
              <td />
              <td />
              <td>
                <i className="fas fa-spinner fa-pulse" style={{ fontSize: '40pt' }} />
              </td>
              <td />
              <td />
            </tr>
          }
        </table>
      </div>
    );
  }
}
