export const dynamic = 'force-dynamic'

import Experience from "@/components/shared/Dashboard/AdminDashboard/ExperienceCom";
import { getExperience } from "@/service/MyInfo";


const page = async() => {
    const data = await getExperience();
    const experience = data?.data;
    return (
        <div>
           <Experience experience={experience}></Experience> 
        </div>
    );
};

export default page;