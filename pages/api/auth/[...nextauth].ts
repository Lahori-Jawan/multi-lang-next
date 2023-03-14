import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.NEXTAUTH_SECRET) {
	throw new Error("please provide NEXTAUTH_SECRET environment variable");
}

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	secret: process.env.JWT_SECRET,
	session: {
		strategy: "jwt",
	},
	// pages: {
	// 	signIn: "/login",
	// },
	// callbacks: {
	// 	async signIn({ account, profile }) {
	// 		if (account?.provider === "google") {
	// 			return profile?.email_verified && profile?.email?.endsWith("@example.com");
	// 		}
	// 		return true; // Do different verification for other providers that don't have `email_verified`
	// 	},
	// },
});
