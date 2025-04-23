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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("This is a frontend-only form. No prediction will be made.");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Diabetes Prediction Form
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-4 p-6 bg-gray-50 rounded-xl shadow-md"
      >
        {[
          { label: "Pregnancies", name: "pregnancies" },
          { label: "Glucose Level", name: "glucose" },
          { label: "Blood Pressure", name: "bloodPressure" },
          { label: "Skin Thickness", name: "skinThickness" },
          { label: "Insulin Level", name: "insulin" },
          { label: "BMI (Body Mass Index)", name: "bmi" },
          { label: "Diabetes Pedigree Function", name: "dpf" },
          { label: "Age", name: "age" },
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
              required
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
    </main>
  );
}
