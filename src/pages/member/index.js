import React from 'react';
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from '@aws-amplify/ui-react';
import Login from '../../components/login';

function Member() {
    return (
        <div className="Member">
            <h3>Hello User!</h3>
            <div>list learned suras</div>
            <div>list suras in order</div>
            <div>list statistic</div>
        </div>
    );
}

function Members() {
    const { route } = useAuthenticator((context) => [context.route]);
    return (
        <div className="MembersPage">
            {route === 'authenticated' ? <Member /> : <Login />}
        </div>
    );
}

export default Members;