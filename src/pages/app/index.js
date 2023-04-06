import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import RequireAuth from "../../functions/RequireAuth";
import Container from "../../components/container";
import Login from "../../components/login";
import Subscriber from "../subscriber";
import Userpanel from "../user";
import Statistic from "../statistic";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route index element={<Statistic />} />
          <Route path="/user" element={
            <RequireAuth>
              <Userpanel />
            </RequireAuth>
          } />
          <Route path="/subscriber/:username?" element={
            <RequireAuth>
              <Subscriber />
            </RequireAuth>
          } />
        </Route>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Authenticator.Provider>
      <MyRoutes />
    </Authenticator.Provider>
  );
}

export default App;