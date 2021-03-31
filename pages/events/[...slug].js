import { useRouter } from "next/router";

export default function FilteredEventsPage() {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h2>This page catch all routes and will show filtered events</h2>
    </div>
  );
}
