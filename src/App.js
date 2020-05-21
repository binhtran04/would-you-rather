import React from 'react';
import './App.css';
import { handleInitialData } from './actions/shared';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import Dashboard from './components/Dashboard';
import LoadingBar from 'react-redux-loading';
import Nav from './components/Nav';
import { BrowserRouter, Route } from 'react-router-dom';
import PollPage from './components/PollPage';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <BrowserRouter>
        <Container fixed maxWidth="md">
          <Nav />
          <LoadingBar />
          {this.props.loading === true ? null : (
            <div>
              <Route path="/" exact component={Dashboard} />
              <Route path="/questions/:id" exact component={PollPage} />
              <Route path="/new" exact component={Dashboard} />
            </div>
          )}
        </Container>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
