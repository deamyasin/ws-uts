import Head from "next/head";

export function Layout({ children }) {
	return (
		<main className="layout">
			<Head>
				<title>Dea Muhamad Yasin | 187006055</title>
			</Head>
			{children}
		</main>
	);
}
