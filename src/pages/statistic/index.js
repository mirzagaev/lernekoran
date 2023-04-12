import Alert from "../../components/alerts";

function Statistic() {
    return (
        <div className="w-full Statistic">
            <h1>Statistik</h1>

            <Alert type="info" title="Willst Du mitmachen?" content="Jetzt sich registrieren und direkt miteinsteigen." navigate="/login" button="Anmelden" />
        </div>
    );
}

export default Statistic;