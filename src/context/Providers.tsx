"use client";

import { ReactNode, useEffect, useState } from "react";
import { Provider as Orders } from "@/context/orders/Provider";
import { Provider as OrderModal } from "@/context/order-modal/Provider";
import { Provider as Employees } from "@/context/employees/Provider";
import { Provider as Year } from "@/context/year/Provider";
import { Provider as CommentsProvider } from "@/context/comments-quantities/Provider";

export const Providers = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [ordersRes, employeesRes, commentsRes] = await Promise.all([
          fetch("/api/orders"),
          fetch("/api/employees"),
          fetch("/api/comments"),
        ]);

        const [ordersData, employeesData, commentsData] = await Promise.all([
          ordersRes.json(),
          employeesRes.json(),
          commentsRes.json(),
        ]);

        setOrders(ordersData);
        setEmployees(employeesData);
        setComments(commentsData);
      } catch (error) {
        console.error("❌ Failed to fetch providers data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">🔄 Loading application data...</div>
    );
  }

  return (
    <Orders initialOrders={orders}>
      <CommentsProvider initialCommentsQuantities={comments}>
        <OrderModal>
          <Employees employees={employees}>
            <Year>{children}</Year>
          </Employees>
        </OrderModal>
      </CommentsProvider>
    </Orders>
  );
};
