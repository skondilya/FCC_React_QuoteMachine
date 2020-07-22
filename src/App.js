import React from 'react';
import './index.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text:"",
      author:""
    }
    this.generateRandomQuote = this.generateRandomQuote.bind(this);
  }
  componentWillMount(){
    this.generateRandomQuote();
  }
  generateRandomQuote(){
      const RandomNumber=function(max){
        return Math.floor(Math.random()*Math.floor(max))
      };
    fetch('https://type.fit/api/quotes')
    .then((Response)=> Response.json())
    .then((data)=>{
          var quote=data[RandomNumber(data.length-1)].text;
          var author="";
          if(data[RandomNumber(data.length-1)].author==null){
            author="Unknown";
            } else{
            author=data[RandomNumber(data.length-1)].author;
          }
          this.setState({
          text:quote,
          author:author
          })
    }).catch((err)=>console.log('Error is '+err))
  }
  render() {
    return (
      <div className="App">
        <h1>The Quote Machine</h1>
        <div id="quote-box" className="border ">
          <div id="quote-text" className="text-sm-center">
          <i className="fa fa-quote-left quote-icon"> </i><span> {this.state.text}</span></div>
          <div id="author-div">- {this.state.author}</div>
          <button id="new-quote" onClick={this.generateRandomQuote}>
            New Quote
          </button>
          <button>
          <a
              href={`https://twitter.com/intent/tweet?text="${this.state.text}" %0D%0A- ${this.state.author}%0D%0A`}
              id="tweet-quote"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-twitter twitter"/>
            </a>
          </button>
        </div>
      </div>
    );
  }
}
export default App;
