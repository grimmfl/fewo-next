import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center p-6">
      <div className="bg-amber-50">
        <Image src="/BadP1.jpg" width="960" height="540" alt="Bad"/>
      </div>
    </main>
  );
}
