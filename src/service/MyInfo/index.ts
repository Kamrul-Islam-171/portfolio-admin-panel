"use server";

import { TBlogData, TEducationData, TExperienceData, TProjectData, TskillData } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getEducation = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/education`,
      {
        next: {
          tags: ["EDUCATION"],
          revalidate: 30
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const getExperience = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/experience`,
      {
        next: {
          tags: ["EXPERIENCE"],
          revalidate: 30
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const getSkills = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/skill`,
      {
        next: {
          tags: ["SKILL"],
          revalidate: 30
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const getProjects = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/project`,
      {
        next: {
          tags: ["PROJECT"],
         revalidate: 30
          
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const getAProjects = async (id:string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}`,
      {
        next: {
          tags: ["PROJECT"],
          revalidate: 30
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const getblogs = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`,
      {
        next: {
          tags: ["BLOG"],
         revalidate: 30
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const getSingleblog = async (id:string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${id}`,
      {
        next: {
          tags: ["BLOG"],
          revalidate: 30
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const addBlog = async (blogData: TBlogData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/add`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(blogData),
      }
    );

    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const addSkill = async (skillData: TskillData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/skill/add`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(skillData),
      }
    );
    revalidateTag('SKILL')

    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteSkill = async (id:string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/skill/delete/${id}`,
      {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        // body: JSON.stringify(skillData),
      }
    );
    revalidateTag('SKILL')

    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const addEducation = async (educationData: TEducationData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/education/add`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(educationData),
      }
    );
    revalidateTag('EDUCATION')

    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const updateEducation = async (id:string, educationData: Partial<TEducationData>) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/education/update/${id}`,
      {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(educationData),
      }
    );
    revalidateTag('EDUCATION')

    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const deleteEducation = async (id:string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/education/delete/${id}`,
      {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        // body: JSON.stringify(educationData),
      }
    );
    revalidateTag('EDUCATION')

    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const addExperience = async (experience: TExperienceData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/experience/add`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(experience),
      }
    );
    revalidateTag('EXPERIENCE')

    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const updateExperience = async (id: string, experience: Partial<TExperienceData>) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/experience/update/${id}`,
      {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(experience),
      }
    );
    revalidateTag('EXPERIENCE')

    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const addProject = async (project: TProjectData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/add`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(project),
      }
    );
    revalidateTag('PROJECT')

    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const updateProject = async (id:string, project: Partial<TProjectData>) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/update/${id}`,
      {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(project),
      }
    );
    revalidateTag('PROJECT')

    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const deleteProject = async (id:string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/delete/${id}`,
      {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        // body: JSON.stringify(project),
      }
    );
    revalidateTag('PROJECT')

    const result = await res.json();

    // console.log(result)
    return result;
  } catch (error: any) {
    return Error(error);
  }
};