import React from 'react';
import { Auth, API } from 'aws-amplify';

async function addToGroup() { 
  let apiName = 'AdminQueries';
  let path = '/addUserToGroup';
  let myInit = {
      body: {
        "username" : "bf2bc605-434b-42f8-b4c4-9e4186071495",
        "groupname": "Member"
      }, 
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      } 
  }
  return await API.post(apiName, path, myInit);
}

let nextToken;

async function listEditors(limit){
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

function Admin() {
  return (
    <div className="Admin">
      <h3>Neuen Teilnehmer anlegen</h3>
      <button onClick={addToGroup} className='px-8 py-2 text-white bg-teal-700 border-0'>Add to Group</button>
      <button onClick={() => listEditors(10)} className='px-8 py-2 ml-5 text-white bg-teal-700 border-0'>List Editors</button>
    </div>
  );
}

export default Admin;