 export default function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

