import React, { useEffect, useState } from "react";
import Case from "../Case";
import Table from "../Table";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";


export default function UserTrash({ titleModal }) {
    const [userTrash, setUserTrash] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/user/trash`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setUserTrash(res.data.data);
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401) {
                navigate('/login?message' + encodeURIComponent('Anda belum login!'));
            }
        })
    }, [])

    const headers = [
        "#",
        "Name",
        "Email",
        "Role",
    ]

    const endpointModal = {
        "restore": "http://localhost:8000/user/restore/{id}",
        "delete_permanent": "http://localhost:8000/user/permanent/{id}",
    }

    const inputData = {}

    const title = 'User'

    const columnIdentitasDelete = 'name'

    const buttons = [
        "restore",
        "permanentDeletes",
    ]

    const tdColumn = {
        "username": null,
        "email": null,
        "role": null,
}
  return (
    <>
        <Case>
            <Table headers={headers} data={UserTrash} endpoint={endpointModal} inputData={inputData} titleModal={titleModal} identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    </>
  )
}
