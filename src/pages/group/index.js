import React from 'react';
import { useParams } from 'react-router-dom';

function CreateNew() {
    return (
        <div className="Group">
            <h1>Neue Gruppe erstellen</h1>
        </div>
    );
}

function ShowGroup({name}) {
    return (
        <div className="Group">
            <h1>Gruppe: {name}</h1>
        </div>
    );
}

function Group() {
    const { action, group } = useParams();
    return action === "create" && <CreateNew /> || action === "show" && <ShowGroup name={group} />;
}

export default Group;