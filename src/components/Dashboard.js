import React from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { makeStyles, AppBar, Tabs, Tab, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const Dashboard = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange} aria-label="questions tabs" centered>
          <Tab label="Unanswered Questions" {...a11yProps(0)} />
          <Tab label="Answered Questions" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {props.unansweredQuestionIds.map((id) => (
          <Question id={id} key={id} />
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.answeredQuestionIds.map((id) => (
          <Question id={id} key={id} />
        ))}
      </TabPanel>
    </div>
  );
};

function mapStateToProps({ questions, users, authedUser }) {
  const user = users[authedUser];
  if (!user) {
    return {
      answeredQuestionIds: [],
      unansweredQuestionIds: [],
    };
  }

  const answeredQuestionIds = Object.keys(user.answers).sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  const unansweredQuestionIds = Object.keys(questions)
    .filter((uq) => !answeredQuestionIds.includes(uq))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return {
    answeredQuestionIds,
    unansweredQuestionIds,
  };
}

export default connect(mapStateToProps)(Dashboard);
