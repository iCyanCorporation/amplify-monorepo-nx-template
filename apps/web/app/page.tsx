import { Button } from '@packages/shadcn';

export default function Page() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div className="text-center h-screen flex flex-col items-center justify-center">
      <h1>Hello world!</h1>
      <p className="text-gray-500">
        This is a Next.js + shadcn + Nx monorepo app.
      </p>
      <Button variant="default" className="mt-4">
        Shadcn Button
      </Button>
    </div>
  );
}
