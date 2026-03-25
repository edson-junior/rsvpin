import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1>Event not found!</h1>
      <p>Could not find requested resource :((((</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
