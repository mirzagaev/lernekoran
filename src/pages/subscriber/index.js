import React from 'react';
import { useParams } from 'react-router-dom';
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from '@aws-amplify/ui-react';
import Login from '../../components/login';
import Skills from "../skills";

function SubscriberContainer() {
    return (
        <div className="Admin">
            <h1>Neuen Teilnehmer anlegen</h1>
        </div>
    );
}

function Subscriber() {
    const { route } = useAuthenticator((context) => [context.route]);
    const { username } = useParams();

    return (
        <div className="MembersPage">
            {route === 'authenticated' ? (
                username ? <Skills username={username} /> : <SubscriberContainer />
            ) : <Login />}
        </div>
    );
}

export default Subscriber;