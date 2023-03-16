import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import AuthWindow from "@/components/auth/authWindow";

export default function Login() {
	const [showAuth, setShowAuth] = useState(false);
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session) {
			router.push("/", undefined, { locale: router.locale });
		}
	}, [session]);

	if (status === "unauthenticated") {
		return (
			<div>
				<h2>Please Login</h2>
				<button onClick={() => setShowAuth(true)}>Sign In with Google</button>
				{showAuth && (
					<AuthWindow title="Sample Sign In" url="/auth/google-signin" />
				)}
			</div>
		);
	}

	return (
		<div>
			<h1>Loading...</h1>
		</div>
	);
}

// getServerSideProps purpose is to check for session before hydration
// So if hydration happens, we need to redirect using client api i.e. useSession
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
