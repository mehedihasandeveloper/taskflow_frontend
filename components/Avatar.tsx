type Props = { name: string; size?: number; src?: string | null };

export default function Avatar({ name, size = 32, src }: Props) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={name} width={size} height={size} style={{ width: size, height: size }} className="shrink-0 rounded-full object-cover" />;
  }
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      className="grid shrink-0 place-items-center rounded-full bg-blue-100 font-semibold text-blue-700"
    >
      {initials}
    </span>
  );
}