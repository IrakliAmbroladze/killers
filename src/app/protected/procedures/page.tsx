import NewCalendar from "@/components/calendar/NewCalendar";
import TechniciansOrdersListCotainer from "@/components/technicians-orders-list-container/technicians-orders-list-container";

const OrdersPage = () => {
  return (
    <div className="w-full">
      <NewCalendar />
      <TechniciansOrdersListCotainer />
    </div>
  );
};

export default OrdersPage;
