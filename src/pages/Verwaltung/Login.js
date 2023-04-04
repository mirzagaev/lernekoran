import React from 'react';
import Admin from './Admin';
import Teacher from './Teacher';
import Member from './Member';
import Aside from '../../components/Verwaltung/Aside';
import { translations, withAuthenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import { I18n } from 'aws-amplify';
I18n.putVocabularies(translations);
// I18n.setLanguage('de');

I18n.putVocabularies({
  de: {
    'Name': 'Vorname',
    'Family Name': 'Nachname',
    'Birthdate': 'Geburtstag',
    'Create Account': 'Registrieren',
    'Enter your Email': 'Geben Sie Ihre E-Mail ein',
    'Enter your Password': 'Geben Sie Ihr Passwort ein',
    'Please confirm your Password': 'Wiederholen Sie Ihr Passwort',
    'Enter your Family Name': "Geben Sie Ihren Nachnamen ein",
    'Enter your Name': "Geben Sie Ihren Vornamen ein",
  },
});

function Verwaltung({ user }) {
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

export default withAuthenticator(Verwaltung);