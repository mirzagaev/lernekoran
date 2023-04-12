import Alert from "../../components/alerts";
import { useAuthenticator } from '@aws-amplify/ui-react';

function Statistic() {
    const { route } = useAuthenticator((context) => [context.route]);

    return (
        <div className="w-full Statistic">
            <h1>Statistik</h1>

            {route !== 'authenticated' && <Alert type="info" title="Willst Du mitmachen?" content="Jetzt sich registrieren und direkt miteinsteigen." navigate="/login" button="Anmelden" />}
        </div>
    );
}

export default Statistic;