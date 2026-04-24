import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';

const Unauthorized = () => {
	const navigate = useNavigate();
	return (
		<section>
			<div className="flex min-h-screen w-screen flex-col items-center justify-center gap-y-5">
				<h1 className="bg-primary bg-clip-text text-9xl font-bold text-transparent">
					401
				</h1>
				<p className="text-3xl font-medium text-neutral">
					No Authorization found
				</p>
				<Button
					className="btn-primary-content btn px-16"
					onClick={() => navigate("/products/")}
				>
					Go back
				</Button>
			</div>
		</section>
	);
};

export default Unauthorized;
