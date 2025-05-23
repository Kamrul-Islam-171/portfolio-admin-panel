"use client";
import { MyTable } from "@/components/Common/MyTable";
import { Button } from "@/components/ui/button";
import { TSkill } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { addSkill, deleteSkill } from "@/service/MyInfo";

const formSchema = z.object({
  skill: z.string().min(1, { message: "Skill is required" }),
  iconUrl: z.string().min(1, { message: "Valid icon URL is required" }),
});

type FormData = z.infer<typeof formSchema>;

const Skillcomponent = ({ skills }: { skills: TSkill[] }) => {
  const [open, setOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleDelete = async(id:string) => {
    try {
      const res = await deleteSkill(id);
      if(res?.success) {
        toast.success(res?.message);
      }
      else {
        toast.error('try again')
      }
    } catch (error) {
      console.log(error)
      toast.error('try again')
    }
  }

  const columns: ColumnDef<TSkill>[] = [
    {
      accessorKey: "skill",
      header: () => <div>Skill</div>,
      cell: ({ row }) => <div>{row.original.skill}</div>,
    },
    {
      accessorKey: "delete",
      header: () => <div>Delete Skill</div>,
      cell: ({ row }) => (
        <div className="text-center w-16">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(row.original._id)}
            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skill: "",
      iconUrl: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const skillData = {
      skill: data?.skill,
      skillIcon: data?.iconUrl,
    };
    try {
      setIsAdding(true);
      const res = await addSkill(skillData);
      if(res?.success) {
        toast.success("Skill Added");
        setIsAdding(true)
      }
      else {
        toast.error('Try again!')
        setIsAdding(true)
      }
    } catch (error) {
      console.log(error);
      setIsAdding(true)
      toast.error('Try again!')
    }
    form.reset();
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-end my-5">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">Add New</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="skill"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="React, TypeScript, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="iconUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Icon URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/icon.png"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button type="button" variant="ghost">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button disabled={isAdding} type="submit">{isAdding?'Submitting...': 'Submit'}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <MyTable columns={columns} data={skills} />
    </div>
  );
};

export default Skillcomponent;
