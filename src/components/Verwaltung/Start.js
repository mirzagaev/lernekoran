import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Auth, API } from 'aws-amplify';

function Start() {
    const { user } = useAuthenticator((context) => [context.user]);
    const group = user.signInUserSession.accessToken.payload["cognito:groups"];

    let bday = user.attributes.birthdate;
    let date = bday.split("-");

    return (
      <>
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
          <p className="text-sm font-medium leading-none text-gray-800">{date[2]}.{date[1]}.{date[0]}</p>
          <p className="text-xs text-gray-500">Geburtstag</p>
        </div>
      </div>
      <div className="flex px-4 py-4 hover:bg-gray-100">
        <div className="text-teal-600">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 30 30" className="w-8 h-8"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
        </div>
        <div className="pl-3">
          <p className="text-sm font-medium leading-none text-gray-800">0 Suran</p>
          <p className="text-xs text-gray-500">Gelernte Suran</p>
        </div>
      </div>
      </>
    );
}

export default Start;