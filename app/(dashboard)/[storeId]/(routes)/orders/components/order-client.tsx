"use client";

import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";

import { DataTable } from "@/components/ui/data-table";

interface BillbaordClientProps {
  data: OrderColumn[];
}

const OrderClient: React.FC<BillbaordClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Order (${data.length})`}
          description="Manage your orders"
        />
      </div>
      <Separator />

      <DataTable columns={columns} data={data} searchKey="label" />
    </>
  );
};

export default OrderClient;
