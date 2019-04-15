import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "./components/Button/Button";
import {
  getCurrentUser,
  signInAnonymously,
  signOut,
  linkWithFB,
  linkWithGoogle,
  signInWithGoogle
} from "./redux/modules/auth";

class App extends Component {
  constructor(props) {
    super(props);

    this.props.getCurrentUser();
  }

  render() {
    const {
      currentUser,
      signInAnonymously,
      signOut,
      linkWithFB,
      linkWithGoogle,
      signInWithGoogle
    } = this.props;
    if (currentUser) {
      return (
        <div>
          <Button className="btn" onClick={signOut}>
            Sign out
          </Button>

          <Button className="btn" onClick={linkWithFB}>
            Link FB
          </Button>

          <Button className="btn" onClick={linkWithGoogle}>
            Link Google
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button className="btn" onClick={signInAnonymously}>
            Get started
          </Button>

          <Button className="btn" onClick={signInWithGoogle}>
            Sign in with google
          </Button>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ auth }) => ({ currentUser: auth.currentUser });

export default connect(
  mapStateToProps,
  {
    getCurrentUser,
    signInAnonymously,
    signOut,
    linkWithFB,
    linkWithGoogle,
    signInWithGoogle
  }
)(App);
