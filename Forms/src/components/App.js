import React, { Component } from "react";

import Form from './Form.js';
import '../styles/App.css';


class App extends Component {
    render() {
        return (
            <div>
                <h1>My React App!</h1>
                <Form />
            </div >
        );
    }
}

export default App;