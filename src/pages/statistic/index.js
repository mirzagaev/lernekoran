import React from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import Alert from "../../components/alerts";

function Statistic() {
    const { route } = useAuthenticator((context) => [context.route]);

    return (
        <div className="w-full Statistic">
            <h1 className="uppercase">TOP 20 TEILNEHMER</h1>
            <div className="w-full mx-auto mb-10 overflow-hidden xl:w-2/3">
            </div>
            
            {route !== 'authenticated' && <Alert type="info" title="Willst Du mitmachen?" content="Jetzt sich registrieren und direkt miteinsteigen." navigate="/login" button="Anmelden" />}
        </div>
    );
}

export default Statistic;