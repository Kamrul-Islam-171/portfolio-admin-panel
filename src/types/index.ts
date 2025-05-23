




export interface IUser {
  id: string;
  name?: string;
  email?: string;
  imageUrl?: string;
  role?: string;
}


export interface IAllUser {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICurrentUser {
  email: string;
  exp: number;
  iat: number;
  role: string;
  userId: string;
}

// idea types
export interface Image {
  id: string;
  idea_id: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profile_image: string;
}














export interface TEducationItem {
  _id: string;
  degree: string;
  university: string;
  location: string;
  passingYear: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface TEducationData {
  
  degree: string;
  university: string;
  location: string;
  passingYear: string;

}

export interface ExperienceItem {
  _id: string;
  companyName: string;
  position: string;
  location: string;
  jobType: string;
  jobDescription: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface TExperienceData {
 
  companyName: string;
  position: string;
  location: string;
  jobType: string;
  jobDescription: string;
}

export type TBlog = {
  _id: string;
  title: string;
  details: string;
  coverImage: string;
};

export type TBlogData = {
   title: string;
  details: string;
  coverImage: string;
}

export type TSkill = {
  _id: string;
  skill: string;
  skillIcon: string;
};

export type TskillData = {
  skill: string;
  skillIcon: string;
}

export interface TProject {
  _id: string;
  title: string;
  details: string;
  keyFeatures: string[];
  techStack: string[];
  imageUrl: string;
  liveLink: string;
  clientLink: string;
  serverLink: string;
}
export interface TProjectData {

  title: string;
  details: string;
  keyFeatures: string[];
  techStack: string[];
  imageUrl: string;
  liveLink: string;
  clientLink: string;
  serverLink: string;
}