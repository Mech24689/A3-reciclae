import SkipToContentLink from "../a11y/SkipToContentLink";
import Footer from "./Footer";
import Header from "./Header";

export default function AppLayout({
  children,
  bodyClassName,
  mainClassName,
  skipTargetId = "main-content",
}: Readonly<{
  children: React.ReactNode;
  bodyClassName?: string;
  mainClassName?: string;
  skipTargetId?: string;
}>) {
  return (
    <div className="app-shell">
      <SkipToContentLink targetId={skipTargetId} />
      <Header />
      <div className={["app-body grid grid-cols-12", bodyClassName].filter(Boolean).join(" ")}>
        <main id={skipTargetId} className={["col-span-12 p-3", mainClassName].filter(Boolean).join(" ")}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
