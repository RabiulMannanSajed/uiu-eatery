import { useEffect, useState } from "react";

// const useMenu = () => {
//     const [restaurantsInfo, setRestaurantsInfo] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetch('menu.json')
//         .then(res => res.json())
//             .then(data => {
//                 setRestaurantsInfo(data)
//                 setLoading(false)
//             });

//     }, [])

//     return [restaurantsInfo, loading];
// };

const useMenu = () => {
    const [restaurantsInfo, setRestaurantsInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('menu.json')
            .then((res) =>res.json())
            .then((data) => {
                setRestaurantsInfo(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);
    return {restaurantsInfo, loading, error};
};

export default useMenu;
