"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500">
        <p className="text-white text-xl">Loading...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen flex-col justify-center items-center flex bg-gradient-to-r from-blue-500 to-purple-500">
        <h1 className="text-4xl text-white mb-4">CS391 OAuth App</h1>
        <button 
          onClick={() => signIn("github")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Sign in with GitHub
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-24 justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="max-w-md mx-auto bg-[#4B0082] p-8 rounded shadow text-center">
        <h1 className="text-2xl mb-4">User Info</h1>
        {session.user?.image && (
          <img 
            src={session.user.image} 
            alt="Profile" 
            className="w-24 h-24 rounded-full mb-4 mx-auto"
          />
        )}
        <p className="mb-2">Name: {session.user?.name}</p>
        <p className="mb-4">Email: {session.user?.email}</p>
        <button
          onClick={() => signOut()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded justify-center items-center flex mx-auto"
        >
          Sign Out
        </button>
      </div>
    </main>
  );
}