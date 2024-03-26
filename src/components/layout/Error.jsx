import { Link } from "react-router-dom";
import "./Error.css";

export default function Error() {
  return (
    <section className="error">
      <div className="mars"></div>
      <img
        src="https://assets.codepen.io/1538474/404.svg"
        className="logo-404"
      />
      <img
        src="https://assets.codepen.io/1538474/meteor.svg"
        className="meteor"
      />
      <p className="title">Oh no!!</p>
      <p className="subtitle">
        You&apos;re either misspelling the URL <br /> or requesting a page
        that&apos;s no longer here.
      </p>
      <div>
        <Link className="btn-back" to={-1}>
          Back to previous page
        </Link>
      </div>
      <img
        src="https://assets.codepen.io/1538474/astronaut.svg"
        className="astronaut"
      />
      <img
        src="https://assets.codepen.io/1538474/spaceship.svg"
        className="spaceship"
      />
    </section>
  );
}
