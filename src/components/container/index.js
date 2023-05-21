import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Subscriber from "../subscriber";
import Userpanel from '../user';
import "@aws-amplify/ui-react/styles.css";

function Container() {
    const [state, setState] = useState("");
    const [group, setGroup] = useState();

    const location = useLocation();

    useEffect(() => {
        setState(location.pathname)
    }, [location, state]);
    

    const { route, signOut, user } = useAuthenticator((context) => [
        context.route,
        context.signOut,
        context.user
    ]);

    useEffect(() => {
        if (route === 'authenticated') {
            setGroup(user.signInUserSession.accessToken.payload["cognito:groups"][0]);
        }
    }, [route, user, group]);

    const navigate = useNavigate();

    function logOut() {
        signOut();
        navigate('/');
    }
    function openPage(page) {
        setState(page);
        navigate(page);
    }
    
    return (
        <div className="flex bg-gray-100 Container">
            <aside className="flex">
                <div className="flex flex-col items-center w-16 h-screen py-8 space-y-8 bg-white">
                    <div className="flex items-center justify-center px-4 text-teal-700 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                        </svg>
                    </div>

                    <button onClick={() => openPage('/')} className={"p-1.5 transition-colors duration-200 rounded-lg "+ (state === '/' ? 'text-teal-700 bg-teal-50': 'text-gray-500 hover:bg-gray-100')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                        </svg>
                    </button>

                    {/* <button className="p-1.5 transition-colors duration-200 rounded-lg text-gray-500 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </button> */}

                    <button onClick={() => openPage('/user')} className={"p-1.5 transition-colors duration-200 rounded-lg "+ (state === '/user' ? 'text-teal-700 bg-teal-50': 'text-gray-500 hover:bg-gray-100')}>
                        <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </button>

                    {route === 'authenticated' && (
                    <>
                        {group === "Admin" &&
                        <button onClick={() => openPage('/subscriber')} className={"p-1.5 transition-colors duration-200 rounded-lg "+ (state === '/subscriber' ? 'text-teal-700 bg-teal-50': 'text-gray-500 hover:bg-gray-100')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                        </button>
                        }
                        <button onClick={() => logOut()} className="p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                        </button>
                    </>
                    )}
                </div>
                {route === 'authenticated' && state !== "/" && (
                <div className="h-screen overflow-y-auto bg-white border-l border-r sm:w-64 w-60">
                    {state === "/user" && <Userpanel user={user} group={group} /> }
                    {(state === "/subscriber" || state.includes('/subscriber/')) && <Subscriber /> }
                </div>
                )}
            </aside>
            <main className="flex flex-col flex-grow p-8 -ml-48 transition-all duration-150 ease-in main md:ml-0">
                <div className="flex h-full px-12 py-8 bg-white shadow-md"><Outlet /></div>
            </main>
        </div>
    );
}

// export function LoginInfopage() {
//     return (
//         <button onClick={() => Container.openPage('/login')} className="p-1.5 transition-colors duration-200 rounded-lg bg-teal-50 text-gray-500 hover:bg-gray-100">Login</button>
//     );
// }

export default Container;