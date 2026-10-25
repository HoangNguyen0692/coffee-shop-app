import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default async function Home() {
  // 1. Fetch data from your FastAPI backend
  // The 'no-store' cache forces Next.js to fetch fresh data on every reload
  const response = await fetch("http://localhost:8000/", { cache: "force-cache" });
  const backendData = await response.json();

  return (
    <main className="min-h-screen p-8 bg-zinc-50 flex flex-col items-center justify-center gap-6">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Cà phê Sữa Đá</CardTitle>
          <CardDescription>Traditional Vietnamese iced coffee with condensed milk</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-600">
            Slow-dripped Robusta beans paired with sweet condensed milk over crushed ice.
          </p>
          <p className="mt-4 text-xl font-bold text-zinc-900">4,50 €</p>
          
          {/* 2. Display the live message from Python */}
          <div className="mt-6 p-4 bg-zinc-100 rounded-md border border-zinc-200 text-sm font-mono text-zinc-800">
            Backend says: {backendData.message}
          </div>
          
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Add to Order</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
