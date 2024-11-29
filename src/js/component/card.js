import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Card = ({ item, type }) => {
    const { store, actions } = useContext(Context);
    const isFavorite = store.favorites.some(fav => fav.uid === item.uid);

    const toggleFavorite = () => {
        actions.toggleFavorite(item);
    };

    return (
        <div className="card m-2" style={{ width: "18rem", flexShrink: 0 }}>
            <img
                src={`https://starwars-visualguide.com/assets/img/${type}/${item.uid}.jpg`}
                className="card-img-top"
                alt={item.name}
                style={{ height: "200px", objectFit: "cover" }}
                onError={(e) => (e.target.src = "https://via.placeholder.com/200")}
            />
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/detail/${item.uid}?type=${type}`} className="btn btn-primary">
                        Learn more!
                    </Link>
                    <button
                        className={`btn ${isFavorite ? 'btn-warning' : 'btn-light'} btn-sm`}
                        onClick={toggleFavorite}
                    >
                        <i className={`fa fa-heart ${isFavorite ? 'text-dark' : 'text-warning'}`} />
                    </button>
                </div>
            </div>
        </div>
    );
};
