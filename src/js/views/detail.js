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
            console.log("Item found in store:", item);
            // Realizamos la solicitud a la URL para obtener los detalles completos
            fetch(item.url)
                .then((res) => res.json())
                .then((data) => {
                    console.log("Data from API:", data);
                    if (data.result && data.result.properties) {
                        console.log("Properties from API:", data.result.properties);
                        setDetails(data.result.properties);
                    }
                })
                .catch((err) => console.error("Error al obtener detalles:", err));
        } else {
            // Si no se encuentra en el store, realizamos la solicitud directamente a la API
            fetch(`https://www.swapi.tech/api/${type}/${uid}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("Data from API (else case):", data);
                    if (data.result && data.result.properties) {
                        console.log("Properties from API (else case):", data.result.properties);
                        setDetails(data.result.properties);
                    }
                })
                .catch((err) => console.error("Error al obtener detalles:", err));
        }
    }, [store, type, uid]);

    if (!details) return <div>Loading...</div>; // Mostrar cargando mientras se obtienen los datos

    // Mapeamos las propiedades para hacerlas más legibles
    const formattedDetails = Object.entries(details).map(([key, value]) => {
        const formattedKey = key
            .replace(/_/g, " ") // Reemplazamos guiones bajos por espacios
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalizamos la primera letra
        return { label: formattedKey, value };
    });

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

                            {/* Mostrar todas las propiedades dinámicamente */}
                            {formattedDetails.map((detail, index) => (
                                <p key={index}>
                                    <strong>{detail.label}:</strong> {detail.value || "N/A"}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
