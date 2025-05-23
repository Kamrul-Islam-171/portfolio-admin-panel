export const dynamic = 'force-dynamic'
import Skillcomponent from "@/components/shared/Dashboard/AdminDashboard/Skillcomponent";
import { getSkills } from "@/service/MyInfo";


const page = async() => {
    const data = await getSkills();
    const skills = data?.data;
    // console.log(skills)
    return (
        <div>
            <Skillcomponent skills={skills}></Skillcomponent>
        </div>
    );
};

export default page;