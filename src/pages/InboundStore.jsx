import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function Inbound({titleModal}) {
    const[inbound, setInbound] = useState([]);
    const[image, setImage] = useState([])

    const onImageChange = (event) => {
     if (event.target.files && event.target.files[0]) {
       setImage(URL.createObjectURL(event.target.files[0]));
     }
    }

    const navigate = useNavigate();

    useEffect(() => {
        getInbound()
    }, []);

    function getInbound() {
        axios.get(`http://localhost:8000/inbound-stuff/data`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setInbound(res.data.data);
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
        "Total",
        "Date Time",
        "Photo",
        ];

    const endpointModal = {
        "data_detail": "http://localhost:8000/inbound/{id}",
        "delete": "http://localhost:8000/inbound/delete/{id}",
        "store": "http://localhost:8000/inbound/data",
    };

    const columnIdentitasDelete = 'name';

 
    const inputData ={
        "stuff_id" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "total" : {
            "tag": "input",
            "type": "numeric",
            "option": null
        },
        "date" : {
            "tag": "input",
            "type": "date",
            "option": null
        },
        "proff_file" : {
            "tag": "input",
            "type": "file",
            "option": null
        },

    };

    const buttons = [
        "create",
        "trash",
        "detail",
        "edit",
        "delete",
    ];

    const tdColumn = {
        "stuff": "name",
        "total": null,
        "date": null,
        "proff_file": null,
    };

   
    const title = 'Inbound';
    return (
        <Case>
            <Table headers={headers} data={inbound} src={image} endpoint={endpointModal} inputData={inputData} identitasColumn={columnIdentitasDelete} titleModal={titleModal} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    )
}