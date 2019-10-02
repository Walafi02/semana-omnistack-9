import React, { useState } from "react";

import api from "./services/api";
import "./App.css";
import logo from "./assets/logo.svg";

function App() {
    const [email, setEmail] = useState("");

    async function handleSubmit(event) {
        event.preventDefault(); //bloqueia o redirecionamento do formulario

        const response = await api.post("/sessions", { email });
        console.log(response);
    }

    return (
        <div className="container">
            <img src={logo} alt="Aircnc" />
            <div className="content">
                <p>
                    Ofereca <strong>spots</strong> para programadores e encontre{" "}
                    <strong>talentos</strong> para sua empresa.
                </p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">E-mail *</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Sue melhor email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />

                    <button className="btn" type="submit">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;
