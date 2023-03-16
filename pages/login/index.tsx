import AuthWindow from "@/components/auth/authWindow";
import { GetServerSidePropsContext } from "next";
import { useSession, getSession } from "next-auth/react";
import { useState } from "react";

export default function Login() {
	const [showAuth, setShowAuth] = useState(false);
	const { status } = useSession();

	if (status === "unauthenticated") {
		return (
			<div>
				<h2>Please Login</h2>
				<button onClick={() => setShowAuth(true)}>Sign In with Google</button>
				{showAuth && <AuthWindow title="Sample Sign In" url="/google-signin" />}
			</div>
		);
	}

	return (
		<div>
			<h1>Loading...</h1>
		</div>
	);
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const session = await getSession(ctx);

	if (session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
