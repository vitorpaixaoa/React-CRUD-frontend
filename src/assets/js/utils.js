

export function cepValidator(cep) {
    if (cep.length === 8 && /ˆ[0-9]+$/) {
        return true;
    } else {
        return false
    }

}

export const numFormat = (str) => {
    if(str){
        return str.replace(/[^\d]+/g, '');

    }else{
        return "";
    }

}


export const validateField = (fieldName, value) => {


    if (fieldName === "name") {
        if (value.length < 3 || value.length > 100) {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='red'>O nome precisa ter entre 3 e 100 caracteres</font>";
        } else {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='green'>Nome válido</font>";
        }
    }

    if (fieldName === "cpf") {
        let cpf = value.substring(0)
        if ((cpf.indexOf("_") > -1) || cpf.length < 14) {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='red'>Preencha Completamente com o CPF do cliente</font>";
        } else {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='green'>O CPF é válido</font>";
        }
    }

    if (fieldName === "phone") {
        let phone = value.substring(0)
        if ((phone.indexOf("_") > -1) || phone.length < 14) {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='red'>Preencha Completamente com o telefone do cliente</font>";
        } else {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='green'>Telefone válido</font>";
        }
    }

    if (fieldName === "phone2") {
        let phone2 = value.substring(0)
        if ((phone2.indexOf("_") > -1) || phone2.length < 14) {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='red'>Preencha Completamente com o telefone do cliente</font>";
        } else {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='green'>Telefone válido</font>";
        }
    }

    if (fieldName === "email") {
        let usuario = value.substring(0, value.indexOf("@"));
        let dominio = value.substring(value.indexOf("@") + 1, value.length);

        if ((usuario.length >= 1) &&
            (dominio.length >= 3) &&
            (usuario.search("@") === -1) &&
            (dominio.search("@") === -1) &&
            (usuario.search(" ") === -1) &&
            (dominio.search(" ") === -1) &&
            (dominio.search(".") !== -1) &&
            (dominio.indexOf(".") >= 1) &&
            (dominio.lastIndexOf(".") < dominio.length - 1)) {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='green'>E-mail inválido </font>";
        }
        else {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='red'>E-mail inválido </font>";
        }
    }
    if (fieldName === "email2") {
        let usuario = value.substring(0, value.indexOf("@"));
        let dominio = value.substring(value.indexOf("@") + 1, value.length);

        if ((usuario.length >= 1) &&
            (dominio.length >= 3) &&
            (usuario.search("@") === -1) &&
            (dominio.search("@") === -1) &&
            (usuario.search(" ") === -1) &&
            (dominio.search(" ") === -1) &&
            (dominio.search(".") !== -1) &&
            (dominio.indexOf(".") >= 1) &&
            (dominio.lastIndexOf(".") < dominio.length - 1)) {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='green'>E-mail inválido </font>";
        }
        else {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='red'>E-mail inválido </font>";
        }
    }

    if (fieldName === "zipcode") {
        let cep = value.substring(0)
        if ((cep.indexOf("_") > -1) || cep.length < 9) {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='red'>CEP incompleto</font>";
        } else {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='green'>CEP válido</font>";
        }
    }

    if (fieldName === "address") {
        let address = value.substring(0)
        if (address === "") {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='red'>Endereço não pode ficar vazio</font>";
        } else {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='green'>Endereço válido</font>";
        }
    }

    if (fieldName === "number") {
        let number = value.substring(0)
        if (number === "") {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='red'>Número não pode ficar vazio</font>";
        } else {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='green'>Número válido</font>";
        }
    }

    if (fieldName === "district") {
        let district = value.substring(0)
        if (district === "") {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='red'>Endereço não pode ficar vazio</font>";
        } else {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='green'>Endereço válido</font>";
        }
    }

    if (fieldName === "district") {
        let district = value.substring(0)
        if (district === "") {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='red'>Bairro não pode ficar vazio</font>";
        } else {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='green'>Bairro válido</font>";
        }
    }

    if (fieldName === "city") {
        let city = value.substring(0)
        if (city === "") {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='red'>Endereço não pode ficar vazio</font>";
        } else {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='green'>Endereço válido</font>";
        }
    }

    if (fieldName === "state") {
        let state = value.substring(0)
        if (state === "") {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='red'>Estado não pode ficar vazio</font>";
        } else {
            document.getElementById(fieldName + "msg").innerHTML = "<font color='green'>Estado válido</font>";
        }
    }
}

export const validateFormToSubmit = (client) => {

    let erros = [];

    if (client.name !== "") {
        if (client.name.length < 3 || client.name.length > 100 || client.name === "") {
            erros.name = true;
            console.log(erros.name);
            document.getElementById("namemsg").innerHTML = "<font color='red'>Cpf precisa ter entre 3 e 100 caracteres</font>";
        } else {
            erros.name = false;
            console.log(erros.name);
            document.getElementById("namemsg").innerHTML = "<font color='red'>Cpf precisa ter entre 3 e 100 caracteres</font>";
        }
    }else {
        erros.name = true;
        document.getElementById("namemsg").innerHTML = "<font color='red'>Este campo é obrigatório</font>";
    }


    if (client.cpf !== "") {
        let cpf = client.cpf.substring(0)
        if ((cpf.indexOf("_") > -1) || cpf.length < 14) {
            erros.cpf = false;
            document.getElementById("cpfmsg").innerHTML = "<font color='red'>Preencha Completamente com o CPF do cliente</font>";
        } else {
            erros.cpf = true;
            document.getElementById("cpfmsg").innerHTML = "<font color='green'>O CPF é válido</font>";
        }
    } else {
        erros.cpf = true;
        document.getElementById("cpfmsg").innerHTML = "<font color='red'>Este campo é obrigatório</font>";
    }


    if (client.phone !== "") {
        let phone = client.phone.substring(0)
        if (phone.includes("_")) {
            erros.phone = true;
            document.getElementById("phonemsg").innerHTML = "<font color='red'>Preencha Completamente com o telefone do cliente</font>";
        } else {
            erros.phone = false;
            document.getElementById("phonemsg").innerHTML = "<font color='green'>Telefone válido</font>";
        }
    }else {
        erros.phone = true;
        document.getElementById("phonemsg").innerHTML = "<font color='red'>Este campo é obrigatório</font>";
    }

    if (client.phone2 !== "") {
        let phone2 = client.phone2.substring(0)
        if (phone2.includes("_")) {
            erros.phone2 = true;
            document.getElementById("phone2msg").innerHTML = "<font color='red'>Preencha Completamente com o telefone do cliente</font>";
        } else {
            erros.phone2 = false
            document.getElementById("phone2msg").innerHTML = "<font color='green'>Telefone válido</font>";
        }
    }

    if (client.email !== "") {
        let usuario = client.email.substring(0, client.email.indexOf("@"));
        let dominio = client.email.substring(client.email.indexOf("@") + 1, client.email.length);

        if ((usuario.length >= 1) &&
            (dominio.length >= 3) &&
            (usuario.search("@") === -1) &&
            (dominio.search("@") === -1) &&
            (usuario.search(" ") === -1) &&
            (dominio.search(" ") === -1) &&
            (dominio.search(".") !== -1) &&
            (dominio.indexOf(".") >= 1) &&
            (dominio.lastIndexOf(".") < dominio.length - 1)) {
                erros.email = false;
            document.getElementById("emailmsg").innerHTML = "<font color='green'>E-mail Válido </font>";
        }
        else {
            erros.email = true;
            document.getElementById("emailmsg").innerHTML = "<font color='red'>E-mail inválido </font>";
        }
    }else {
        erros.email = true;
        document.getElementById("emailmsg").innerHTML = "<font color='red'>Este campo é obrigatório</font>";
    }

    if (client.email2 !== "") {
        let usuario = client.email2.substring(0, client.email2.indexOf("@"));
        let dominio = client.email2.substring(client.email2.indexOf("@") + 1, client.email2.length);

        if ((usuario.length >= 1) &&
            (dominio.length >= 3) &&
            (usuario.search("@") === -1) &&
            (dominio.search("@") === -1) &&
            (usuario.search(" ") === -1) &&
            (dominio.search(" ") === -1) &&
            (dominio.search(".") !== -1) &&
            (dominio.indexOf(".") >= 1) &&
            (dominio.lastIndexOf(".") < dominio.length - 1)) {
                erros.email2 = false;
            document.getElementById("email2msg").innerHTML = "<font color='green'>E-mail Válido </font>";
        }else{
            erros.email2 = true;
            document.getElementById("email2msg").innerHTML = "<font color='red'>E-mail inválido </font>";
        }
    }

    if (client.zipcode !== "") {
        let cep = client.zipcode.substring(0)
        if (cep.includes("_")) {
            erros.zipcode = true;
            document.getElementById("zipcodemsg").innerHTML = "<font color='red'>CEP incompleto</font>";
        } else {
            erros.zipcode = false;
            document.getElementById("zipcodemsg").innerHTML = "<font color='green'>CEP válido</font>";
        }
    }
    else {
        erros.zipcode = true;
        document.getElementById("zipcodemsg").innerHTML = "<font color='red'>Este campo é obrigatório</font>";
    }

    if (client.address !== "") {
        let address = client.address.substring(0)
        if (address === "") {
            erros.address = true;
            document.getElementById("addressmsg").innerHTML = "<font color='red'>Endereço não pode ficar vazio</font>";
        } else {
            erros.address = false;
            document.getElementById("addressmsg").innerHTML = "<font color='green'>Endereço válido</font>";
        }
    }else {
        erros.address = true;
        document.getElementById("addressmsg").innerHTML = "<font color='red'>Este campo é obrigatório</font>";
    }

    if (client.number !== "") {
        if (client.number === "") {
            erros.number = true;
            document.getElementById("numbermsg").innerHTML = "<font color='red'>Número não pode ficar vazio</font>";
        } else {
            erros.number = false;
            document.getElementById("numbermsg").innerHTML = "<font color='green'>Número válido</font>";
        }
    }else {
        erros.number = true;
        document.getElementById("numbermsg").innerHTML = "<font color='red'>Este campo é obrigatório</font>";
    }

    if (client.city !== "") {
        let city = client.city.substring(0)
        if (city === "") {
            erros.city = true;
            document.getElementById("citymsg").innerHTML = "<font color='red'>Cidade não pode ficar vazio</font>";
        } else {
            erros.city = false;
            document.getElementById("citymsg").innerHTML = "<font color='green'>Cidade válida</font>";
        }
    }else {
        erros.city = true;
        document.getElementById("citymsg").innerHTML = "<font color='red'>Este campo é obrigatório</font>";
    }

    if (client.district !== "") {
        let district = client.district.substring(0)
        if (district === "") {
            erros.district = false;
            document.getElementById("districtmsg").innerHTML = "<font color='red'>Estado não pode ficar vazio</font>";
        } else {
            erros.district = false;
            document.getElementById("districtmsg").innerHTML = "<font color='green'>Estado válido</font>";
        }
    }else {
        erros.district = true;
        document.getElementById("districtmsg").innerHTML = "<font color='red'>Este campo é obrigatório</font>";
    }

    if (client.state !== "") {
        let state = client.state.substring(0)
        if (state === "") {
            erros.state = false;
            document.getElementById("statemsg").innerHTML = "<font color='red'>Estado não pode ficar vazio</font>";
        } else {
            erros.state = false;
            document.getElementById("statemsg").innerHTML = "<font color='green'>Estado válido</font>";
        }
    }else {
        erros.state = true;
        document.getElementById("statemsg").innerHTML = "<font color='red'>Este campo é obrigatório</font>";
    }

    if(erros.name || erros.cpf || erros.email || erros.phone ||
        erros.zipcode || erros.city || erros.state || erros.address || erros.district || erros.number) {
            console.log(erros)
            return false;
        }else{
            return true;
        }

}
