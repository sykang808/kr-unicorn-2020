import React, { Component } from 'react';
import { Grid, Header, Input, List, Segment, Table } from 'semantic-ui-react';

import AppLayout from "@awsui/components-react/app-layout";
import NavBar from "./NavBar";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch, NavLink} from "react-router-dom";
 
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { Connect, withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports';
import { Auth } from 'aws-amplify';

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
    return this.props.contents.sort(makeComparator('createdAt')).map(content =>
      <List.Item key={content.id}>
          <NavLink to={`/contents/${content.id}`}>{content.name}</NavLink>
            <td>owner : {content.owner}</td> 
            <tr>time : {content.createdAt} </tr>
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
    return this.props.contents.sort(makeComparator('createdAt')).map(content =>
      <List.Item key={content.id}>
        <p>{content.owner} : {content.feedback} {content.createdAt}</p>
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
      owner
    }
  }
`;
const ListContents = `{
  listContents(limit: 10) {
    items {
      id
      name
      createdAt
      owner
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
    const NewContent = `mutation NewContent($name: String! $owner: String!) {
      createContent(input: {name: $name ,owner: $owner ,status: wait}) {
        id
        status
        owner
      }
    }`;
    let user = await Auth.currentAuthenticatedUser();
    const result = await API.graphql(graphqlOperation(NewContent, { name: this.state.contentName, owner: user.username }));
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

const GetContent = `query GetContent($id: ID!) {
  getContent(id: $id) {
    contentType
    createdAt
    description
    id
    link
    name
    owner
    s3img
    status
    updatedAt
    usedService
    categorty
  }
}
`;
class ContentDetails extends Component {
  
  render() {
    return (
      <Segment>
        <h3 class="ui header">{this.props.content.name}</h3>
        
        <Segment>
          <p>CREAT AT: {this.props.content.createdAt}</p>
          <p>ID : {this.props.content.id}</p>
          <p>OWNER: {this.props.content.owner}</p>
          <p>STATUD: {this.props.content.status}</p>
          <p>UPDATE AT{this.props.content.updatedAt}</p>
        </Segment>
        <CommentListLoader contents={this.props.content.id}/>
        <NewComment contents={this.props.content.id}/>
      </Segment>
        
    )
  }
}
const ListComments = `query ListComments($eq: ID!) {
  listComments(filter: {contentID: {eq: $eq}}) {
    items {
      contentID
      id
      createdAt
      feedback
      owner
    }
  }
}
`;
class ContentDetailsLoader extends React.Component {
  render() {
    return (
      <Connect query={graphqlOperation(GetContent, { id: this.props.id })}>
        {({ data, loading }) => {
          if (loading) { return <div>Loading...</div>; }
          if (!data) { return  <div>ID : {this.props.id} Data null...</div>; } 
          if (!data.getContent) return;

          return <ContentDetails content={data.getContent} />;
        }}
      </Connect>
    );
  }
}

class NewComment extends Component {
  constructor(props) {
    super(props);  
  }

  handleChange = (event) => {
    let change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const NewComment = `mutation NewComment($feedback: String!, $contentID: ID!, $owner: String!) {
      createComment(input: {contentID: $contentID, feedback: $feedback, owner: $owner}) {
        contentID
        feedback
        id
      }
    }
    `;
    let user = await Auth.currentAuthenticatedUser();
    const result = await API.graphql(graphqlOperation(NewComment, { feedback: this.state.commentName , contentID: this.props.contents , owner: user.username }));
    console.info(`Created comment with id ${result.data.createComment.id}`);
    this.setState({ commentName: '' })
    window.location.href=`/contents/` + this.props.contents;
  }

  render() {
    return (
        <Input
        type='text'
        placeholder='New Comment'
        icon='plus'
        iconPosition='left'
        action={{ content: 'Add', onClick: this.handleSubmit }}
        name='commentName'
        value={this.props.content}
        onChange={this.handleChange}
        />
      
      )
    }
}
class CommentListLoader extends React.Component {
  
  render() {
      return (
          <Connect query={graphqlOperation( ListComments, { eq: this.props.contents })} >
              {({ data, loading }) => {
                  if (loading) { return <div>Loading...</div>; }
                  if (!data) return;
                  if (!data.listComments) return;
              return <CommentsList contents={data.listComments.items} />;
              }}
          </Connect>
          
      );
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
          <Route
            path="/contents/:contentId"
            render={ props => <ContentDetailsLoader id={props.match.params.contentId}/> }
          />
        </Router>
        
      }
    />
  );
}

export default withAuthenticator(App, {includeGreetings: true});