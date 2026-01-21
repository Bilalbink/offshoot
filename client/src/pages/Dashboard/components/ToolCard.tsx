import { useNavigate } from "react-router-dom";
import { TOOLS_CONFIG, type ToolType } from "../../../config/tools.config";

type ToolCardProps = {
    type: ToolType;
};

const ToolCard = ({ type }: ToolCardProps) => {
    const navigate = useNavigate();
    const tool = TOOLS_CONFIG[type];

    const handleRedirect = () => {
        if (tool.active) {
            navigate(tool.route);
        }
    };

    return (
        <div className="card bg-base-100 image-full w-96 shadow-sm">
            <figure>
                <img src={tool.image} alt={tool.name} />
            </figure>
            <div className="card-body text-white">
                <h2 className="card-title text-xl">{tool.name}</h2>
                <p>{tool.description}</p>
                <div className="card-actions justify-end">
                    <button
                        className={`btn ${tool.active ? "btn-primary" : "cursor-not-allowed btn-accent"}`}
                        onClick={handleRedirect}
                    >
                        {tool.active ? "Select" : "Coming Soon!"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ToolCard;
