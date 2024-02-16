import NavBar from "./NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className='p-4 max-w-7x1 m-auto'>{children}</main>
    </>
  );
}
