import { Link } from 'react-router';

function ForbiddenPage() {
  return (
    <section>
      <span>$ access denied</span>

      <h1>403</h1>

      <h2>This kitchen is off-limits!</h2>

      <p>
        You don't have the required permissions to access this area.
      </p>

      <div>
        <Link to="/login">Sign in →</Link>
        <Link to="/">Back to Home →</Link>
      </div>

      <p>RESTRICTED AREA — AUTHORIZED CHEFS ONLY.</p>
    </section>
  );
}

export default ForbiddenPage;