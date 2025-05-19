import Calendar from "@/components/calendar/Calendar";
import TechniciansOrdersListCotainer from "@/components/technicians-orders-list-container/technicians-orders-list-container";

const OrdersPage = () => {
  return (
    <div className="overflow-auto">
      <Calendar />
      <TechniciansOrdersListCotainer />
    </div>
  );
};

export default OrdersPage;
