"use client";

import { Sheets_Invoice } from "@/types/invoices";
import React from "react";
import { splitStr } from "@/utils/splitStr";
import InitialTechniciansContainer from "./InitialTechniciansContainer";

const TagTechnician = ({ order }: { order: Sheets_Invoice }) => {
  const assignedTechnicians: string[] =
    (order.technician && splitStr(order.technician)) || [];

  return (
    <>
      <InitialTechniciansContainer initialTechnicians={assignedTechnicians} />
    </>
  );
};

export default TagTechnician;
