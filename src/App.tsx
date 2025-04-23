/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { mockData } from "./data/mockdata";

function App() {
  const [state, setState] = useState<{
    productList: {
      id: number;
      name: string;
      imageUrl: string;
      brand: string;
      price: number;
      originalPrice: number;
      discountPercentage: number;
    }[];
    liked: number[];
    disliked: number[];
    cart: number[];
  }>({
    productList: mockData,
    liked: [],
    disliked: [],
    cart: [],
  });

  const handleonScroll = (id: number, action: string) => {
    if ([...state.liked, ...state.disliked, ...state.cart].includes(id)) {
      return; // Skip if ID already exists in any array
    }
    if (action === "like") {
      state.liked.push(id);
    } else if (action === "dislike") {
      state.disliked.push(id);
    } else if (action === "addToCart") {
      state.cart.push(id);
    }

    setState({
      ...state,
      productList: state.productList.filter((item: any) => item.id !== id),
    });
  };

  console.log("State", state);
  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] h-screen">
        <header className="bg-gray-900 text-orange-500 p-4">
          <p className="text-lg font-semibold">Swipe. Match. Shop.</p>
        </header>
        <main className="p-4 min-h-[550px]">
          {state.productList.length === 0 && <div>Product List Ends here</div>}
          {state.productList.map((item: any) => {
            return (
              <Card
                key={item.id}
                title={item.name}
                imageUrl={item.imageUrl}
                brand={item.brand}
                price={item.price}
                originalPrice={item.originalPrice}
                discountPercentage={item.discountPercentage}
                onAddToCart={(id: number) => {
                  console.log(`Add to cart Product ID: ${id}`);
                  handleonScroll(id, "addToCart");
                }}
                onLike={(id: number) => {
                  console.log(`Liked Product ID: ${id}`);
                  handleonScroll(id, "like");
                }}
                onDislike={(id: number) => {
                  console.log(`Passed Product ID: ${id}`);
                  handleonScroll(id, "dislike");
                }}
                id={item.id}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}

export default App;
