'use client';

export default function ErrorPage({
  message = 'Please try again later.',
}: {
  message: string;
}) {
  return (
    <main className="mx-auto px-4 pt-32 md:pt-40 pb-20 max-w-7xl md:h-[80vh] text-center">
      <h1 className="text-2xl font-bold text-foreground mb-4">
        Something went wrong
      </h1>
      <p className="text-muted-foreground">{message}</p>
    </main>
  );
}
