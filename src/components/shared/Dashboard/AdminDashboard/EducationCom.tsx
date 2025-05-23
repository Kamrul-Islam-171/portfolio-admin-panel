// 'use client';
// import { MyTable } from "@/components/Common/MyTable";
// import { Button } from "@/components/ui/button";
// import { TEducationItem } from "@/types";
// import { ColumnDef } from "@tanstack/react-table";
// import { Edit, Trash2 } from "lucide-react";

// const EducationCom = ({ education }: { education: TEducationItem[] }) => {
//   const columns: ColumnDef<TEducationItem>[] = [
//     {
//       accessorKey: "degree",
//       header: () => <div>Degree</div>,
//       cell: ({ row }) => <div className="">{row.original.degree}</div>,
//     },
//     {
//       accessorKey: "university",
//       header: () => <div>University</div>,
//       cell: ({ row }) => <div className="">{row.original.university}</div>,
//     },
//     {
//       accessorKey: "Passing Year",
//       header: () => <div>passingYear</div>,
//       cell: ({ row }) => <div className="">{row.original.passingYear}</div>,
//     },

//     {
//       accessorKey: "delete",
//       header: () => <div>Delete</div>,
//       cell: ({ row }) => (
//         <div className=" text-center w-16">
//           <Button
//             variant="ghost"
//             size="sm"
//             //   onClick={()=> {
//             //     setDeleteIdeaId(row.original.id);
//             //     setShowDeleteModal(true)
//             //   }}
//             // onClick={() => handleDeleteClick(row.original.id)}
//             className="h-8 w-8 p-0 text-red-500 hover:text-red-600 cursor-pointer"
//           >
//             <Trash2 className="h-4 w-4" />
//           </Button>
//         </div>
//       ),
//     },
//     {
//       accessorKey: "update",
//       header: () => <div>Update</div>,
//       cell: ({ row }) => (
//         <div className=" text-center w-16">
//           <Button
//             variant="ghost"
//             size="sm"
//             //   onClick={()=> {
//             //     setDeleteIdeaId(row.original.id);
//             //     setShowDeleteModal(true)
//             //   }}
//             // onClick={() => handleDeleteClick(row.original.id)}
//             className="h-8 w-8 p-0 text-green-500 hover:text-green-600 cursor-pointer"
//           >
//             <Edit className="h-4 w-4" />
//           </Button>
//         </div>
//       ),
//     },
//   ];
//   return (
//     <div>
//       <div className="flex justify-end my-5">
//         <Button className="cursor-pointer">Add New</Button>
//       </div>
//       <div>
//         <MyTable columns={columns} data={education}></MyTable>
//       </div>
//     </div>
//   );
// };

// export default EducationCom;

"use client";
import { MyTable } from "@/components/Common/MyTable";
import { Button } from "@/components/ui/button";
import { TEducationItem } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
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
import {
  addEducation,
  deleteEducation,
  updateEducation,
} from "@/service/MyInfo";

const formSchema = z.object({
  degree: z.string().min(1),
  university: z.string().min(1),
  location: z.string().min(1),
  passingYear: z.string().min(1),
});

type FormData = z.infer<typeof formSchema>;

const EducationCom = ({ education }: { education: TEducationItem[] }) => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TEducationItem | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      degree: selectedItem?.degree || "",
      university: selectedItem?.university || "",
      location: selectedItem?.location || "",
      passingYear: selectedItem?.passingYear || "",
    },
  });

  useEffect(() => {
    if (selectedItem) {
      form.reset({
        degree: selectedItem.degree,
        university: selectedItem.university,
        location: selectedItem.location,
        passingYear: selectedItem.passingYear,
      });
    } else {
      // console.log("i am in")
      form.reset({
        degree: "",
        university: "",
        location: "",
        passingYear: "",
      });
    }
  }, [selectedItem, form]);

  // console.log(selectedItem);

  const handleDelete = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteEducation(id);
      if (res?.success) toast.success(res.message);
      else toast.error("Failed to delete.");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  const handleEdit = async (data: TEducationItem) => {
    setEditMode(true);
    setSelectedItem(data);
    setOpen(true);
  };

  const onSubmit = async (data: FormData) => {
    const educationData = {
      degree: data.degree,
      university: data.university,
      location: data.location,
      passingYear: data.passingYear,
    };

    try {
      let res;
      if (editMode && selectedItem) {
        // Update existing
        res = await updateEducation(selectedItem._id, educationData);
        // setSelectedItem(null);
      } else {
        // Add new
        res = await addEducation(educationData);
      }

      if (res?.success) {
        toast.success(res.message || "Success!");
        // setSelectedItem(null);
      } else {
        toast.error("Try again.");
        // setSelectedItem(null);
      }
    } catch (error) {
      console.error(error);
      setSelectedItem(null);
      toast.error("Something went wrong.");
    }

    setOpen(false);
    form.reset();
    setEditMode(false);
    setSelectedItem(null);
  };

  const columns: ColumnDef<TEducationItem>[] = [
    {
      accessorKey: "degree",
      header: () => <div>Degree</div>,
      cell: ({ row }) => <div>{row.original.degree}</div>,
    },
    {
      accessorKey: "university",
      header: () => <div>University</div>,
      cell: ({ row }) => <div>{row.original.university}</div>,
    },
    {
      accessorKey: "location",
      header: () => <div>Location</div>,
      cell: ({ row }) => <div>{row.original.location}</div>,
    },
    {
      accessorKey: "passingYear",
      header: () => <div>Passing Year</div>,
      cell: ({ row }) => <div>{row.original.passingYear}</div>,
    },
    {
      accessorKey: "delete",
      header: () => <div>Delete</div>,
      cell: ({ row }) => (
        <div className="text-center w-16">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 cursor-pointer"
            onClick={() => handleDelete(row.original._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "update",
      header: () => <div>Update</div>,
      cell: ({ row }) => (
        <div className="text-center w-16">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-green-500 hover:text-green-600 cursor-pointer"
            onClick={() => {
              handleEdit(row.original);
              setSelectedItem(row.original);
              form.reset({
                degree: row.original?.degree,
                university: row.original?.university,
                location: row.original?.location,
                passingYear: row.original?.passingYear,
              });
            }}
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
                form.reset({
                  degree: "",
                  university: "",
                  location: "",
                  passingYear: "",
                });
              }}
            >
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editMode ? "Update" : "Add New"} Education
              </DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {["degree", "university", "location", "passingYear"].map(
                  (fieldName) => (
                    <FormField
                      key={fieldName}
                      control={form.control}
                      name={fieldName as keyof FormData}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="capitalize">
                            {fieldName}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={`Enter ${fieldName}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                )}

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

      <MyTable columns={columns} data={education} />
    </div>
  );
};

export default EducationCom;
