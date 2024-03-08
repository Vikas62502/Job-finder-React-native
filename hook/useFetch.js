import { useState, useEffect } from "react";
import axios from "axios";
// import { RAPID_API_KEY } from '@env';
// const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        const options = {
            method: 'GET',
            url: `https://jsearch.p.rapidapi.com/${endpoint}`,
            params: { ...query },
            headers: {
                'X-RapidAPI-Key': '2c6fc61e00msh8ad55ce08d01ce6p179117jsn43cb4d36cd44',
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
            setError(true);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };

    return { data, isLoading, error, refetch };
};

export default useFetch;
