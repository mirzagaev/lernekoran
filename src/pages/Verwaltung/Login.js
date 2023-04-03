import React, { useState } from 'react';
import { useAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import Admin from './Admin';
import Teacher from './Teacher';
import Member from './Member';
import Members from '../../components/Verwaltung/Members';

function Verwaltung() {
  const [state, setState] = useState('start')

  const { signOut } = useAuthenticator((context) => [context.user]);
  const { user } = useAuthenticator((context) => [context.user]);
  const group = user.signInUserSession.accessToken.payload["cognito:groups"];

  return (
    <div className="flex h-screen bg-gray-100 Dashboard ">
      <aside className="flex">
          <div className="flex flex-col items-center w-16 h-screen py-8 space-y-8 bg-white">
            <div className="flex items-center justify-center px-4 text-teal-700 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>

              <button onClick={() => setState('start')} className={"p-1.5 transition-colors duration-200 rounded-lg "+ (state === 'start' ? 'text-teal-700 bg-teal-50': 'text-gray-500 hover:bg-gray-100')}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
              </button>

              {group.includes('Admin') &&
                <button onClick={() => setState('members')} className={"p-1.5 transition-colors duration-200 rounded-lg "+ (state === 'members' ? 'text-teal-700 bg-teal-50': 'text-gray-500 hover:bg-gray-100')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                </button>
              }

              <button className="p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                </svg>
              </button>

              <button onClick={signOut} className="p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
              </button>
          </div>

          {state === 'start' && (
          <div className="h-screen overflow-y-auto bg-white border-l border-r sm:w-64 w-60">
              <div className="overflow-hidden bg-white">
                  <div className="p-6 text-center bg-teal-700 border-b">
                    <svg aria-hidden="true" role="img" className="w-24 h-24 mx-auto text-white rounded-full" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"></path></svg>
                    <p className="py-2 text-lg font-semibold text-gray-50">{user.attributes.name} {user.attributes.family_name}</p>
                    <p className="text-sm text-gray-100">{user.attributes.email}</p>
                  </div>
              </div>
              <div className="flex px-4 py-4 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 30 30" viewBox="0 0 30 30" className="w-8 h-8 fill-teal-600">
                  <g><rect fill="none" height="24" width="24" /></g>
                  <g><path d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M9,12c0.83,0,1.5,0.67,1.5,1.5S9.83,15,9,15s-1.5-0.67-1.5-1.5S8.17,12,9,12z M12,18H6v-0.75c0-1,2-1.5,3-1.5 s3,0.5,3,1.5V18z M13,9h-2V4h2V9z M18,16.5h-4V15h4V16.5z M18,13.5h-4V12h4V13.5z" /></g>
                </svg>
                <div className="pl-3">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {group.includes('Admin') && "Administation"}
                    {group.includes('Teacher') && "Lehrkraft"}
                    {group.includes('Member') && "Teilnehmer/in"}
                  </p>
                  <p className="text-xs text-gray-500">Rolle</p>
                </div>
              </div>
              <div className="flex px-4 py-4 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 30 30" viewBox="0 0 30 30" className="w-8 h-8 fill-teal-600">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
                </svg>
                  <div className="pl-3">
                    <p className="text-sm font-medium leading-none text-gray-800">
                      {user.attributes.birthdate}
                    </p>
                    <p className="text-xs text-gray-500">Geburtstag</p>
                  </div>
              </div>
              <div className="flex px-4 py-4 hover:bg-gray-100">
                  <div className="text-teal-600">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 30 30" className="w-8 h-8"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  </div>
                  <div className="pl-3">
                    <p className="text-sm font-medium leading-none text-gray-800">
                      0 Suran
                    </p>
                    <p className="text-xs text-gray-500">Gelernte Suran</p>
                  </div>
              </div>
          </div>
          )}
          {state === 'members' && <Members/> }
      </aside>
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