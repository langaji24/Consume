import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function Lending({titleModal}) {
    const[lending, setLending] = useState([]);
    

    const navigate = useNavigate();

    useEffect(() => {
        getLending()
    }, []);

    function getLending() {
        axios.get(`http://localhost:8000/lending/data`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setLending(res.data.data);
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
        "User Id",
        "Stuff Id",
        "Date Time",
        "Notes",
        "Total Stuff",
        ];

    const endpointModal = {
        "data_detail": "http://localhost:8000/lending/{id}",
        "delete": "http://localhost:8000/lending/delete/{id}",
        "store": "http://localhost:8000/lending/data",
    };

    const columnIdentitasDelete = 'name';

 
    const inputData ={
        "stuff_id" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "user_id" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "date_time" : {
            "tag": "input",
            "type": "date",
            "option": null
        },
        "notes" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "name" : {
            "tag": "input",
            "type": "text",
            "option": null
        },

    };

    const buttons = [
        "create",
        // "trash",
        // "edit",
        "delete",
    ];

    const tdColumn = {
        "name": null,
        "user": "username",
        "stuff": "name",
        "date_time": null,
        "notes": null,
        "total_stuff": null,
    };

   
    const title = 'Lending';
    return (
        <Case>
            <Table headers={headers} data={lending} endpoint={endpointModal} inputData={inputData} identitasColumn={columnIdentitasDelete} titleModal={titleModal} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    )
}