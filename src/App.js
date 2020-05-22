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
import LeaderBoard from './components/LeaderBoard';
import Signin from './components/Signin';
import './App.css';

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
          <Container fixed maxWidth="sm">
            {this.props.loading === true ? null : (
              <>
                <Route path="/" exact component={Dashboard} />
                <Route path="/questions/:id" component={PollPage} />
                <Route path="/add" component={NewQuestion} />
                <Route path="/leaderboard" component={LeaderBoard} />
                <Route path="/signin" component={Signin} />
              </>
            )}
          </Container>
        </>
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
