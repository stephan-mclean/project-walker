import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          vestibulum vestibulum erat nec faucibus. Ut vitae augue justo. Morbi
          sit amet auctor ante. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia Curae; Nunc lobortis hendrerit
          malesuada. Aenean mattis diam vitae velit finibus, sed mollis ex
          tristique. Maecenas hendrerit mollis cursus. Fusce blandit velit
          euismod, imperdiet risus et, pellentesque urna. Aliquam erat volutpat.
          Etiam in justo fermentum lectus hendrerit imperdiet ac ac neque. Ut
          vel ornare lacus. Morbi et gravida lacus, vitae porta diam. Mauris
          commodo ultricies aliquet. Vivamus lectus nunc, rutrum non ante vel,
          sagittis faucibus nisi. Proin in risus malesuada, molestie arcu
          faucibus, sagittis odio.
        </p>

        <button className="btn">Button</button>
        <button className="btn btn--primary">Button</button>
        <button className="btn btn--danger">Button</button>
        <button className="btn btn--inverted">Button</button>
        <button className="btn btn--outline">Button</button>
        <button className="btn btn--link">Button</button>
        <button className="btn btn--primary btn--link">Button</button>
        <button className="btn" disabled>
          Button
        </button>
      </div>
    );
  }
}

export default App;
