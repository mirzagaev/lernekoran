import React from 'react';
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from '@aws-amplify/ui-react';
import Login from '../../components/login';

function UserContainer({user}) {
    return (
        <div className="Member">
            <h1>Salam {user.attributes.name} {user.attributes.family_name}</h1>

            <div class="flex flex-wrap -m-4">
                <div class="p-4 md:w-1/3">
                    <div class="flex bg-green-50 px-5 py-3 sm:flex-row flex-col">
                        <div class="w-10 h-10 sm:mr-5 inline-flex items-center justify-center text-gray-400 text-xl">1</div>
                        <div class="flex-grow">
                            <h2 class="text-gray-900 text-lg title-font font-medium">Al Baqara</h2>
                            <p class="leading-relaxed text-sm font-light -mt-1">Die Eröffnende</p>
                        </div>
                    </div>
                </div>
                <div class="p-4 md:w-1/3">
                    <div class="flex bg-green-50 px-5 py-3 sm:flex-row flex-col">
                        <div class="w-10 h-10 sm:mr-5 inline-flex items-center justify-center text-gray-400 text-xl">1</div>
                        <div class="flex-grow">
                            <h2 class="text-gray-900 text-lg title-font font-medium">Al Baqara</h2>
                            <p class="leading-relaxed text-sm font-light -mt-1">Die Eröffnende</p>
                        </div>
                    </div>
                </div>
                <div class="p-4 md:w-1/3">
                    <div class="flex bg-green-50 px-5 py-3 sm:flex-row flex-col">
                        <div class="w-10 h-10 sm:mr-5 inline-flex items-center justify-center text-gray-400 text-xl">1</div>
                        <div class="flex-grow">
                            <h2 class="text-gray-900 text-lg title-font font-medium">Al Baqara</h2>
                            <p class="leading-relaxed text-sm font-light -mt-1">Die Eröffnende</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Userpanel() {
    const { route, user } = useAuthenticator((context) => [
        context.route,
        context.user
    ]);
    
    return (
        <div className="w-full Userpanel">
            {route === 'authenticated' ? <UserContainer user={user} /> : <Login />}
        </div>
    );
}

export default Userpanel;