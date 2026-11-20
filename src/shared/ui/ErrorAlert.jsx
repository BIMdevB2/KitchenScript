function ErrorAlert ({ error, onRetry }){
    if(!error){
        return null;
    }

    return (
        <div role="alert">
            <span>{error.message}</span>

            {error.status === 500 && onRetry && (
                <button type="button" onClick={onRetry}>Try again</button>
            )}

        </div>
    );
}

export default ErrorAlert;
