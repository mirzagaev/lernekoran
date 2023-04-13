import React from 'react';
import { useParams } from 'react-router-dom';
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from '@aws-amplify/ui-react';
import Login from '../../components/login';
import SkillsContainer from "../skills";
import Alert from '../../components/alerts';

function SubscriberContainer() {
    return (
        <div className="Admin">
            <h1>Gruppen</h1>
            
            <Alert type="warning" title="Gruppen nicht vorhanden" content="Es existieren noch keine Gruppen" button="Gruppe anlegen" navigate="/group/create" />
        </div>
    );
}

function Subscriber() {
    const { route } = useAuthenticator((context) => [context.route]);
    const { username } = useParams();

    return (
        <div className="w-full Subscriber">
            {route === 'authenticated' ? (
                username ? <SkillsContainer username={username} /> : <SubscriberContainer />
            ) : <Login />}
        </div>
    );
}

export default Subscriber;