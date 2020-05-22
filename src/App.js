import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import LoadingBar from 'react-redux-loading';

import Dashboard from './components/Dashboard';
import Nav from './components/Nav';
import PollPage from './components/PollPage';
import NewQuestion from './components/NewQuestion';
import LeaderBoard from './components/LeaderBoard';
import Signin from './components/Signin';
import PrivateRoute from './components/PrivateRoute';
import NotFoundPage from './components/NotFoundPage';
import { handleInitialData } from './actions/shared';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <BrowserRouter>
        <>
          <Nav />
          <LoadingBar />
          <Container fixed maxWidth="sm" style={{ paddingTop: '2rem' }}>
            <PrivateRoute path="/" exact component={Dashboard} />
            <PrivateRoute path="/questions/:id" component={PollPage} />
            <PrivateRoute path="/add" component={NewQuestion} />
            <PrivateRoute path="/leaderboard" component={LeaderBoard} />
            <Route path="/signin" component={Signin} />
            <Route path="/404" component={NotFoundPage} />
          </Container>
        </>
      </BrowserRouter>
    );
  }
}

export default connect()(App);
