'use client';
import MyProfile from "@/components/pages/modules/Profile";
import { useUser } from "@/context/userContext";

const ProfilePage = () => {
  console.log("profile page");
  const {user} = useUser();
  console.log(user)
  return (
    <>
      <MyProfile />
    </>
  );
};

export default ProfilePage;
