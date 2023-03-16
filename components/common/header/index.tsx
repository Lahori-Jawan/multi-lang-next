import React from "react";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
	const { data: session, status } = useSession();
	return (
		<div>
			{status === "authenticated" && (
				<button onClick={() => signOut()}>Sign out </button>
			)}
		</div>
	);
}
