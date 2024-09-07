import { type Row, type Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { type PlayerCharacter } from "~/data/typings";

interface DataTableRowActionsProps<TData> {
  row: Row<PlayerCharacter>;
  table: Table<TData>;
}
export function DataTableRowActions<TData>({
  table,
  row,
}: DataTableRowActionsProps<TData>) {
  const playerCharacter = row.original;
  const [open, setOpen] = useState(false);
  const [correctName, setCorrectName] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              table.options.meta?.handleEdit(playerCharacter.id);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="md:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete {playerCharacter.name}</DialogTitle>
            <DialogDescription>
              Deleting a Player Character cannot be undone. To delete please enter{" "}
              <b>{playerCharacter.name}</b> below.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="md:justify-start">
            <div className="grid gap-4 py-4">
              <div className="items-start">
                <Input
                  placeholder="Enter name of player"
                  id="delete-player-check"
                  name="delete-player-check"
                  className="w-60"
                  onChange={(e) => {
                    const value = e.currentTarget.value;
                    setCorrectName(value.localeCompare(playerCharacter.name, undefined, { sensitivity: 'accent' }) === 0);
                  }}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-5">
                <Button
                  id="deletePlayerButton"
                  type="submit"
                  disabled={!correctName}
                  onClick={() => {
                    table.options.meta?.handleDelete(playerCharacter.id);
                    setOpen(false);
                  }}
                >
                  Delete Character
                </Button>

                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}