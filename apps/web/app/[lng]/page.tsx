import { Button } from '@packages/shadcn';
import ThemeToggle from '@/components/ThemeToggle';

type Params = Promise<{ lng: string }>;

export default async function Page({ params }: { params: Params }) {
  const { lng } = await params;
  return (
    <div className="text-center h-screen flex flex-col items-center justify-center">
      <h1>Hello world!</h1>
      <p className="text-gray-500">
        This is a Next.js + shadcn + Nx monorepo app. Language is {lng}.
      </p>
      <Button variant="default" className="mt-4">
        Shadcn Button
      </Button>
      <ThemeToggle />
    </div>
  );
}
