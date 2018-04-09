// @flow
import React, { Component } from 'react';
import { apiAddr } from '../../config';

export default class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      refreshing: false
    };
  }
  componentDidMount() {
    fetch(`${apiAddr}/item/ledger`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          this.setState({
            items: json.data,
            loading: false
          });
          console.log(json.data);
        } else {
          this.setState({
            error: json.message || 'Unknown error!'
          });
        }
        return false;
      })
      .catch(e => {
        console.warn(e);
      });
  }

  refresh() {
    this.setState({ refreshing: true, loading: true });

    fetch(`${apiAddr}/item/ledger`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          this.setState({
            items: json.data,
            loading: false,
            refreshing: false
          });
          console.log(json.data);
        } else {
          this.setState({
            error: json.message || 'Unknown error!'
          });
        }
        return false;
      })
      .catch(e => {
        console.warn(e);
      });
  }

  buildTableData() {
    return this.state.items.map((item, i) => {
      return (
        <tr key={`${item.name}-${i}`}>
          <td><img src={`${JSON.parse(item.metadata).img}`} width="45"/></td>
          <td>{item._parsed.name}</td>
          <td className="address">{item.address}</td>
          <td>{item._parsed.symbol}</td>
          <td>{item._parsed.id}</td>
          <td>{item.totalSupply}</td>
          <td></td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="wtf">
        <h2 style={{ float: 'left' }}>List Items</h2>
        <h2 className="refresh" onClick={() => { 
          this.refresh();
        }}>
          <i className={this.state.refreshing ? "fas fa-spin fa-sync" : "fas fa-sync"}></i>
        </h2>
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
                <i className="fas fa-spinner fa-pulse" style={{fontSize: '40pt'}}></i>
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
