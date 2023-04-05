import React, { useEffect, useState } from 'react';
import { Auth, API } from 'aws-amplify';

let nextToken;

async function listMembers(limit){
  let apiName = 'AdminQueries';
  let path = '/listUsersInGroup';
  let myInit = { 
      queryStringParameters: {
        "groupname": "Member",
        "limit": limit,
        "token": nextToken
      },
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
  }
  const { NextToken, ...rest } =  await API.get(apiName, path, myInit);
  nextToken = NextToken;
  return rest;
}

function Members() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const [usersLoaded, setUsersLoaded] = useState(false);
  
    useEffect(() => {
      (async () => {
        setUsersLoaded(false);
        let res = await listMembers();
        // console.log(res["Users"][0]["Username"]);
        if (res["Users"].length > 0) {
          setUsers(res["Users"]);
          setUsersLoaded(true);
        }
      })();
    }, []);

    const selectUser = (tn) => {
      setCurrentUser(tn.Username);
    };

    return (
      <>
      <h2 className="px-5 mt-8 text-lg font-medium text-gray-800">Teilnehmer</h2>
      <div className="mt-8">
        {usersLoaded ? (
          users.map(teilnehmer => (
            <button
              onClick={() => selectUser(teilnehmer)}
              key={teilnehmer.Username}
              className={"flex items-center w-full px-5 py-2 transition-colors duration-200 gap-x-2 "+ (currentUser === teilnehmer.Username ? 'text-teal-700 bg-teal-50': 'hover:bg-gray-100')}>
              <div className="text-left rtl:text-right">
                <h1 className="text-sm font-medium text-gray-700 capitalize">{teilnehmer.Attributes[3].Value} {teilnehmer.Attributes[4].Value}</h1>
                <p className="text-xs text-gray-500">0 Suran</p>
              </div>
            </button>
          ))
        ) : (
          <p className='px-5'>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="w-4 h-4 text-gray-800 fill-current animate-spin" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M988 548c-19.9 0-36-16.1-36-36c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9a437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3c.1 19.9-16 36-35.9 36z"></path></svg>
            Keine Teilnehmer gefunden!
          </p>
        )}
      </div>
      </>
    );
}

export default Members;