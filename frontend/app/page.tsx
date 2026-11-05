import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Define the TypeScript interface to perfectly match your Python Pydantic model
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
}

export default async function Home() {
  // Fetch the strict JSON array from FastAPI
  const response = await fetch("http://localhost:8000/menu", { cache: "force-cache" });
  const menuItems: MenuItem[] = await response.json();

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Coffee Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <Card key={item.id} className={!item.available ? "opacity-50" : ""}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">€{item.price.toFixed(2)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
