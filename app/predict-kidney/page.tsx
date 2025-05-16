"use client";
import { useState } from "react";
import Link from "next/link";

export default function KidneyPredictionForm() {
  const [form, setForm] = useState({
    bloodPressure: "",
    specificGravity: "",
    albumin: "",
    sugar: "",
    bloodGlucose: "",
    bloodUrea: "",
    serumCreatinine: "",
    sodium: "",
    potassium: "",
    hemoglobin: "",
    packedCellVolume: "",
    whiteBloodCellCount: "",
    redBloodCellCount: "",
    hypertension: "",
    diabetesMellitus: "",
    coronaryArteryDisease: "",
    appetite: "",
    pedalEdema: "",
    anemia: "",
  });

  const [result, setResult] = useState("");
  const [riskLevel, setRiskLevel] = useState<"low" | "moderate" | "high" | "">(
    ""
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateRisk = () => {
    const bp = Number(form.bloodPressure);
    const glucose = Number(form.bloodGlucose);
    const creatinine = Number(form.serumCreatinine);
    const anemia = form.anemia.toLowerCase();

    if (bp > 140 || glucose > 140 || creatinine > 1.3 || anemia === "yes") {
      return "High risk of Kidney Disease detected.";
    } else if (bp > 120 || glucose > 120 || creatinine > 1.1) {
      return "Moderate risk of Kidney Disease.";
    } else {
      return "Low risk or no Kidney Disease.";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const risk = calculateRisk();
    setResult(risk);

    if (risk.includes("High")) setRiskLevel("high");
    else if (risk.includes("Moderate")) setRiskLevel("moderate");
    else setRiskLevel("low");
  };

  const dietCharts = {
    low: "/good-kidney-health.pdf",
    moderate: "/moderate-risk-kidney-diet.pdf",
    high: "/high-risk-kidney-diet.pdf",
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Kidney Disease Prediction
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Blood Pressure (mm Hg) *"
            name="bloodPressure"
            value={form.bloodPressure}
            onChange={handleChange}
            required
            type="number"
          />
          <InputField
            label="Specific Gravity"
            name="specificGravity"
            value={form.specificGravity}
            onChange={handleChange}
            type="number"
          />
          <InputField
            label="Albumin"
            name="albumin"
            value={form.albumin}
            onChange={handleChange}
            type="number"
          />
          <InputField
            label="Sugar"
            name="sugar"
            value={form.sugar}
            onChange={handleChange}
            type="number"
          />
          <InputField
            label="Blood Glucose Random (mg/dL) *"
            name="bloodGlucose"
            value={form.bloodGlucose}
            onChange={handleChange}
            required
            type="number"
          />
          <InputField
            label="Blood Urea (mg/dL)"
            name="bloodUrea"
            value={form.bloodUrea}
            onChange={handleChange}
            type="number"
          />
          <InputField
            label="Serum Creatinine (mg/dL) *"
            name="serumCreatinine"
            value={form.serumCreatinine}
            onChange={handleChange}
            required
            type="number"
          />
          <InputField
            label="Sodium (mEq/L)"
            name="sodium"
            value={form.sodium}
            onChange={handleChange}
            type="number"
          />
          <InputField
            label="Potassium (mEq/L)"
            name="potassium"
            value={form.potassium}
            onChange={handleChange}
            type="number"
          />
          <InputField
            label="Hemoglobin (g/dL)"
            name="hemoglobin"
            value={form.hemoglobin}
            onChange={handleChange}
            type="number"
          />
          <InputField
            label="Anemia (Yes/No) *"
            name="anemia"
            value={form.anemia}
            onChange={handleChange}
            required
            type="text"
            placeholder="Yes or No"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Predict Kidney Disease Risk
        </button>
      </form>

      {result && (
        <div
          className={`mt-8 p-6 rounded-lg max-w-3xl w-full text-center font-semibold ${
            riskLevel === "high"
              ? "bg-red-100 text-red-700"
              : riskLevel === "moderate"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-700"
          }`}
        >
          <p className="text-xl">{result}</p>

          {riskLevel === "low" && (
            <Link
              href={dietCharts.low}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Healthy Kidney Diet Chart
            </Link>
          )}

          {riskLevel === "moderate" && (
            <Link
              href={dietCharts.moderate}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-3 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
            >
              Moderate Risk Kidney Diet Chart
            </Link>
          )}

          {riskLevel === "high" && (
            <>
              <Link
                href={dietCharts.high}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Kidney Disease Control Diet Chart
              </Link>
              <p className="mt-4 font-semibold text-red-800">
                We strongly recommend consulting a healthcare professional for
                further evaluation.
              </p>
              <Link
                href="/"
                className="mt-2 inline-block text-blue-700 underline"
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

// Reusable InputField component
function InputField({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
  placeholder = "",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
