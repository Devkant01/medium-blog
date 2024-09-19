import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]); 
    async function sendRequest() {
        const response = await axios.get(`${BACKEND_URL}/medium-blog/blog/blogs`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        });
        console.log("res ",response);
        setBlogs(response.data);
        setLoading(false);
    }
    useEffect(() => {
        sendRequest();
        console.log("loading", blogs);
    }, []);

    return { loading, blogs };
}