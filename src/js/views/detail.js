import React, { useEffect, useContext, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

export const Detail = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const type = query.get("type");
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const item = store[type]?.find((el) => el.uid === uid);
        if (item) {
            setDetails(item);
        } else {
            fetch(`https://www.swapi.tech/api/${type}/${uid}`)
                .then((res) => res.json())
                .then((data) => {
                    setDetails({
                        ...data.result.properties,
                        type,
                        uid,
                    });
                })
                .catch((err) => console.error("Error al obtener detalles:", err));
        }
    }, [store, type, uid]);

    if (!details) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/${type}/${details.uid}.jpg`}
                            alt={details.name || "Unknown"}
                            className="img-fluid rounded-start"
                            style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title">{details.name}</h1>
                            {Object.keys(details).map((key) => (
                                <p key={key}>
                                    <strong>{key.replace("_", " ")}:</strong> {details[key]}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
