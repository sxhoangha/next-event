import Link from "next/link";
import classes from "./button.module.css";

export default function Button({ children, link }) {
  return (
    <Link href={link}>
      <a className={classes.btn}>{children}</a>
    </Link>
  );
}
