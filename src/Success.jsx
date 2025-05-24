import { useLocation, useNavigate } from "react-router-dom";

export default function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <p>No data submitted. <button onClick={() => navigate("/")} className="text-blue-500 underline">Go back</button></p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Submitted Data</h2>
      <ul className="space-y-2">
        {Object.entries(state).map(([key, value]) => (
          <li key={key}>
            <strong className="capitalize">{key.replace(/([A-Z])/g, " $1")}</strong>: {value}
          </li>
        ))}
      </ul>
    </div>
  );
}