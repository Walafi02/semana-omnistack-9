import React, { useState, useMemo } from "react";

import camera from "./../../assets/camera.svg";

import "./styles.css";
import api from "./../../services/api";

export default function New({ history }) {
    const [company, setCompany] = useState("");
    const [tocks, setTocks] = useState("");
    const [price, setPrice] = useState("");
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem("use");

        data.append("thumbnail", thumbnail);
        data.append("company", company);
        data.append("tochs", tocks);
        data.append("price", price);

        await api.post("/spots", data, {
            headers: {
                user_id
            }
        });

        history.push("/dashboard");
    }

    return (
        <form onSubmit={handleSubmit}>
            <label
                id="thumbnail"
                style={{ backgroundImage: `url('${preview}')` }}
                className={thumbnail ? "has-thumbnail" : ""}
            >
                <input
                    type="file"
                    onChange={event => setThumbnail(event.target.files[0])}
                />
                <img src={camera} alt="Selecione img" />
            </label>

            <label htmlFor="company">Company</label>
            <input
                id="company"
                placeholder="sua empresa"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="tochs">
                Tecnologia <span>(Separados por vigulas)</span>
            </label>
            <input
                id="tochs"
                placeholder="Suas Tecnologias"
                value={tocks}
                onChange={event => setTocks(event.target.value)}
            />

            <label htmlFor="price">Valor</label>
            <input
                id="price"
                placeholder="Valor"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button className="btn" type="submit">
                Enviar
            </button>
        </form>
    );
}
