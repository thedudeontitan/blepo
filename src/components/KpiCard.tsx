interface KpiCardProps {
  label: string;
  value: string | number;
}
export const KpiCard: React.FC<KpiCardProps> = ({ label, value }) => {
  return (
    <div className="bg-primary text-white p-5 w-full rounded-xl flex flex-col gap-4 hover:scale-105 transition-all">
      <div className="text-lg opacity-80 capitalize">{label}</div>
      <div className="text-3xl font-semibold">{value}</div>
    </div>
  );
};
