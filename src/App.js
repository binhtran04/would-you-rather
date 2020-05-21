import React from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import LoadingBar from 'react-redux-loading';
import { BrowserRouter, Route } from 'react-router-dom';
import { handleInitialData } from './actions/shared';
import Dashboard from './components/Dashboard';
import Nav from './components/Nav';
import PollPage from './components/PollPage';
import NewQuestion from './components/NewQuestion';
import './App.css';

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
              <Route path="/new" exact component={NewQuestion} />
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
