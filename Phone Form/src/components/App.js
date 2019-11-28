import React, { Component } from "react";

import '../styles/App.css';

let curPos = 0;

class MyPhoneInput extends Component {
    constructor(props) {
        super(props);

        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleChange(event) {
        // console.log(event.target.value[event.target.value.length - 1].match(/[0-9]/), event.target.value.length);
        // let symb = event.target.value[event.target.value.length - 1];
        // if (event.target.value.length <= 18) {

        //     this.setState({ value: event.target.value });
        // }
    }

    handleKeyDown(event) {
        event.preventDefault();
        let key = event.key;
        let len = event.target.value.length;
        if (key == 'Backspace') {
            if (len ===2 || len === 4 || len === 8 || len === 13 || len === 16) this.setState({ value: event.target.value.substring(0, event.target.value.length - 2) });
            else if (len === 5 || len === 9) this.setState({ value: event.target.value.substring(0, event.target.value.length - 3) });
            else this.setState({ value: event.target.value.substring(0, event.target.value.length - 1) });

            return;
        }
        if (len === 0) {
            if (key === '+') this.setState({ value: event.target.value + key });
            else if (key === '7') this.setState({ value: '+7' });
            else if (key === '8') this.setState({ value: '+7' });

        }
        else if (len === 1) {
            if (key === '7') this.setState({ value: event.target.value + key });
        }
        else if (len === 2) {
            if (key === ' ') this.setState({ value: event.target.value + key });
            else if (key === '(') this.setState({ value: event.target.value + ' ' + key });
            else if (key.match(/^[0-9]$/)) this.setState({ value: event.target.value + ' (' + key });
        }
        else if (len === 3) {
            if (key === '(') this.setState({ value: event.target.value + key });
            else if (key.match(/^[0-9]$/)) this.setState({ value: event.target.value + '(' + key });
        }
        else if (len === 7) {
            if (key === ')') this.setState({ value: event.target.value + key });
            else if (key === ' ') this.setState({ value: event.target.value + ')' + key });
            else if (key.match(/^[0-9]$/)) this.setState({ value: event.target.value + ') ' + key });
        }
        else if (len === 8) {
            if (key === ' ') this.setState({ value: event.target.value + key });
            else if (key.match(/^[0-9]$/)) this.setState({ value: event.target.value + ' ' + key });
        }
        else if (len === 12 || len === 15) {
            if (key === '-') this.setState({ value: event.target.value + key });
            else if (key.match(/^[0-9]$/)) this.setState({ value: event.target.value + '-' + key });
        }
        else if (len < 18) {
            if (key.match(/^[0-9]$/)) {
                this.setState({ value: event.target.value + key });
            }
        }

    }

    render() {
        return (
            <form onChange={this.handleInput}>
                <label>
                    Телефон:
                    <input name='phone' value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
                </label>
            </form>
        )
    }
}

class App extends Component {
    render() {
        return (
            <div>
                <h1>My React App!</h1>
                <MyPhoneInput></MyPhoneInput>
            </div>
        );
    }
}

export default App;