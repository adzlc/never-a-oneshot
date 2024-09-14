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
import { type Campaign } from "~/data/typings";
import { toast } from "~/hooks/use-toast";

const CampaignDeleteDialog = ({
  deleteAction,
  campaign,
}: {
  deleteAction: (id: string) => Promise<void>;
  campaign: Campaign;
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
              <DialogTitle className='text-primary'>Delete {campaign.name}</DialogTitle>
              <DialogDescription>
                Deleting a Campaign cannot be undone. To delete please
                enter <b>{campaign.name}</b> below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  placeholder="Enter name of Campaign"
                  id="delete-heck"
                  name="delete-check"
                  className="w-60"
                  onChange={(e) => {
                    const value = e.currentTarget.value;
                    setCorrectName(value.localeCompare(campaign.name, undefined, { sensitivity: 'accent' }) === 0);
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
                  onClick={async () => {
                    await deleteAction(campaign.id);
                    toast({ description: `${campaign.name} successfully deleted` })
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

export default CampaignDeleteDialog;
