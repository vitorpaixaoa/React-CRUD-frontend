import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class HeaderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: AuthService.getCurrentUser()
        }

        this.newClient = this.newClient.bind(this);
        this.toHome = this.toHome.bind(this);

    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        console.log(this.state.currentUser)
    }
    toHome() {
        window.location.href = "/";

    }
    newClient() {
        window.location.href = "/new-client";
    }


    render() {
        return (
            <header>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container-fluid">
                        <button
                            class="navbar-toggler"
                            type="button"
                            data-mdb-toggle="collapse"
                            data-mdb-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <i class="fas fa-bars"></i>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <a class="navbar-brand mt-2 mt-lg-0" href="/">
                                <img
                                    src="https://avatars.githubusercontent.com/u/1699889?s=200&v=4"
                                    height="50"
                                    alt=""
                                    loading="lazy"
                                />
                            </a>
                            <h4 style={{color: "white"}}>Surittec CRUD de Clientes</h4>

                            {this.state.currentUser &&
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <a class="nav-link" onClick={this.toHome} href="#">Clientes</a>
                                    </li>

                                    {this.state.currentUser.roles.includes("ROLE_ADMIN") &&
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" onClick={this.newClient}>Novo cliente</a>
                                        </li>

                                    }
                                </ul>
                            }

                        </div>

                        {this.state.currentUser &&
                            <div class="d-flex align-items-center">
                                <button onClick={AuthService.logout} className="btn btn-danger">
                                    Sair
                                </button>

                            </div>
                        }

                    </div>
                </nav>
            </header>
        );
    }
}

export default HeaderComponent;