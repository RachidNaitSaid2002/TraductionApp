import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex" aria-label="Cruip">
      <Image
        src="/images/translate (1).png"
        width={20}
        height={20}
        alt="Traduction IA pour e-commerce"
        className="w-full h-auto object-contain"
        priority
      />
    </Link>
  );
}