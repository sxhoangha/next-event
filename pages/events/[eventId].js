import { useRouter } from "next/router";

export default function EventDetailPage() {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h2>This show a specific event</h2>
    </div>
  );
}
