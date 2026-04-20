import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Vedic Math Practice",
	description:
		"Master ancient Indian mathematical techniques with interactive practice",
	generator: "v0.app",
	icons: {
		icon: [
			{
				url: "icons/favicon-32x32.png",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "icons/favicon-32x32.png",
				media: "(prefers-color-scheme: dark)",
			},
			{
				url: "icons/favicon.ico",
				type: "image/x-icon",
			},
		],
		apple: "icons/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="bg-background">
			<body className="font-sans antialiased bg-background text-foreground">
				{children}
				{process.env.NODE_ENV === "production" && <Analytics />}
			</body>
		</html>
	);
}
