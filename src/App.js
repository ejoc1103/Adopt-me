import React from "react";
import { render } from "react-dom";
import { Link, Router } from "@reach/router";
import Details from "./Details";
import SearchParams from "./SearchParams";

const App = () => {
  return (
    <div id="something-important">
      <header>
        <Link to="/">Adopt Me!</Link>
      </header>
      <Router>
        <SearchParams path="/" />
        <Details path="/details/:id" />
      </Router>
    </div>
  );
};

render(<App />, document.getElementById("root"));
