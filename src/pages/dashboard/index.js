import React from 'react';
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from '@aws-amplify/ui-react';

function Dashboard() {
  const { route } = useAuthenticator((context) => [context.route]);
  const message = route === 'authenticated' ? 'FIRST PROTECTED ROUTE!' : 'Loading...';
  return (
    <div className="flex h-screen bg-gray-100 Dashboard ">
      Dashboard: {message}
    </div>
  );
}

export default Dashboard;