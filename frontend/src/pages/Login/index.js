import React, { useState } from "react";
import api from "./../../services/api";

export default function Login({ history }) {
    const [email, setEmail] = useState("");

    async function handleSubmit(event) {
        event.preventDefault(); //bloqueia o redirecionamento do formulario

        const response = await api.post("/sessions", { email });
        const { _id } = response.data;

        localStorage.setItem("use", _id);
        history.push("/dashboard");
    }

    return (
        <>
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
        </>
    );
}
