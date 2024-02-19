import Image from "next/image";
import logo from "/Users/alisonherrera/Desktop/Tech/ai-tutorial/nextjs-ai-app/src/app/assets/logo.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

export default function Home() {
  //check if user is logged in
  const { userId } = auth();
  if (userId) redirect("/notes");

  return (
    <main className='flex flex-col h-screen items-center justify-center gap-5'>
      <div className='flex flex-items gap-4'>
        <Image src={logo} alt='logo' width={100} height={100} />
        <span className='font-extrabold tracking-tight text-4xl lg:text-5xl'>
          AI App
        </span>
      </div>
      <p className='max-w-prose text-center'>
        An intelligent note-taking app with AI integration, built with OpenAI,
        Pinecone, Next.Js, Shadcn UI, Clerk, and more.
      </p>
      <Button size='lg' asChild>
        <Link href='/notes'>Open</Link>
      </Button>
    </main>
  );
}
