var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
var LoginForm = require('./components/loginForm');
var App = require('./components/app');
var TermIndex = require('./components/termIndex');


var router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ TermIndex } />
      <Route path="login" component={ LoginForm } />
      <Route path="signup" component={ LoginForm } />
    </Route>
  </Router>
);
function _ensureLoggedIn(nextState, replace, asyncDoneCallback) {
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
  }

  function redirectIfNotLoggedIn() {
    if (!SessionStore.isUserLoggedIn()) {

      replace('/login');
    }
    asyncDoneCallback();
  }
}

document.addEventListener('DOMContentLoaded', function(){
  var root = document.getElementById('content');
  ReactDOM.render(router, root);
});
