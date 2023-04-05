import { useEffect } from 'react';
import { Authenticator, useAuthenticator, View, withAuthenticator } from '@aws-amplify/ui-react';
import { translations } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import { useNavigate, useLocation } from 'react-router';

import { I18n } from 'aws-amplify';
I18n.putVocabularies(translations);

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

function Login({ user }) {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();

  let from = location.state?.from?.pathname || '/';
  useEffect(() => {
    if (route === 'authenticated') {
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);

  return (
    <View className="auth-wrapper">
      <Authenticator></Authenticator>
    </View>
  );
}
// export default Login;
export default withAuthenticator(Login);