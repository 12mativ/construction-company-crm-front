import { Loader } from "lucide-react";

const LoaderIndicator = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
			<Loader className="animate-spin" size={40} />
		</div>
    )
}

export default LoaderIndicator;