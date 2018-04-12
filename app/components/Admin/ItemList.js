// @flow
import React, { Component } from 'react';
import { apiAddr } from '../../config';

import Alert from '../Core/Alert';

export default class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      refreshing: false,
      showAlert: false,
      activeItem: '0x0'
    };
  }

  componentDidMount() {
    fetch(`${apiAddr}/item/ledger`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          this.setState({
            items: [],
            loading: false,
            refreshing: false
          });

          const tickIn = (i) => {
            const unpushed = this.state.items;
            unpushed.push(json.data[i]);
            this.setState({
              items: unpushed
            });

            if (i < json.data.length - 1) {
              setTimeout(() => { tickIn(i + 1) }, 100);
            }
          };
          tickIn(0);
        }
        return false;
      })
      .catch(e => {
        console.warn(e);
      });
  }

  refresh() {
    this.setState({ refreshing: true });

    fetch(`${apiAddr}/item/ledger`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          this.setState({
            items: [],
            refreshing: false
          });

          const tickIn = (i) => {
            const unpushed = this.state.items;
            unpushed.push(json.data[i]);
            this.setState({
              items: unpushed
            });

            if (i < json.data.length - 1) {
              setTimeout(() => { tickIn(i + 1); }, 100);
            }
          };
          tickIn(0);
        }
        return false;
      })
      .catch(e => {
        console.warn(e);
      });
  }

  buildTableData() {
    return this.state.items.map(item => {
      return (
        <tr key={`${item.name}`} className="animated flipInX">
          <td className="icon">
            <img src={`${JSON.parse(item.metadata).img}`} alt="Icon of Item" height="45" />
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
        <h2 style={{ float: 'left' }}>List Items</h2>
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
