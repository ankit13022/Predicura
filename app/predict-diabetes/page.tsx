"use client";
import { useState } from "react";
import Link from "next/link";

export default function DiabetesPredictionForm() {
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
  const [riskLevel, setRiskLevel] = useState<"low" | "high" | "">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { glucose, bmi, age } = form;

    if (!glucose || !bmi || !age) {
      alert("Please fill in Glucose, BMI, and Age to get a prediction.");
      return;
    }

    const score =
      parseFloat(glucose) * 0.5 + parseFloat(bmi) * 1.2 + parseFloat(age) * 0.3;

    const prediction = score > 100 ? "High Risk of Diabetes" : "Low Risk";

    setResult(prediction);
    setRiskLevel(prediction === "High Risk of Diabetes" ? "high" : "low");
  };

  const dietCharts = {
    low: "/good-diabetes-health.pdf",
    high: "/high-risk-diabetes-diet.pdf",
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-8 text-center">
        Diabetes Prediction Form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-6 p-8 bg-white rounded-xl shadow-lg border border-gray-200"
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
            <label
              htmlFor={name}
              className="mb-2 text-md font-semibold text-gray-800"
            >
              {label}
            </label>
            <input
              type="number"
              name={name}
              id={name}
              placeholder={`Enter ${label}`}
              value={form[name as keyof typeof form]}
              onChange={handleChange}
              className="px-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 transition duration-300 text-lg"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-4 bg-blue-600 text-white text-xl font-semibold rounded-lg hover:bg-blue-700 shadow-md transition duration-300"
        >
          Submit
        </button>
      </form>

      {result && (
        <div
          className={`mt-10 w-full max-w-xl p-6 rounded-xl shadow-lg text-center text-xl font-semibold ${
            riskLevel === "high"
              ? "bg-red-100 text-red-900 border border-red-400"
              : "bg-green-100 text-green-900 border border-green-400"
          }`}
        >
          <p>Prediction Result: {result}</p>

          {riskLevel === "low" && (
            <Link
              href={dietCharts.low}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow transition duration-300"
            >
              Download Healthy Diabetes Diet Chart
            </Link>
          )}

          {riskLevel === "high" && (
            <>
              <Link
                href={dietCharts.high}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow transition duration-300"
              >
                Download Diabetes Control Diet Chart
              </Link>
              <p className="mt-6 font-semibold text-red-900">
                We strongly recommend consulting a healthcare professional for
                further evaluation.
              </p>
              <Link
                href="/"
                className="mt-3 inline-block text-blue-700 underline font-medium hover:text-blue-900 transition duration-300"
              >
                Consult to Doctor or Specialist
              </Link>
            </>
          )}
        </div>
      )}
    </main>
  );
}
