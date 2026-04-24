import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';

interface ErrorProps{
	message: string;
}

const Error404 = ({message}: ErrorProps) => {
	const navigate = useNavigate();
	return (
		<section>
			<div className="flex min-h-screen w-screen flex-col items-center justify-center gap-y-5">

				<h1 className="bg-primary  bg-clip-text text-9xl font-bold text-transparent">
					404
				</h1>
				<p className="text-3xl font-medium text-neutral">
					{message ? message : 'Page not found'}</p>
				<Button
					className="btn-primary-content btn px-16"
					onClick={() => navigate(-1)}
				>
					Go back
				</Button>
			</div>
		</section>
	);
};

export default Error404;
