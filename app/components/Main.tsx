"use client";
import { useState } from "react";

export default function Main() {
  const [form, setForm] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    dpf: "",
    age: "",
  });

  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { glucose, bmi, age } = form;

    // Ensure required values are filled
    if (!glucose || !bmi || !age) {
      alert("Please fill in Glucose, BMI, and Age to get a prediction.");
      return;
    }

    // Dummy prediction logic
    const score =
      parseFloat(glucose) * 0.5 + parseFloat(bmi) * 1.2 + parseFloat(age) * 0.3;

    const prediction = score > 100 ? "High Risk of Diabetes" : "Low Risk";

    setResult(prediction);
  };

  return (
    <main
      id="predict"
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-white"
    >
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Diabetes Prediction Form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-4 p-6 bg-gray-50 rounded-xl shadow-md"
      >
        {[
          { label: "Pregnancies", name: "pregnancies" },
          { label: "Glucose Level *", name: "glucose" },
          { label: "Blood Pressure", name: "bloodPressure" },
          { label: "Skin Thickness", name: "skinThickness" },
          { label: "Insulin Level", name: "insulin" },
          { label: "BMI (Body Mass Index) *", name: "bmi" },
          { label: "Diabetes Pedigree Function", name: "dpf" },
          { label: "Age *", name: "age" },
        ].map(({ label, name }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="mb-1 font-medium text-gray-700">
              {label}
            </label>
            <input
              type="number"
              name={name}
              id={name}
              placeholder={`Enter ${label}`}
              value={form[name as keyof typeof form]}
              onChange={handleChange}
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      {result && (
        <div
          className={`mt-6 p-4 rounded-lg shadow text-lg font-semibold ${
            result === "High Risk of Diabetes"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          Prediction Result: {result}
        </div>
      )}
    </main>
  );
}
