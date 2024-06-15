import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContexts = createContext({})

export const AppProvider = ({ children }) => {
    const[email, setEmail] = useState("")
    const [anns, setAnns] = useState([]);
    const [requests, setRequests] = useState([]);
    const [requestsHandling, setRequestsHandling] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [rooms, setRooms] = useState([]);

    const fetchAnns = () => {
        axios.get("http://localhost:8081/v1/api/getAllThongBao")
            .then((res) => {
                console.log(res.data);
                setAnns(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchRequests = () => {
        axios.get("http://localhost:8081/v1/api/getAllYeuCau")
            .then((res) => {
                setRequests(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchRequestsHandling = () => {
        axios.get("http://localhost:8081/v1/api/getAllYeuCauHandle")
            .then((res) => {
                setRequestsHandling(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchEmployees = () => {
        axios.get("http://localhost:8081/v1/api/getAllNhanVien")
            .then((res) => {
                setEmployees(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchRooms = () => {
        axios.get("http://localhost:8081/v1/api/getAllPhongHop")
            .then((res) => {
                setRooms(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchAnns();
        fetchRequests();
        fetchRequestsHandling();
        fetchEmployees();
        fetchRooms();
    }, []);

    return (
        <AppContexts.Provider value={{
            anns, setAnns,
            email, setEmail,
            requests, setRequests,
            requestsHandling, setRequestsHandling,
            employees, setEmployees,
            rooms, setRooms,
            fetchEmployees, fetchRequestsHandling, fetchAnns
        }}>
            {children}
        </AppContexts.Provider>
    );
};
