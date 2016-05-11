import React from 'react';
import { Link } from 'react-router';
import Action from '../actions/action';
import Store from '../stores/store';

export default class Detail extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      item: Store.item()
    };
    this.onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    Store.addChangeListener(this.onChange);
    Action.getItemById(this.props.params.id);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  _onChange() {
    this.setState({ item: Store.item() });
  }

  render() {
    return (
      <div className="detail">
        <Link to="/">&lt; Back</Link>
        <p>id: {this.state.item.id}</p>
        <p>name: {this.state.item.name}</p>
        <p>description: {this.state.item.desc}</p>
      </div>
    );
  }

}