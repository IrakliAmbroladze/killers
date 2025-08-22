"use client";

import { ReactNode, useEffect, useState } from "react";
import { Provider as OrderModal } from "@/context/order-modal/Provider";
import { Provider as Employees } from "@/context/employees/Provider";
import { MonthProvider as Month } from "@/context/month/Provider";
import { Provider as Year } from "@/context/year/Provider";
import { Provider as CommentsProvider } from "@/context/comments-quantities/Provider";

export const Providers = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [employeesRes, commentsRes] = await Promise.all([
          fetch("/api/employees"),
          fetch("/api/comments"),
        ]);

        const [employeesData, commentsData] = await Promise.all([
          employeesRes.json(),
          commentsRes.json(),
        ]);

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
    <CommentsProvider initialCommentsQuantities={comments}>
      <OrderModal>
        <Employees employees={employees}>
          <Year>
            <Month>{children}</Month>
          </Year>
        </Employees>
      </OrderModal>
    </CommentsProvider>
  );
};
