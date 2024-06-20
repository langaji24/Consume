import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function Stuff({titleModal}) {
    const [Stuffs, setStuffs] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getStuffs()
    }, []);

    function getStuffs() {
        axios.get(`http://localhost:8000/stuffs/data`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setStuffs(res.data.data);
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401) {
                navigate('/login?message' + encodeURIComponent('Anda belum login!'));
            }
        })
    };

    const headers = [
        "#",
        "Name",
        "Category",
        "Total Available",
        "Total Defec"
    ];

    const endpointModal = {
        "data_detail": "http://localhost:8000/stuff/{id}",
        "delete": "http://localhost:8000/stuff/delete/{id}",
        "update": "http://localhost:8000/stuff/update/{id}",
        "store": "http://localhost:8000/stuff",
    };

    const columnIdentitasDelete = 'name';

    const inputData ={
        "name" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "category" : {
            "tag": "select",
            "type": "select",
            "option": ["KLN", "HTL", "Teknisi/Sarpras"]
        },

    };

    const buttons = [
        "create",
        "trash",
        "edit",
        "delete",
    ];

    const tdColumn = {
        "name": null,
        "category": null,
        "stuff_stock": "total_available",
        "stuff_stock*": "total_defec"
    };

   
    const title = 'Stuff';
    return (
        <Case>
            <Table headers={headers} data={Stuffs} endpoint={endpointModal} inputData={inputData} identitasColumn={columnIdentitasDelete} titleModal={titleModal} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    )
}