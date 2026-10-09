export default function FormSuccess({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
      {message}
    </div>
  );
}