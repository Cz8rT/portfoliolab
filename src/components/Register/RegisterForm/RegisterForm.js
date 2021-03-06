import React, {useState, useCallback, useContext} from "react";
import app from "../../../config/firebase";
import {Form} from "react-final-form";
import {Link, Redirect} from "react-router-dom";
import {AuthContext} from "../../../config/Auth";
import EmailField from "../../Login/LoginForm/LoginFields/EmailField/EmailField";
import PasswordField from "../../Login/LoginForm/LoginFields/PasswordField/PasswordField";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const currentUser = useContext(AuthContext);
    const handleRegister = useCallback(async event => {
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email, password);
            console.log("Użytkownik zarejestrowany")
        }
        catch (error) {
            alert(error);
        }
    }, [email, password]);

    const emailInputHandler = (event) => {
        setEmail(event.target.value);
    };

    const passwordInputHandler = (event) => {
        setPassword(event.target.value);
    };

    const rePassInputHandler = (event) => {
        setConfirm(event.target.value);
    };

    if (currentUser) {
        return (
            <Redirect to={"/"}/>
        )
    }
    return (
        <Form onSubmit={handleRegister}>
            {({handleSubmit, submitting}) => <form onSubmit={handleSubmit}>
                <div className={"fields_container"}>
                    <EmailField email={email} emailInputHandler={emailInputHandler}/>
                    <PasswordField name={"password"}
                                   password={password}
                                   passInputHandler={passwordInputHandler}
                                   title={"Hasło"}
                                   confirm={password}/>
                    <PasswordField name={"rePass"}
                                   password={confirm}
                                   passInputHandler={rePassInputHandler}
                                   title={"Powtórz hasło"}
                                   confirm={password}/>
                </div>
                <div className={"btn_container"}>
                    <Link className="loginLink" to={'/logowanie'}>Zaloguj się</Link>
                    <button type={"submit"} disabled={submitting}>Załóż konto</button>
                </div>
            </form>}
        </Form>
    )
};

export default RegisterForm;