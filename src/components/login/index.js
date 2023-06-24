import React, { useEffect } from 'react';
import { Authenticator, useAuthenticator, View, SelectField } from '@aws-amplify/ui-react';
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
    <View className="grid h-screen bg-gray-100 auth-wrapper place-items-center">
      <Authenticator
        loginMechanisms={['email']}
        // Customize `Authenticator.SignUp.FormFields`
        components={{
          SignUp: {
              FormFields() {
                  const { validationErrors } = useAuthenticator();
      
                  return (
                      <>
                      {/* Re-use default `Authenticator.SignUp.FormFields` */}
                      <Authenticator.SignUp.FormFields />
      
                      {/* Append & require Terms & Conditions field to sign up  */}
                      <SelectField
                        errorMessage={validationErrors.rolle}
                        hasError={!!validationErrors.rolle}
                        label="Rolle"
                        name="rolle"
                        required>
                          <option value="0">Bitte wählen Sie Ihre Rolle aus</option>
                          <option value="Manager">Organisator</option>
                          <option value="Teacher">Lehrer</option>
                          <option value="Student">Schüler</option>
                      </SelectField>
                      </>
                  );
              },
          },
          }}
          services={{
              async validateCustomSignUp(formData) {
                  if (!formData.rolle || formData.rolle === "0" || formData.rolle === undefined) {
                    return {
                      rolle: 'Bitte Rolle auswählen',
                    };
                  }
              },
          }}
      ></Authenticator>
    </View>
  );
}
export default Login;