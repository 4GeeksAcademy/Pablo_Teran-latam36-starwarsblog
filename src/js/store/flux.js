const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            people: [],
            vehicles: [],
            planets: [],
            favorites: [],
        },
        actions: {
            fetchData: (endpoint) => {
                fetch(`https://www.swapi.tech/api/${endpoint}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setStore({
                            [endpoint]: data.results.map((item) => ({
                                ...item,
                                uid: item.uid,
                                name: item.name,
                            })),
                        });
                    })
                    .catch((err) => console.error(err));
            },

            toggleFavorite: (item) => {
                const store = getStore();
                const exists = store.favorites.some((fav) => fav.uid === item.uid);

                setStore({
                    favorites: exists
                        ? store.favorites.filter((fav) => fav.uid !== item.uid)
                        : [...store.favorites, item],
                });
            },
        },
    };
};

export default getState;
