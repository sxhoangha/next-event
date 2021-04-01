import Link from "next/link";
import classes from "./button.module.css";

export default function Button({ children, link, onClick }) {
  return link ? (
    <Link href={link}>
      <a className={classes.btn}>{children}</a>
    </Link>
  ) : (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
}
