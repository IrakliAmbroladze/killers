"use client";

import React from "react";
import { splitStr } from "@/utils/splitStr";
import InitialTechniciansContainer from "./InitialTechniciansContainer";
import { OrderExtended } from "@/types";

const TagTechnician = ({
  order,
  isInModal = false,
}: {
  order: OrderExtended;
  isInModal?: boolean;
}) => {
  const assignedTechnicians: string[] =
    (order && order.technician && splitStr(order.technician)) || [];

  return (
    <>
      {order && (
        <InitialTechniciansContainer
          initialTechnicians={assignedTechnicians}
          order={order}
          isInModal={isInModal}
        />
      )}
    </>
  );
};

export default TagTechnician;
