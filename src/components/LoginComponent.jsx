import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

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

class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            username: '',
            password: '',
            loading: false,
            message: ""
        };
    }

    onChange = (field, value) => this.setState({ [field]: value });

    handleLogin = e => {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(
                () => {
                    this.props.history.push("/clients");
                    window.location.reload();
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
        } else {
            this.setState({
                loading: false
            });
        }
    }


    render() {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                        <img src="https://avatars.githubusercontent.com/u/1699889?s=200&v=4" 
                        height="150"
                        alt=""
                        loading="lazy" />
                    </div>

                    <Form onSubmit={this.handleLogin} ref={c => { this.form = c }}>
                    {this.state.message &&(
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.message}
                                    </div>
                                </div>
                            )}
                        <div className="form-group">
                            <label>Username</label>
                            <Input type="text" className="form-input fadeIn second" name="username" validations={[required]}
                                value={this.state.username} onChange={(e) => this.onChange("username", e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <Input type="password" className="form-input fadeIn third" name="password" validations={[required]}
                                value={this.state.password} onChange={(e) => this.onChange("password", e.target.value)} />
                        </div>
                        <br />
                        <div className="form-group">
                            <button className=" form-button fadeIn fourth" disabled={this.state.loading}>
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Entrar</span>
                            </button>
                        </div>
                        
                    
                            <CheckButton style={{ display: "none"}} ref={c => {
                                this.checkBtn = c;
                            }} />
                    </Form>
                </div>


            </div>
        );
    }
}

export default LoginComponent;

// <div className="container">
//                 <div className="login-form">
//                     <div className="card card-container">
//                         <Form onSubmit={this.handleLogin} ref={c => { this.form = c }}>
{/* <div className="form-group">
    <label>Username</label>
    <Input type="text" className="form-control" name="username" validations={[required]}
        value={this.state.username} onChange={(e) => this.onChange("username", e.target.value)} />
</div> */}
                            // <div className="form-group">
                            //     <label>Senha</label>
                            //     <Input type="password" className="form-control" name="password" validations={[required]}
                            //         value={this.state.password} onChange={(e) => this.onChange("password", e.target.value)} />
                            // </div>
                            // <div className="form-group">
                            //     <button className="btn btn-primary btn-block" disabled={this.state.loading}>
                            //         {this.state.loading && (
                            //             <span className="spinner-border spinner-border-sm"></span>
                            //         )}
                            //         <span>Login</span>
                            //     </button>
                            // </div>
                            // {this.state.message &&(
                            //     <div className="form-group">
                            //         <div className="alert alert-danger" role="alert">
                            //             {this.state.message}
                            //         </div>
                            //     </div>
                            // )}
                            // <CheckButton style={{ display: "none"}} ref={c => {
                            //     this.checkBtn = c;
                            // }} />
//                         </Form>
//                     </div>
//                 </div>
//             </div> 