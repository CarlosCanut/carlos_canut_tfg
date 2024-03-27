
import { useRouter } from "next/router";
import { RiTestTubeFill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";


export default function ProjectCard({ title="Draft Recommender", type="Draft tool", paper_link="", tool_link=""}) {
    const router = useRouter()

    return (
        <div className="flex flex-row gap-4 p-4 border-2 border-text rounded-md">
            <div className="flex flex-col items-start justify-center">
                <div className="text-2xl font-medium">
                    {title}
                </div>
                <div className="text-md font-thin">
                    {type}
                </div>
            </div>
            <div className="flex flex-row items-end justify-center gap-2">
                {paper_link === "" ? null : 
                    <IoDocumentText className="w-6 h-6 cursor-pointer" onClick={() => window.open(paper_link, '_blank').focus()} color="text" />
                }
                {tool_link === "" ? null :
                    <RiTestTubeFill className="w-6 h-6 cursor-pointer" onClick={() => router.push(tool_link)} color="text" />
                }
            </div>
        </div>
    )
}