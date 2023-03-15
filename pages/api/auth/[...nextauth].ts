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
	// session: {
	// 	strategy: "jwt",
	// },
	// pages: {
	// 	signIn: "/login",
	// },
	// callbacks: {
	// 	async signIn({ user, account, profile, email, credentials }) {
	// 		console.log("Signin", { user, account, profile, email, credentials });
	// 		return true;
	// 	},
	// 	async redirect({ url, baseUrl }) {
	// 		console.log("Redirect", { url, baseUrl });
	// 		return baseUrl;
	// 	},
	// 	async session({ session, token, user }) {
	// 		console.log("Session", { session, token, user });
	// 		return session;
	// 	},
	// 	async jwt({ token, user, account, profile, isNewUser }) {
	// 		console.log("JWT", { token, user, account, profile, isNewUser });
	// 		return token;
	// 	},
	// 	// async jwt(token, user) {
	// 	// 	if (user) {
	// 	// 		// `user` will be the return value of `authorize` if user first login.
	// 	// 		return user;
	// 	// 	} else {
	// 	// 		// after login, `token` is the decoded jwt from current session-token.
	// 	// 		return token;
	// 	// 	}
	// 	// },
	// 	// 	async signIn({ account, profile }) {
	// 	// 		if (account?.provider === "google") {
	// 	// 			return profile?.email_verified && profile?.email?.endsWith("@example.com");
	// 	// 		}
	// 	// 		return true; // Do different verification for other providers that don't have `email_verified`
	// 	// 	},
	// },
});
