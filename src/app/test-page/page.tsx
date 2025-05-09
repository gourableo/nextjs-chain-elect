import { Calendar } from "@/components/ui/calendar";

export default function TestPage() {
  return (
    <main>
      <Calendar captionLayout="dropdown-buttons" fromYear={1990} toYear={2021} />
    </main>
  );
}
