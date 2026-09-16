import Button from "../components/Button";
import ZombieCat from "../assets/zombie-cat.webp";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-20 text-center">
      <img src={ZombieCat} alt="A confused zombie cat" className="w-40" width={432} height={632} />
      <h1 className="mt-6">404: this page is in a superposition</h1>
      <p className="mt-3 max-w-md text-muted">
        We opened the box and the page was neither here nor there. Try one of the stories instead.
      </p>
      <div className="mt-8">
        <Button to="/stories" variant="primary" icon>
          Browse stories
        </Button>
      </div>
    </main>
  );
}
