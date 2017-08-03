import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
var server_url = 'http://localhost:1128';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.updateRepoList = this.updateRepoList.bind(this);
    this.getDataSet = this.getDataSet.bind(this);
    this.search = this.search.bind(this);
  }

  updateRepoList (repos) {
    this.setState({repos: repos});
  }

  search (term) {
    var context = this;
    $.ajax({
      method: 'POST',
      url: server_url + '/repos',
      data: JSON.stringify(term),
      success: function() {
        console.log(`${term} was searched`);
        context.getDataSet();
      },
      error: function(err, msg) {
        alert('Post Request Failed: ' + msg);
      }
    });
  }

  getDataSet () {
    // console.log('*********start getDataSet');
    var context = this;
    $.ajax({
      method: 'GET',
      url: server_url + '/repos',
      // data: JSON.stringify(term),
      success: function(repos) {
        console.log('*****updating repoList with ', repos);
        context.updateRepoList(repos);
      },
      error: function(err, msg) {
        alert('Get Request Failed: ' + msg);
      }
    });
  }

  // componentDidMount() {
  //   this.getDataSet();
  // }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
