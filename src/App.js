import React, { Component } from "react";
import "./App.css";
import Output from "./components/Output";
import Select from "./components/controls/Select";
import Text from "./components/controls/Text";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paras: 4,
      format: 'html',
      text: [],
    };
  }

  componentWillMount() {
    this.getSampleText();
  }

  getSampleText() {
    axios
      .get("https://baconipsum.com/api/?type=meat-and-filler&paras="+this.state.paras+"&format="+this.state.format)
      .then((response) => {
        this.setState({ text: response.data }, function () {
          console.log(this.state);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showHTML(x) {
    this.setState({ format: x }, this.getSampleText);
  }

  changeParas(num) {
    this.setState({ paras: num }, this.getSampleText);
  }

  render() {
    return (
      <div className="App container">
        <h1>ReactJS Sample Text Generator</h1>
        <hr />
        <form className="form-inline">
          <div className="form-group">
            <label>Paragraphs: </label>
            <Text
              value={this.state.paras}
              onChange={this.changeParas.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Include HTML: </label>
            <Select
              value={this.state.format}
              onChange={this.showHTML.bind(this)}
            />
          </div>
        </form>
        <br/>
        <Output value={this.state.text} />
      </div>
    );
  }
}

export default App;
