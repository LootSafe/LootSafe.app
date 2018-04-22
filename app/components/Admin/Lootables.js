// @flow
import React, { Component } from 'react';

import Alert from '../Core/Alert';
import Warning from '../Core/Warning';

const apiAddr = localStorage.getItem('apiurl');

export default class Lootables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rarities: [
        'epic',
        'rare',
        'uncommon',
        'common'
      ],
      items: [],
      ledger: [],
      loading: true,
      showAlert: false,
      activeItem: '0x0',
      error: false
    };
  }

  componentDidMount() {
    fetch(`${apiAddr}/item/ledger`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          this.setState({
            ledger: json.data,
            loading: false
          });
          let tempItems = [];

          this.state.rarities.map(rarity => {
            fetch(`${apiAddr}/lootbox/items/${rarity}`)
              .then(res => res.json())
              .then(json2 => {
                const items = json2.data;
                items.map(item => {
                  let modifiedItem = json.data.filter(i => i.address = item)[0];
                  modifiedItem.rarity = rarity;
                  console.log('modifiedItem', modifiedItem.address);
                  tempItems.push(modifiedItem);
                });
                console.log('tempItems', tempItems)
              })
              .catch(e => {
                this.setState({
                  error: 'Error fetching items, check console for details.'
                });
                console.warn('Error fetching items', e);
              });
          });
        }
        return false;
      })
      .catch(e => {
        this.setState({
          error: 'Error fetching items, check console for details.'
        });
        console.warn('Error fetching items', e);
      });

  }

  checkMetadataFormat(meta) {
    try {
      const img = JSON.parse(meta).img;
      return true;
    } catch (e) {
      return false;
    }
  }

  buildTableData() {
    return this.state.items.map(item => {
      return (
        <tr key={`${item.name}`} className="animated flipInX">
          <td className="icon">
            { this.checkMetadataFormat(item.metadata) &&
              <img src={`${JSON.parse(item.metadata).img}`} alt="Icon of Item" height="45" />
            }
          </td>
          <td>{item._parsed.name}</td>
          <td className="address">{item.address}</td>
          <td>{item._parsed.symbol}</td>
          <td>{item._parsed.id}</td>
          <td>{item.totalSupply}</td>
          <td>
            { parseInt(item.ownerBalance, 0) > 0 &&
              <button
                className="no yes delist"
                onClick={() => {
                  this.setState({ showAlert: true, activeItem: item.address });
                }}
              >
                Delsit
              </button>
            }
            { parseInt(item.ownerBalance, 0) === 0 &&
              <button
                className="no delisted"
                onClick={() => {
                  this.setState({ showAlert: true, activeItem: item.address });
                }}
              >
                Delsited
              </button>
            }
          </td>
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
        <h2 style={{ float: 'left' }}>List Items</h2>
        <table>
          <tr className="table-heading">
            <th>Icon</th>
            <th>Name</th>
            <th>Address</th>
            <th>Symbol</th>
            <th>Id</th>
            <th>Supply</th>
            <th>Delist</th>
          </tr>
          {this.buildTableData()}
          { this.state.loading &&
            <tr className="loading">
              <td />
              <td />
              <td />
              <td>
                <i className="fas fa-spinner fa-pulse" style={{ fontSize: '40pt' }} />
              </td>
              <td />
              <td />
              <td />
            </tr>
          }
        </table>
      </div>
    );
  }
}
