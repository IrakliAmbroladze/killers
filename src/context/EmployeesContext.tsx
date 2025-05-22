"use client";
import type { EmployeesContextType } from "@/types/EmployeesContextType";
import { createContext } from "react";

export const EmployeesContext = createContext<EmployeesContextType | undefined>(
  undefined
);
