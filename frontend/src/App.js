import "./App.css";
import React from "react";
import axios from "axios";

class App extends React.Component {
  state = { translations: [] };
  async componentDidMount() {
    let response = await axios.get("http://localhost:8080/translations");
    this.setState({
      translations: response.data,
    });
  }

  render() {
    if (this.state.translations.length === 0) {
      return <p>loading...</p>;
    } else {
      let ui = this.state.translations.map((translation) => (
        <li key={translation.id}>
          {translation.id} - {translation.english} - {translation.finnish} -{" "}
          {translation.category}
        </li>
      ));
      console.log(ui);
      return <ul>{ui}</ul>;
    }
  }
}

export default App;
