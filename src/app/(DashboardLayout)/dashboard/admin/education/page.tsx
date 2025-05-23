export const dynamic = 'force-dynamic'

import EducationCom from "@/components/shared/Dashboard/AdminDashboard/EducationCom";
import { getEducation } from "@/service/MyInfo";


const page = async() => {
    // console.time("fetchEducation");
    const data = await getEducation();
    const education = data?.data;
    // console.timeEnd("fetchEducation");
    return (
        <div>
            <EducationCom education={education}></EducationCom>
        </div>
    );
};

export default page;