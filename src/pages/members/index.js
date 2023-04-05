import React from 'react';
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from '@aws-amplify/ui-react';
import Login from '../../components/login';

function Member() {
    return (
        <>
        Member
        </>
    );
}

function Members() {
    const { route } = useAuthenticator((context) => [context.route]);
    const message = route === 'authenticated' ? 'FIRST PROTECTED ROUTE!' : 'Loading...';
    return (
        <div className="MembersPage">
            {route === 'authenticated' ? <Member /> : <Login />}
        </div>
    );
}

export default Members;