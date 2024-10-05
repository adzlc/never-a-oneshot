"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DialogClose } from "@/components/ui/dialog";
import { type Quest } from "~/data/typings";
import { toast } from "~/hooks/use-toast";

const DeleteDialog = ({
  deleteAction,
  quest,
}: {
  deleteAction: (id: string) => Promise<void>;
  quest: Quest;
}) => {
  const [correctName, setCorrectName] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex justify-end gap-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="flex justify-end">
              <Button type="button" variant="destructive">Delete</Button>
            </div>
          </DialogTrigger>
          <DialogContent className="md:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete {quest.name}</DialogTitle>
              <DialogDescription>
                Deleting a quest cannot be undone. To delete please
                enter <b>{quest.name}</b> below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  placeholder="Enter name of Quest"
                  id="delete-sim-check"
                  name="delete-sim-check"
                  className="w-60"
                  onChange={(e) => {
                    const value = e.currentTarget.value;
                    setCorrectName(value.localeCompare(quest.name, undefined, { sensitivity: 'accent' }) === 0);
                  }}
                />
              </div>

            </div>
            <DialogFooter>
              <div className="grid grid-cols-2 items-center gap-5">
                <Button
                  id="deleteButton"
                  type="submit"
                  disabled={!correctName}
                  onClick={async (event) => {
                    event.preventDefault();
                    await deleteAction(quest.id);
                    toast({ description: `${quest.name} successfully deleted` })
                  }}
                >
                  Delete
                </Button>

                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default DeleteDialog;
