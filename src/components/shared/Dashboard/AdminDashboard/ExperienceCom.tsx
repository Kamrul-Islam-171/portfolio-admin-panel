'use client';

import { MyTable } from "@/components/Common/MyTable";
import { Button } from "@/components/ui/button";
import { ExperienceItem } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { addExperience, updateExperience } from "@/service/MyInfo";

const formSchema = z.object({
  companyName: z.string().min(1),
  position: z.string().min(1),
  location: z.string().min(1),
  jobType: z.enum(["Remote", "On-site"]),
  jobDescription: z.string().min(1),
});

type FormData = z.infer<typeof formSchema>;

const defaultValues: FormData = {
  companyName: "",
  position: "",
  location: "",
  jobType: "Remote",
  jobDescription: "",
};

const Experience = ({ experience }: { experience: ExperienceItem[] }) => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (selectedItem) {
      form.reset({
        companyName: selectedItem.companyName,
        position: selectedItem.position,
        location: selectedItem.location,
        jobType: selectedItem.jobType as "Remote" | "On-site",
        jobDescription: selectedItem.jobDescription,
      });
    } else {
      form.reset(defaultValues);
    }
  }, [selectedItem, form]);

  const handleEdit = (data: ExperienceItem) => {
    setEditMode(true);
    setSelectedItem(data);
    setOpen(true);
  };

  const onSubmit = async (data: FormData) => {
    try {
      let res;
      if (editMode && selectedItem) {
        res = await updateExperience(selectedItem._id, data);
      } else {
        res = await addExperience(data);
      }

      if (res?.success) {
        toast.success(res.message || "Success!");
      } else {
        toast.error("Try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }

    setOpen(false);
    form.reset(defaultValues);
    setEditMode(false);
    setSelectedItem(null);
  };

  const columns: ColumnDef<ExperienceItem>[] = [
    {
      accessorKey: "companyName",
      header: () => <div>Company</div>,
      cell: ({ row }) => <div>{row.original.companyName}</div>,
    },
    {
      accessorKey: "position",
      header: () => <div>Position</div>,
      cell: ({ row }) => <div>{row.original.position}</div>,
    },
    {
      accessorKey: "location",
      header: () => <div>Location</div>,
      cell: ({ row }) => <div>{row.original.location}</div>,
    },
    {
      accessorKey: "jobType",
      header: () => <div>Job Type</div>,
      cell: ({ row }) => <div>{row.original.jobType}</div>,
    },
    // {
    //   accessorKey: "jobDescription",
    //   header: () => <div>Description</div>,
    //   cell: ({ row }) => <div>{row.original.jobDescription}</div>,
    // },
    {
      accessorKey: "update",
      header: () => <div>Update</div>,
      cell: ({ row }) => (
        <div className="text-center w-16">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-green-500 hover:text-green-600 cursor-pointer"
            onClick={() => handleEdit(row.original)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end my-5">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditMode(false);
                setSelectedItem(null);
                form.reset(defaultValues);
              }}
            >
              Add New
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editMode ? "Update" : "Add New"} Experience</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {["companyName", "position", "location", "jobDescription"].map(
                  (fieldName) => (
                    <FormField
                      key={fieldName}
                      control={form.control}
                      name={fieldName as keyof FormData}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="capitalize">{fieldName}</FormLabel>
                          <FormControl>
                            <Input placeholder={`Enter ${fieldName}`} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                )}

                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Type</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full border rounded-md p-2"
                        >
                          <option value="Remote">Remote</option>
                          <option value="On-site">On-site</option>
                        </select>
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
                  <Button type="submit">{editMode ? "Update" : "Submit"}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <MyTable columns={columns} data={experience} />
    </div>
  );
};

export default Experience;
