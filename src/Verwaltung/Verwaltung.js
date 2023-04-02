import { Container, Header, SpaceBetween, Button } from "@awsui/components-react";
import { Authenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";

function Verwaltung() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Container header={
          <Header variant="h2">Lerne-Koran Management</Header>
        }>
          <SpaceBetween direction="vertical" size="l">
            <h1>Hello {user.attributes.name}</h1>
            <Button onClick={signOut} variant="primary">Ausloggen</Button>
          </SpaceBetween>
        </Container>
      )}
    </Authenticator>
  );
}

export default Verwaltung;