import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/card";

export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchData("people");
        actions.fetchData("vehicles");
        actions.fetchData("planets");
    }, []);

    return (
        <div className="container">
            <h2 className="text-danger">Characters</h2>
            <div className="d-flex overflow-auto" style={{ maxWidth: '100%', whiteSpace: 'nowrap' }}>
                {store.people && store.people.map((item, index) => (
                    <Card key={index} item={item} type="people" />
                ))}
            </div>
            <h2 className="text-danger mt-4">Vehicles</h2>
            <div className="d-flex overflow-auto" style={{ maxWidth: '100%', whiteSpace: 'nowrap' }}>
                {store.vehicles && store.vehicles.map((item, index) => (
                    <Card key={index} item={item} type="vehicles" />
                ))}
            </div>
            <h2 className="text-danger mt-4">Planets</h2>
            <div className="d-flex overflow-auto" style={{ maxWidth: '100%', whiteSpace: 'nowrap' }}>
                {store.planets && store.planets.map((item, index) => (
                    <Card key={index} item={item} type="planets" />
                ))}
            </div>
        </div>
    );
};
