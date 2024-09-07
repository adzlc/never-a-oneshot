"use client";
import { type Column, type ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-actions";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { type PlayerCharacter } from "~/data/typings";

const sortFunction = (name: string, column: Column<PlayerCharacter>) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {name}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export const columns: ColumnDef<PlayerCharacter>[] = [
  {
    id: "actions",
    cell: ({ table, row }) => <DataTableRowActions row={row} table={table} />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => sortFunction('Name', column),
  },
  {
    accessorKey: "class",
    header: ({ column }) => sortFunction('Class', column),
  },
  {
    accessorKey: "race",
    header: ({ column }) => sortFunction('Race', column),
    filterFn: "equals"
  },

];