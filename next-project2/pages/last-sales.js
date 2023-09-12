import { useEffect, useState } from "react";
import useSWR from 'swr';

export default function LastSalesPage() {
  const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  const { data, error } = useSWR("https://nextjs-course-7b76c-default-rtdb.firebaseio.com/sales.json",
    fetcher,
    { fallbackData: [] } // Provide an empty array as fallback data
  );

  // No need to initialize sales with undefined, use an empty array instead
  const [sales, setSales] = useState([]);

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  // Handle errors
  if (error) {
    return <p>Failed to load!!!</p>;
  }

  // Handle loading
  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            {sale.username} - ${sale.volume}
          </li>
        ))}
      </ul>
    </div>
  );
}
