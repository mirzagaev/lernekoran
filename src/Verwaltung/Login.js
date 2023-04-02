import { Container, Header, SpaceBetween, Button, AppLayout } from "@awsui/components-react";
import { useAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import Admin from './Admin';
import Teacher from './Teacher';
import Member from './Member';

function Verwaltung() {
  const { signOut } = useAuthenticator((context) => [context.user]);
  const { user } = useAuthenticator((context) => [context.user]);
  const group = user.signInUserSession.accessToken.payload["cognito:groups"];

  return (
    <AppLayout content={
      <Container header={<Header variant="h1">Lerne-Koran.de</Header>}>
          <SpaceBetween direction="vertical" size="l">
              <h2>Hello {user.attributes?.name}</h2>

              <h4>{group}</h4>

              <Button onClick={signOut} variant="primary">Ausloggen</Button>
          </SpaceBetween>
      </Container>
  } />
  );
}

function Login() {
  return (
      <Authenticator.Provider>
        <Authenticator>
          <Verwaltung />
        </Authenticator>
      </Authenticator.Provider>
  );
}

export default Login;