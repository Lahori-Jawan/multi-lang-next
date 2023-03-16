import React from "react";
import Header from "../header";

export const Layout = ({ children }: ReactChildren) => {
	return (
		<div className="layout">
			<Header />
			{children}
		</div>
	);
};
