import RestaurantWaitChart from "@/app/(provider)/waiting/components/RestaurantWaitChart";
import Header from "@/components/Header";
import { mockRestaurantData } from "@/mock/estimateTimeData";

export default function Page() {
  return (
    <div className="flex flex-col gap-6 bg-gray-100 min-h-screen">
      <Header />
      {mockRestaurantData.map((r) => (
        <RestaurantWaitChart key={r.id} restaurant={r} />
      ))}
    </div>
  );
}
