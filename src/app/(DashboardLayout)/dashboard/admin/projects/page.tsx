export const dynamic = 'force-dynamic'
import Projects from "@/components/shared/Dashboard/AdminDashboard/Projects";
import { getProjects } from "@/service/MyInfo";


const page = async() => {
    const data = await getProjects();
    const projects = data?.data;
    return (
        <div>
            <Projects projects={projects}></Projects>
        </div>
    );
};

export default page;