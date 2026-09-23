import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl">That page is not in the atlas</h1>
      <p className="mt-3 text-muted-foreground">
        The slug does not match a seeded category, vendor, or use case.
      </p>
      <Link href="/" className="mt-4 inline-block text-primary underline-offset-4 hover:underline">
        Back to the map
      </Link>
    </main>
  );
}
