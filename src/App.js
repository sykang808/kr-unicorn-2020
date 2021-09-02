import React, { Component } from 'react';
import { Grid, Header, Input, List, Segment } from 'semantic-ui-react';

import AppLayout from "@awsui/components-react/app-layout";
import NavBar from "./NavBar";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch, NavLink} from "react-router-dom";
 
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { Connect, withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);
function makeComparator(key, order='asc') {
  return (a, b) => {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;

    const aVal = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
    const bVal = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (aVal > bVal) comparison = 1;
    if (aVal < bVal) comparison = -1;

    return order === 'desc' ? (comparison * -1) : comparison
  };
}

class ContentsList extends React.Component {
  contentItems() {
    return this.props.contents.sort(makeComparator('name')).map(content =>
      <List.Item key={content.id}>
        <NavLink to={`/contents/${content.id}`}>{content.name}</NavLink>
      </List.Item>
    );
  }

  render() {
    return (
      <Segment>
        <h3 class="ui header">My Contents</h3>
        <List divided relaxed>
          {this.contentItems()}
        </List>
      </Segment>
    );
  }
}
class CommentsList extends React.Component {
  commentItems() {
    return this.props.contents.sort(makeComparator('feedback')).map(content =>
      <List.Item key={content.id}>
        <p>{content.feedback}</p>
      </List.Item>
    );
  }

  render() {
    return (
      <Segment>
        <h3 class="ui header">Comments</h3>
        <List divided relaxed>
          {this.commentItems()}
        </List>
      </Segment>
    );
  }
}
const SubscribeToNewContents = `
  subscription OnCreateContent {
    onCreateContent {
      id
      name
    }
  }
`;
const ListContents = `{
  listContents(limit: 10) {
    items {
      id
      name
    }
  }
}`;
class ContentsListLoader extends React.Component {
  onNewContent = (prevQuery, newData) => {
      // When we get data about a new content, we need to put in into an object
      // with the same shape as the original query results, but with the new data added as well
      let updatedQuery = Object.assign({}, prevQuery);
      updatedQuery.listContents.items = prevQuery.listContents.items.concat([newData.onCreateContent]);
      return updatedQuery;
  }

  render() {
      return (
          <Connect
              query={graphqlOperation(ListContents)}
              subscription={graphqlOperation(SubscribeToNewContents)}
              onSubscriptionMsg={this.onNewContent}
          >
              {({ data, loading }) => {
                  if (loading) { return <div>Loading...</div>; }
                  if (!data.listContents) return;

              return <ContentsList contents={data.listContents.items} />;
              }}
          </Connect>
      );
  }
}
class NewContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentName: ''
      };
    }

  handleChange = (event) => {
    let change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const NewContent = `mutation NewContent($name: String!) {
      createContent(input: {name: $name , status: wait}) {
        id
        status
      }
    }`;

    const result = await API.graphql(graphqlOperation(NewContent, { name: this.state.contentName }));
    console.info(`Created content with id ${result.data.createContent.id}`);
    this.setState({ contentName: '' })
    window.location.href=`/`
  }

  render() {
    return (
      <Segment>
        <h3 class="ui header">Add a new content</h3>
        <Input
        type='text'
        placeholder='New Content Name'
        icon='plus'
        iconPosition='left'
        action={{ content: 'Create', onClick: this.handleSubmit }}
        name='contentName'
        value={this.state.contentName}
        onChange={this.handleChange}
        />
      </Segment>
      )
    }
}


function App() {
  return (
    <AppLayout 
      navigation={
        <NavBar/>
      }
      content={
        <Router>
          <Route exact path="/" component={ContentsListLoader} />
          <Route exact path="/register" component={NewContent} />
        </Router>
      }
    />
  );
}

export default withAuthenticator(App, {includeGreetings: true});