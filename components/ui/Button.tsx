import Link from "next/link";
import styles from "./Button.module.css";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
};

export default function Button({ href, variant = "primary", children }: ButtonProps) {
  return (
    <Link href={href} className={`${styles.button} ${styles[variant]}`}>
      {children}
    </Link>
  );
}
