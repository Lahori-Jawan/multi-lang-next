import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

interface PopUpWindow {
	title: string;
	url: string;
}

function getWindowPoints() {
	const dualScreenLeft = window.screenLeft ?? window.screenX;
	const dualScreenTop = window.screenTop ?? window.screenY;
	const width =
		window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

	const height =
		window.innerHeight ??
		document.documentElement.clientHeight ??
		screen.height;

	const systemZoom = width / window.screen.availWidth;

	const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
	const top = (height - 550) / 2 / systemZoom + dualScreenTop;

	return { top, left, systemZoom };
}

const openWindow = (url: string, title: string) => {
	const { top, left, systemZoom } = getWindowPoints();
	const newWindow = window.open(
		url,
		title,
		`
		width=${500 / systemZoom},
		height=${550 / systemZoom},
		top=${top},
		left=${left}
		`
	);

	newWindow?.focus();
};

export default function AuthWindow({ title, url }: PopUpWindow) {
	useEffect(() => openWindow(url, title), []);
	return <></>;
}
