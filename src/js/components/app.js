import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import Store from '../stores/store';
import Action from '../actions/action';
import Header from './header';
import Main from './main';
import Footer from './footer';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: Store.error()
    };
    this.onChange = this._onChange.bind(this);
    this.closeError = this._closeError.bind(this);
  }

  componentDidMount() {
    Store.addErrorListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeErrorListener(this.onChange);
  }

  _onChange() {
    this.setState({ error: Store.error() });
  }

  _closeError() {
    Action.error(false);
  }

  render() {
    let ui = (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );

    return (
      <div>
        {ui}

        <Modal show={this.state.error.error} onHide={this.closeError}>
          <Modal.Header closeButton>
            <Modal.Title>Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.error.message}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeError}>Close</Button>
          </Modal.Footer>
        </Modal>        
      </div>
    );
  }

}
