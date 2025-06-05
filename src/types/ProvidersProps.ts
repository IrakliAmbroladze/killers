import { Sheets_Invoice } from "@/types/invoices";
import { Employee } from "./Employee";
import { TaskType } from "./Task";

export interface ProvidersProps {
  children: React.ReactNode;
  orders?: Sheets_Invoice[];
  employees?: Employee[];
  CommentsQuantities?: TaskType[];
}
