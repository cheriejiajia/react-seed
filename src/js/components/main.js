import React from 'react';
import Item from './item';
import Action from '../actions/action';
import Store from '../stores/store';

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: Store.data()
    };
    this.onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    Store.addChangeListener(this.onChange);
    Action.load();
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  _onChange() {
    this.setState({ data: Store.data() });
  }

	render() {
		let data = this.state.data;
		let items = null;

		if(data.length > 0) {
			items = data.map(n => {
				return (<Item key={n.id} data={n} />);
			});
		}

		return (
			<div className="main">
				<ul>
					{items}
				</ul>
			</div>
		);
	}

}