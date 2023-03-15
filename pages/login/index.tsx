import AuthWindow from "@/components/auth/authWindow";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
	const [showAuth, setShowAuth] = useState(false);
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session) {
			router.push("/", undefined, { locale: router.locale });
		}
	}, [session]);

	if (status === "authenticated") {
		return (
			<div>
				<h2> Welcome {session?.user?.email} 😀</h2>
				<button onClick={() => signOut()}>Sign out</button>
			</div>
		);
	} else if (status === "unauthenticated") {
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
