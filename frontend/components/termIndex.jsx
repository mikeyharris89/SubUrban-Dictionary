var React = require('react'),
    TermStore = require('../stores/term_store'),
    ClientActions = require('../actions/client_actions'),
    TermIndexItem = require('./termIndexItem');


var TermIndex = React.createClass({
  getInitialState: function () {
    return ({ terms: TermStore.all() });
  },

  componentDidMount: function () {
    this.listener = TermStore.addListener(this.getTerms);
    ClientActions.fetchTerms();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  getTerms: function () {
    this.setState({ terms: TermStore.all()});
  },


  render: function () {

    var welcome = "Welcome to Suburban Dictionary:\
     Your favoite place to be as raunchy as possible.\
     And by raunchy we mean, clean and whitewashed. Just like the suburbs!\
     So add your favorite definitions, or add another definition to a word you\
     already see here! So here's to a culture of boredom, gossip,\
     and old money! Suggested terms: Sperry's, Classic, Hamptons\
     Summer Home, Roth IRA, Foyer, Chardonnay";
    return(
      <div className="content group">

        <ul className="index-terms">
        {
          this.state.terms.map(function(term){
            return (<TermIndexItem key={term.id} term={term}/>);
          })
        }
        </ul>
        <div className="panel">
          <img className="gif" src="assets/margot.gif" alt="Margot" title="Margot"/>
          <div className="slogan-box">
            <div>SUBURBAN</div>
            <div>DICTIONARY</div>
            <div>IS WRITTEN</div>
            <div>BY YOU</div>
          </div>
          <p>{welcome}</p>
        </div>
    </div>
    );
  }
});

module.exports = TermIndex;
