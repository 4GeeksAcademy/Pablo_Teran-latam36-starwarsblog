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

            toggleFavorite: (item, type) => {
                const store = getStore();
                const itemWithType = { ...item, type }; 
                const favoritesUpdated = store.favorites.some(
                    fav => fav.uid === item.uid && fav.type === type 
                )
                    ? store.favorites.filter(
                          fav => !(fav.uid === item.uid && fav.type === type)
                      ) 
                    : [...store.favorites, itemWithType]; 

                setStore({
                    favorites: favoritesUpdated,
                });
            },

            removeFavorite: (uid, type) => {
                const store = getStore();
                setStore({
                    favorites: store.favorites.filter(
                        fav => !(fav.uid === uid && fav.type === type) 
                    ),
                });
            },
        },
    };
};

export default getState;
