import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// ==========================================
// TYPESCRIPT INTERFACE BLOC
// ==========================================
// This tells the frontend exactly what shape the backend JSON data will take.
// It matches the Pydantic schema you wrote in Python.
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
}

// ==========================================
// DATA FETCHING BLOC
// ==========================================
// This function reaches out to your FastAPI server to grab the data.
// The 'no-store' cache option ensures it always fetches fresh data when the page loads.
async function getMenu(): Promise<MenuItem[]> {
  const response = await fetch("http://localhost:8000/menu", {
    cache: "no-store", 
  });
  if (!response.ok) {
    throw new Error("Failed to fetch menu");
  }
  return response.json();
}

// ==========================================
// MAIN PAGE COMPONENT BLOC
// ==========================================
// Because this is a Server Component, Next.js runs this async function on the backend,
// waits for the Python data, builds the HTML cards, and then sends it to the browser.
export default async function HomePage() {
  // Wait for the data to arrive from FastAPI
  const menuItems = await getMenu();

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Coffee Selection</h1>
      
      {/* 
        Flexbox Layout:
        flex-wrap allows cards to drop to the next line if they run out of room.
        justify-center ensures the cards stay perfectly balanced in the middle.
      */}
      <div className="flex flex-wrap justify-center gap-6">
        
        {/* w-full max-w-sm forces a consistent, grid-like width for each card */}
        {menuItems.map((item) => (
          <Card key={item.id} className="w-full max-w-sm flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-xl">{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">€{item.price.toFixed(2)}</p>
              {!item.available && (
                <span className="text-sm text-red-500 font-medium">Sold Out</span>
              )}
            </CardContent>
          </Card>
        ))}

      </div>
    </main>
  );
}
