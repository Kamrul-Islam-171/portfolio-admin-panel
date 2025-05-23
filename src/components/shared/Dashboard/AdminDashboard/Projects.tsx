"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { MyTable } from "@/components/Common/MyTable";
import { Edit, Trash2 } from "lucide-react";
import { TProject } from "@/types";
import { toast } from "sonner";
import { addProject, deleteProject, updateProject } from "@/service/MyInfo";

const formSchema = z.object({
  title: z.string().min(1),
  details: z.string().min(1),
  keyFeatures: z.string().min(1),
  techStack: z.string().min(1),
  imageUrl: z.string().url(),
  liveLink: z.string().url(),
  clientLink: z.string().url(),
  serverLink: z.string().url(),
});

type FormData = z.infer<typeof formSchema>;

const Projects = ({ projects }: { projects: TProject[] }) => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TProject | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      details: "",
      keyFeatures: "",
      techStack: "",
      imageUrl: "",
      liveLink: "",
      clientLink: "",
      serverLink: "",
    },
  });

  useEffect(() => {
    if (selectedItem) {
      form.reset({
        title: selectedItem.title,
        details: selectedItem.details,
        keyFeatures: selectedItem.keyFeatures.join(", "),
        techStack: selectedItem.techStack.join(", "),
        imageUrl: selectedItem.imageUrl,
        liveLink: selectedItem.liveLink,
        clientLink: selectedItem.clientLink,
        serverLink: selectedItem.serverLink,
      });
    } else {
      form.reset();
    }
  }, [selectedItem, form]);

  const handleEdit = (project: TProject) => {
    setSelectedItem(project);
    setEditMode(true);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteProject(id);
      if (res?.success) {
        toast.success("Project deleted successfully");
      } else {
        toast.error("Failed to delete project");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onSubmit = async (data: FormData) => {
    const projectData = {
      ...data,
      keyFeatures: data.keyFeatures.split(",").map((item) => item.trim()),
      techStack: data.techStack.split(",").map((item) => item.trim()),
    };
    console.log(projectData);

    try {
      let res;
      if (editMode && selectedItem) {
        res = await updateProject(selectedItem._id, projectData);
      } else {
        res = await addProject(projectData);
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
    form.reset();
    setEditMode(false);
    setSelectedItem(null);
  };

  const columns: ColumnDef<TProject>[] = [
    {
      accessorKey: "title",
      header: () => <div>Title</div>,
      cell: ({ row }) => <div>{row.original.title}</div>,
    },
    {
      accessorKey: "details",
      header: () => <div>Details</div>,
      cell: ({ row }) => <div>{row.original.details.slice(0, 20)}...</div>,
    },
    {
      accessorKey: "liveLink",
      header: () => <div>Live Link</div>,
      cell: ({ row }) => (
        <a target="_blank" href={row.original.liveLink}>
          <Button>Go Live</Button>
        </a>
      ),
    },
    {
      accessorKey: "update",
      header: () => <div>Update</div>,
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-green-500 hover:text-green-600"
          onClick={() => handleEdit(row.original)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "delete",
      header: () => <div>Delete</div>,
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
          onClick={() => handleDelete(row.original._id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
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
                form.reset({
                  title: "",
                  details: "",
                  keyFeatures: "",
                  techStack: "",
                  imageUrl: "",
                  liveLink: "",
                  clientLink: "",
                  serverLink: "",
                });
              }}
            >
              Add New
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editMode ? "Update Project" : "Add Project"}
              </DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {[
                  "title",
                  "details",
                  "keyFeatures",
                  "techStack",
                  "imageUrl",
                  "liveLink",
                  "clientLink",
                  "serverLink",
                ].map((field) => {
                  let placeholder = `Enter ${field}`;
                  if (field === "keyFeatures") {
                    placeholder =
                      "e.g., Secure login, Asset tracking, Role management";
                  } else if (field === "techStack") {
                    placeholder = "e.g., React.js, Node.js, MongoDB";
                  }

                  return (
                    <FormField
                      key={field}
                      control={form.control}
                      name={field as keyof FormData}
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel className="capitalize">{field}</FormLabel>
                          <FormControl>
                            <Input placeholder={placeholder} {...formField} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                })}

                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button type="button" variant="ghost">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">
                    {editMode ? "Update" : "Submit"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <MyTable columns={columns} data={projects} />
    </div>
  );
};

export default Projects;
