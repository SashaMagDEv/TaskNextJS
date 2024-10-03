import { NextPageContext } from 'next';

function Error({ statusCode }) {
    return (
        <p>
            {statusCode
                ? `Помилка сервера: ${statusCode}`
                : 'Клієнтська помилка'}
        </p>
    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
