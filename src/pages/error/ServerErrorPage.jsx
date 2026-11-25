import { Link } from 'react-router';

function ServerErrorPage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <section>
      <span>$ kitchen overload</span>

      <h1>500</h1>

      <h2>Something burned in the kitchen!</h2>

      <p>
        An unexpected error occurred on our side. Please try again in a moment.
      </p>

      <div>
        <button type="button" onClick={handleRetry}>
          Try again
        </button>
        <Link to="/">Back to Home →</Link>
      </div>

      <p>OUR CHEFS ARE ON IT — PLEASE STAND BY.</p>
    </section>
  );
}

export default ServerErrorPage;