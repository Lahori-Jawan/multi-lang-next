import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { IntlProvider } from "react-intl";
import Link from "next/link";
import English from "../lang/en/about.json";
import Arabic from "../lang/ar/about.json";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
	const { asPath, locale = "en", defaultLocale } = useRouter();

	const messages = useMemo(() => {
		switch (locale) {
			case "en":
				return English;
				break;
			case "ar":
				return Arabic;
				break;
			default:
				return English;
				break;
		}
	}, [locale]);

	const language = useMemo(() => {
		if (locale === "en") {
			return "ar";
		} else {
			return "en";
		}
	}, [locale]);

	const direction = locale === "ar" ? "rtl" : "ltr";

	return (
		<SessionProvider session={pageProps.session}>
			<IntlProvider
				messages={messages}
				locale={locale}
				defaultLocale={defaultLocale}
			>
				<Link href={asPath} locale={language}>
					{language}
				</Link>
				<Component {...pageProps} dir={direction} />
			</IntlProvider>
		</SessionProvider>
	);
}
