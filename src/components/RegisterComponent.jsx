import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from 'validator';

import AuthService from "../services/AuthService";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Esse campo é obrigatório!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Esse não é um email válido
            </div>
        )
    }
}

const valPass = value => {
    if (value.length < 6 || value.length > 40) {
        <div className="alert alert-danger" role="alert">
            A senha deve conter entre 6 e 40 caracteres
        </div>
    }
}

class RegisterComponent extends Component {

    constructor(props) {
        super(props);

        this.handleRegister = this.handleRegister.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            username: '',
            email: '',
            password: '',
            successful: false,
            message: ""
        };
    }

    onChange = (field, value) => this.setState({ [field]: value });

    handleRegister = e => {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(this.state.username,
                this.state.password,
                this.state.email)
                .then(response => {
                    this.setState({
                        successful: true,
                        message: response.data.message
                    });
                },
                    error => {
                        const resMessage =
                            (error.response && error.response.data &&
                                error.response.data.message) || error.message || error.toString();

                        this.setState({
                            loading: false,
                            message: resMessage
                        });
                    }
                );
        }
    }


    render() {
        return (
            <div className="container">
                <div className="col-md-12">
                    <div className="card card-container">
                        <Form onSubmit={this.handleRegister} ref={c => { this.form = c }}>
                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <Input type="text" className="form-control" name="username" validations={[required]}
                                            value={this.state.username} onChange={(e) => this.onChange("username", e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <Input type="text" className="form-control" name="email" validations={[required, email]}
                                            value={this.state.email} onChange={(e) => this.onChange("email", e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Senha</label>
                                        <Input type="password" className="form-control" name="password" validations={[required, valPass]}
                                            value={this.state.password} onChange={(e) => this.onChange("password", e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary btn-block">
                                            <span>Registrar</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {this.state.message && (
                                <div className="form-group">
                                    <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                        {this.state.message}
                                    </div>
                                </div>
                            )}
                            <CheckButton style={{ display: "none" }} ref={c => {
                                this.checkBtn = c;
                            }} />
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterComponent;