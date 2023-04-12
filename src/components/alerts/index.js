import { Link } from "react-router-dom";

export function InfoModal({title, content, navigate, button}) {
    return (
        <div class="bg-blue-50 border-l-4 border-blue-600 text-blue-900 p-4 mb-5" role="alert">
            <p class="font-bold">{title}</p>
            <div className="block py-2">{content}</div>
            <Link to={navigate} className="px-6 py-2 text-white bg-blue-600">{button}</Link>
        </div>
    );
}

export function SuccessModal() {
    return (
        <div class="bg-teal-50 border-l-4 border-teal-600 text-teal-900 p-4 mb-5" role="alert">
            <p class="font-bold">Willst Du mitmachen?</p>
            <p>Jetzt sich registrieren und direkt miteinsteigen.</p>
        </div>
    );
}

export function WarningModal() {
    return (
        <div class="bg-orange-50 border-l-4 border-orange-600 text-orange-900 p-4 mb-5" role="alert">
            <p class="font-bold">Willst Du mitmachen?</p>
            <p>Jetzt sich registrieren und direkt miteinsteigen.</p>
        </div>
    );
}

export function ErrorModal() {
    return (
        <div class="bg-red-50 border-l-4 border-red-600 text-red-900 p-4 mb-5" role="alert">
            <p class="font-bold">Willst Du mitmachen?</p>
            <p>Jetzt sich registrieren und direkt miteinsteigen.</p>
        </div>
    );
}

function Alert({type, title, content, navigate, button}) {
    switch(type) {
        case 'info':
          return <InfoModal title={title} content={content} navigate={navigate} button={button} />;
        case 'success':
          return <SuccessModal title={title} content={content} navigate={navigate} button={button} />;
        case 'warning':
            return <WarningModal title={title} content={content} navigate={navigate} button={button} />;
        case 'error':
            return <ErrorModal title={title} content={content} navigate={navigate} button={button} />;
        default:
            return null
    }
}

export default Alert;