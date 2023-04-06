import React from 'react';
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from '@aws-amplify/ui-react';
import Login from '../../components/login';

function UserContainer({user}) {
    return (
        <div className="Member">
            <h1>Salam {user.attributes.name} {user.attributes.family_name}</h1>
            <div>list learned suras</div>
            <div>list suras in order</div>
            <div>list statistic</div>
        </div>
    );
}

function Userpanel() {
    const { route, user } = useAuthenticator((context) => [
        context.route,
        context.user
    ]);
    
    return (
        <div className="MembersPage">
            {route === 'authenticated' ? <UserContainer user={user} /> : <Login />}
        </div>
    );
}

export default Userpanel;