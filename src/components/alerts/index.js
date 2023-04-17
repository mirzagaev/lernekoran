import { Link } from "react-router-dom";

export function InfoModal({title, content, navigate, button}) {
    return (
        <div className="p-4 pb-3 mb-5 text-blue-900 border-l-4 border-blue-600 bg-blue-50" role="alert">
            <p className="font-bold">{title}</p>
            <div className="block py-2">{content}</div>
            {navigate && <Link to={navigate} className="px-6 py-2 text-white bg-blue-600">{button}</Link>}
        </div>
    );
}

export function SuccessModal({title, content, navigate, button}) {
    return (
        <div className="p-4 pb-3 mb-5 text-teal-900 border-l-4 border-teal-600 bg-teal-50" role="alert">
            <p className="font-bold">{title}</p>
            <div className="block py-2">{content}</div>
            {navigate && <Link to={navigate} className="px-6 py-2 text-white bg-teal-600">{button}</Link>}
        </div>
    );
}

export function WarningModal({title, content, navigate, button}) {
    return (
        <div className="p-4 pb-3 mb-5 text-orange-900 border-l-4 border-orange-600 bg-orange-50" role="alert">
            <p className="font-bold">{title}</p>
            <div className="block py-2">{content}</div>
            {navigate && <Link to={navigate} className="px-6 py-2 text-white bg-orange-600">{button}</Link>}
        </div>
    );
}

export function ErrorModal({title, content, navigate, button}) {
    return (
        <div className="p-4 pb-3 mb-5 text-red-900 border-l-4 border-red-600 bg-red-50" role="alert">
            <p className="font-bold">{title}</p>
            <div className="block py-2">{content}</div>
            {navigate && <Link to={navigate} className="px-6 py-2 text-white bg-red-600">{button}</Link>}
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