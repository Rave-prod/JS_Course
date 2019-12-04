import React, { Component } from 'react';

import { Text } from './Text.js';
import { Preview } from './Preview.js'

import '../styles/Form.css';


class Form extends Component {
    constructor(props) {
        super(props);

        var data = '';

        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            name: '',
            card: '',
            fileName: '',
            fileSize: '',
            fileUrl: '',
            text: '',
            isTextVisible: false,
            isCardValid: true
        }
    }

    validateCard(cardNumber) {
        cardNumber = cardNumber.replace(/ /g, '');
        console.log(cardNumber);
        let digits = cardNumber.split('');
        let even = 0;
        let odd = 0;
        console.log(digits);
        if (digits.length === 16) {
            for (let i = 0; i < digits.length - 1; ++i) {
                if (digits[i] % 2 === 1) {
                    odd += Number(digits[i]);
                } else {
                    even += Number(digits[i]);
                }
            }
            let res = 9 * (odd * 2 + even);
            this.setState({ isCardValid: !(res % 10 !== Number(digits[digits.length - 1])) });
        } else {
            this.setState({ isCardValid: true });
        }
    }

    handleUserInput(event) {
        const name = event.target.name;
        let value = event.target.value;
        var rep = /^/;

        switch (name) {
            case 'name':
                rep = /^[a-zA-Zа-яА-Я\-]* ?[a-zA-Zа-яА-Я\-]*$/;
                break;
            case 'card':
                rep = /^[0-9]{0,4} ?[0-9]{0,4} ?[0-9]{0,4} ?[0-9]{0,4}$/;
                break;
        }
        if (name !== 'file') {
            let string = value.split('');
            value = '';
            for (let i = 0; i < string.length; ++i) {
                if (name === 'card' && ((value.length === 4 || value.length === 9 || value.length === 14) && string[i] !== ' ')) {
                    value += ' ';
                }
                value += string[i];
                if (!rep.test(value) || (value.length > 19 && name === 'card')) {
                    value = value.substring(0, value.length - 1);
                }
            }
            this.setState({ [name]: value },
                () => { this.validateCard(value) });
        } else {
            if (/^image/.test(event.target.files[0].type)) {
                let fr = new FileReader();
                fr.addEventListener("load", () => {
                    this.setState({ fileUrl: fr.result });
                })
                fr.readAsDataURL(event.target.files[0]);
                this.setState({ fileName: event.target.files[0].name });
                this.setState({ fileSize: event.target.files[0].size });
            } else {
                this.setState({ fileUrl: '' });
                this.setState({ fileName: '' });
                this.setState({ fileSize: '' });
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let html = '{\n';
        Object.keys(this.state).map((name) => {
            let rep = /^is/;
            let value = this.state[name];
            if (!rep.test(name) && name !== 'text' && name !== 'fileUrl') {
                html += name + ':"' + value + '"\n';
            }
        })
        html += '}';
        this.setState({ text: html });
        this.setState({ isTextVisible: !this.state.isTextVisible });
    }

    validClass(e) {
        console.log(e);
        return e ? '' : 'invalid';
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="name">Имя Фамилия </label>
                    <input name="name" value={this.state.name} onChange={this.handleUserInput} />
                </div>
                <div> 
                    <label htmlFor="card">Номер карты </label>
                    <input name="card" value={this.state.card} className={this.validClass(this.state.isCardValid)} onChange={this.handleUserInput} />
                </div>
                <div>
                    <label htmlFor="file">Файл </label>
                    <input type="file" name="file" accept="image/*" onChange={this.handleUserInput} />
                </div>
                <Preview url={this.state.fileUrl}></Preview>
                <div>
                    <button type="submit">
                        Подтвердить
                </button>
                </div>
                <Text state={this.state}></Text>
            </form>
        )
    }
}
//1234 5678 9123 4560 - valid card (9 * (34 * 2 + 32)) = 900
export default Form;