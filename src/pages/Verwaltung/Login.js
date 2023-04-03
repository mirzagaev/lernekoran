import React from 'react';
import { useAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import Admin from './Admin';
import Teacher from './Teacher';
import Member from './Member';
import Aside from '../../components/Verwaltung/Aside';

function Verwaltung() {
  const { user } = useAuthenticator((context) => [context.user]);
  const group = user.signInUserSession.accessToken.payload["cognito:groups"];

  return (
    <div className="flex h-screen bg-gray-100 Dashboard ">
      <Aside/>
      <main className="flex flex-col flex-grow p-8 -ml-48 transition-all duration-150 ease-in main md:ml-0">
        <div className="flex h-full px-12 py-8 bg-white shadow-md">
          {group.includes('Admin') && <Admin/>}
          {group.includes('Teacher') && <Teacher/>}
          {group.includes('Member') && <Member/>}
        </div>
      </main>
    </div>
  );
}

function Login() {
  return (
      <Authenticator.Provider>
        <Authenticator>
          <Verwaltung />
        </Authenticator>
      </Authenticator.Provider>
  );
}

export default Login;