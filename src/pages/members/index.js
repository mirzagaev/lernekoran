import React from 'react';
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from '@aws-amplify/ui-react';
import Login from '../../components/login';

function MembersContainer() {
    return (
        <div className="Admin">
            <h1 className='text-xl'>Neuen Teilnehmer anlegen</h1>
        </div>
    );
}

function Members() {
    const { route } = useAuthenticator((context) => [context.route]);
    const message = route === 'authenticated' ? 'FIRST PROTECTED ROUTE!' : 'Loading...';
    return (
        <div className="MembersPage">
            {route === 'authenticated' ? <MembersContainer /> : <Login />}
        </div>
    );
}

export default Members;