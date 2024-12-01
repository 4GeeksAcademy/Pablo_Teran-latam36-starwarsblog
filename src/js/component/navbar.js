import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    const removeFavorite = (uid, type) => {
        actions.removeFavorite(uid, type);
    };

    return (
        <nav className="navbar navbar-light bg-light mb-3 d-flex justify-content-between">
            <Link to="/">
                <img src="https://logowik.com/content/uploads/images/528_star_wars.jpg" alt="Star Wars Logo" height="50" />
            </Link>
            <div className="ml-auto">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        Favorites <span className="badge bg-light text-dark">{store.favorites.length}</span>
                    </button>
                    <ul 
                        className="dropdown-menu dropdown-menu-end" 
                        aria-labelledby="dropdownMenuButton" 
                        style={{
                            maxHeight: "200px",
                            overflowY: "auto",
                            right: "0", 
                            left: "auto",
                            transform: "translateX(-20px)" 
                        }}
                    >
                        {store.favorites.map((fav, index) => (
                            <li key={index} className="d-flex justify-content-between align-items-center">
                                <span>{fav.name}</span>
                                <button className="btn btn-danger btn-sm" onClick={() => removeFavorite(fav.uid, fav.type)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
