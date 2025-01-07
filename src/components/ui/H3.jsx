export const H3 = ({ label, value, cls }) => {
  return (
    <h3 className={`font-bold ${cls}`}>
      {label}: <span className="font-normal">{value}</span>
    </h3>
  );
};