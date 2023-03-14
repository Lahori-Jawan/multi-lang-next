import { AR_LOCALE, EN_LOCALE } from "./constants/misc.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ["default", EN_LOCALE, AR_LOCALE],
		defaultLocale: "default",
		localeDetection: false,
	},
};

export default nextConfig;
