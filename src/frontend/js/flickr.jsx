const React = require('react')
const { flickrSearch } = require('./model')

module.exports = React.createClass({
  displayName: 'Flicker',

  // getInitialState :: term :: String result :: [url]
  getInitialState() { return {term: '', results:[<img src={} key={'1'} />, <img src={} key={'2'} />, <img src={} key={'3'} />]} },

  // termChanged :: Event -> State term
  termChanged({currentTarget: t}) { this.setState({term: t.value}) },

  // updateResults :: Event -> State Results
  updateResults( xs ) { this.setState({results: xs}) },

  // searchClicked :: Event -> ?
  searchClicked(_) { flickrSearch(this.state.term).fork(this.props.showError, this.updateResults) },

  render() {
    const imgs = this.state.results.map(src => <img src={src} key={src} />)
    return (
      <div id="flickr">
        <input onChange={this.termChanged}/>
        <button onClick={this.searchClicked}>SEARCH</button>
        <div id="results">
        {this.state.results}
        </div>
      </div>
    );
  }
});

