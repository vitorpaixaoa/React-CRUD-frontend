import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import ClientsService from '../services/ClientsService';
import { numFormat, cepValidator, validateField, validateFormToSubmit } from '../assets/js/utils';
import AuthService from '../services/AuthService';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

class NewClientComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            email2: '',
            cpf: '',
            phone: '',
            phone2: '',
            phone_type: '',
            phone_type2: '',
            zipcode: '',
            address: '',
            number: '',
            district: '',
            city: '',
            state: '',
            complement: '',
            cep: '',
            is_phone: true,
            is_phone2: true,
            successful: false,
            message: ''
        }

        this.saveClient = this.saveClient.bind(this);
    }

    componentDidMount() {

        const user = AuthService.getCurrentUser();

        if (!user || !user.roles.includes("ROLE_ADMIN")) {
            this.props.history.push("/clients");
        }
    }

    saveClient = (e) => {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        let client = {
            name: this.state.name,
            email: this.state.email,
            email2: this.state.email2,
            cpf: numFormat(this.state.cpf),
            phone: numFormat(this.state.phone),
            phone2: numFormat(this.state.phone2),
            phone_type: this.state.phone_type,
            phone_type2: this.state.phone_type2,
            zipcode: numFormat(this.state.zipcode),
            address: this.state.address,
            number: this.state.number,
            district: this.state.district,
            city: this.state.city,
            state: this.state.state,
            complement: this.state.complement
        }

        const erros = validateFormToSubmit(client);
        if (erros) {
            ClientsService.newClient(client).then(res => {
                this.props.history.push('/clients')
            });
        } else {
            console.log(" houve um erro")
            return;
        }

    }

    cancel() {
        this.props.history.push('/');
    }

    changeSelectPhone1 = (e) => {
        console.log(e.target.value)
        if (e.target.value === "cellphone") {
            this.setState({ is_phone: true });
            this.setState({ phone_type: e.target.value })
        } else {
            this.setState({ is_phone: false });
            this.setState({ phone_type2: e.target.value })
        }
    }


    changeSelectPhone2 = (e) => {

        if (e.target.value === "cellphone") {
            this.setState({ is_phone2: true });
            this.setState({ phone_type2: e.target.value })
        } else {
            this.setState({ is_phone2: false });
            this.setState({ phone_type2: e.target.value })
        }
    }

    changeName = (value) => {
        this.setState({ "name": value })
    }

    checkChar = (key) => {
        const char = String.fromCharCode(key.charCode)
        const pattern = "[a-zA-Z0-9 ]";

        if (!char.match(pattern)) {
            key.preventDefault()
        }
    }

    getCep = async () => {
        const url = `http://viacep.com.br/ws/${this.state.zipcode}/json/`;
        if (cepValidator(numFormat(this.state.zipcode))) {
            const data = await fetch(url);
            const address = await data.json();
            this.setState({ city: address.localidade })
            this.setState({ address: address.logradouro })
            this.setState({ state: address.uf })
            this.setState({ district: address.bairro })
        }
    }
    onChange = (field, value) => this.setState({ [field]: value }, () => {
        validateField(field, value)
    })

    render() {
        return (
            <div>
                <div className="">
                    <div className="row">
                        <div className=" card col-md-6  offset-md-3">
                            <h3 className="text-center">Adicionar novo cliente</h3>
                            <span className="text-muted"> * campos obrigatórios</span>
                            <div className="card-body">
                                <Form onSubmit={this.saveClient} ref={c => { this.form = c }}>

                                    {!this.state.successful && (
                                        <div>
                                            <div className="form-group">
                                                <label>Nome *</label>
                                                <input required type="text" name="name" onKeyPress={(e) => this.checkChar(e)} required placeholder="Nome do cliente..." className="form-control"
                                                    value={this.state.name} pattern={"[a-zA-Z0-9]+"} onChange={(e) => this.changeName(e.target.value)} />
                                                <span id="namemsg" className="text-muted"></span>
                                            </div>
                                            <div className="form-group">
                                                <label>CPF *</label>
                                                <InputMask mask="999.999.999-99" id="cpf" name="cpf" required type="text" required placeholder="XXX.XXX.XXX - XX" className="form-control"
                                                    value={this.state.cpf} onChange={(e) => this.onChange("cpf", e.target.value)} />
                                                <span id="cpfmsg" className="text-muted"></span>
                                            </div>
                                            <br />
                                            <hr />
                                            <div className="form-group">
                                                <label>Email principal*</label>
                                                <input required type="email" id="email" name="email" required placeholder="email do cliente..." className="form-control"
                                                    value={this.state.email} onChange={(e) => this.onChange("email", e.target.value)} />
                                                <span id="emailmsg" className="text-muted"></span>
                                            </div>
                                            <div className="form-group">
                                                <label>Email secundário</label>
                                                <input type="email" name="email2" id="email2" placeholder="email do cliente..." className="form-control"
                                                    value={this.state.email2} onChange={(e) => this.onChange("email2", e.target.value)} />
                                                <span id="email2msg" className="text-muted"></span>
                                            </div>
                                            <br />
                                            <hr />

                                            <h5>Telefones</h5>
                                            <div className="row">
                                                <div className="form-group justify-content-center type-phone col-md-auto">
                                                    <label >Tipo de telefone *</label>
                                                    <select defaultValue="" id="phoneSelect1" name="phone_type" onChange={this.changeSelectPhone1} className="form-select">
                                                        <option value="" disabled>-- Selecione --</option>
                                                        <option value="cellphone">Celular</option>
                                                        <option value="phone">Telefone Fixo</option>
                                                        <option value="comercialphone">Telefone Comercial</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <label>Telefone principal *</label>
                                                    <InputMask name="phone" id="phone" disabled={this.state.phone_type === "" ? true : false} mask={this.state.is_phone ? "(99) 99999-9999" : "(99) 9999-9999"} required type="text" required placeholder={this.state.is_phone ? "(XX) XXXXX-XXXX" : "(XX) XXXX-XXXX"} className="form-control"
                                                        value={this.state.phone} onChange={(e) => this.onChange("phone", e.target.value)} />
                                                    <span id="phonemsg" className="text-muted"></span>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="form-group justify-content-center type-phone col-md-auto">
                                                    <label >Tipo de telefone 2</label>
                                                    <select defaultValue="" name="phone_type2" onChange={this.changeSelectPhone2} className="form-select">
                                                        <option value="" disabled>-- Selecione --</option>
                                                        <option value="cellphone">Celular</option>
                                                        <option value="phone">Telefone Fixo</option>
                                                        <option value="comercialphone">Telefone Comercial</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <label>Telefone secundário</label>
                                                    <InputMask id="phone2" id="phone2" type="text" mask={this.state.is_phone2 ? "(99) 99999-9999" : "(99) 9999-9999"} placeholder={this.state.is_phone2 ? "(XX) XXXXX-XXXX" : "(XX) XXXX-XXXX"} className="form-control"
                                                        value={this.state.phone2} disabled={this.state.phone_type === "" ? true : false} onChange={(e) => this.onChange("phone2", e.target.value)} />
                                                    <span id="phone2msg" className="text-muted"></span>
                                                </div>

                                            </div>

                                            <br />
                                            <hr />


                                            <div className="form-group">
                                                <label>CEP *</label>
                                                <InputMask mask="99999-999" required type="text" placeholder="CEP" id="cep" autoComplete="new-password" className="form-control"
                                                    value={this.state.zipcode} onBlur={this.getCep} onChange={(e) => this.onChange("zipcode", e.target.value)} />
                                                <span id="zipcodemsg" className="text-muted"></span>
                                            </div>

                                            <div className="form-group">
                                                <label>Logradouro *</label>
                                                <input required type="text" id="address" placeholder="Endereço" className="form-control"
                                                    value={this.state.address} onChange={(e) => this.onChange("address", e.target.value)} />
                                                <span id="addressmsg" className="text-muted"></span>
                                            </div>

                                            <div className="form-group">
                                                <label>Complemento</label>
                                                <input type="text" id="complement" placeholder="Complemento" className="form-control"
                                                    value={this.state.complement} onChange={(e) => this.onChange("complement", e.target.value)} />

                                            </div>

                                            <div className="row">
                                                <div className="form-group col-md-4">
                                                    <label>Número*</label>
                                                    <input required type="number" id="number" className="form-control"
                                                        value={this.state.number} onChange={(e) => this.onChange("number", e.target.value)} />
                                                    <span id="numbermsg" className="text-muted"></span>
                                                </div>

                                                <div className="form-group col-md-8">
                                                    <label>Bairro*</label>
                                                    <input required type="text" id="district" placeholder="Bairro" className="form-control"
                                                        value={this.state.district} onChange={(e) => this.onChange("district", e.target.value)} />
                                                    <span id="districtmsg" className="text-muted"></span>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="form-group col-md-8">
                                                    <label>Cidade*</label>
                                                    <input id="city" type="text" required placeholder="Cidade" className="form-control"
                                                        value={this.state.city} onChange={(e) => this.onChange("city", e.target.value)} />
                                                    <span id="citymsg" className="text-muted"></span>
                                                </div>
                                                <div className="form-group justify-content-center type-phone col-md-4">
                                                    <label >UF *</label>
                                                    <input id="state" type="text" required placeholder="Estado" className="form-control"
                                                        value={this.state.state} onChange={(e) => this.onChange("state", e.target.value)} />
                                                    <span id="statemsg" className="text-muted"></span>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <button type="submit" onClick={this.saveClient} className="btn col-md-8 btn-lg btn-success" >ADICIONAR CLIENTE</button>
                                                <button className="btn col-md-auto btn-lg btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}> Cancelar</button>
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
                </div>
            </div>
        );
    }
}

export default NewClientComponent;