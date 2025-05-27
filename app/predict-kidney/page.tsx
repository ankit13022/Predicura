"use client";
import { useState } from "react";
import Link from "next/link";

export default function KidneyPredictionForm() {
  const [form, setForm] = useState({
    specificGravity: "",
    albumin: "",
    hemoglobin: "",
    redBloodCellCount: "",
    hypertension: "",
    diabetesMellitus: "",
    appetite: "",
    pedalEdema: "",
  });

  const [result, setResult] = useState("");
  const [riskLevel, setRiskLevel] = useState<"low" | "high" | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.specificGravity) newErrors.specificGravity = "Required";
    if (!form.albumin) newErrors.albumin = "Required";
    if (!form.hemoglobin) newErrors.hemoglobin = "Required";
    if (!form.redBloodCellCount) newErrors.redBloodCellCount = "Required";
    if (!form.hypertension) newErrors.hypertension = "Required";
    if (!form.diabetesMellitus) newErrors.diabetesMellitus = "Required";
    if (!form.appetite) newErrors.appetite = "Required";
    if (!form.pedalEdema) newErrors.pedalEdema = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const calculateRisk = () => {
    const sg = parseFloat(form.specificGravity);
    const alb = parseInt(form.albumin);
    const hgb = parseFloat(form.hemoglobin);
    const rbc = parseFloat(form.redBloodCellCount);
    const hyper = form.hypertension.toLowerCase();
    const diabetes = form.diabetesMellitus.toLowerCase();
    const appetite = form.appetite.toLowerCase();
    const edema = form.pedalEdema.toLowerCase();

    if (
      sg < 1.01 ||
      alb > 2 ||
      hgb < 11 ||
      rbc < 4 ||
      hyper === "yes" ||
      diabetes === "yes" ||
      appetite === "poor" ||
      edema === "yes"
    ) {
      return "High risk of Kidney Disease detected.";
    } else {
      return "Low risk or no Kidney Disease.";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setResult("");
    setRiskLevel("");

    setTimeout(() => {
      const risk = calculateRisk();
      setResult(risk);
      setRiskLevel(risk.includes("High") ? "high" : "low");
      setIsLoading(false);
    }, 2000);
  };

  const dietCharts = {
    low: "/good-kidney-health.pdf",
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
            label="Specific Gravity *"
            name="specificGravity"
            value={form.specificGravity}
            onChange={handleChange}
            type="number"
            step="0.001"
            min="1.000"
            max="1.050"
            error={errors.specificGravity}
          />
          <InputField
            label="Albumin (0-5) *"
            name="albumin"
            value={form.albumin}
            onChange={handleChange}
            type="number"
            min="0"
            max="5"
            error={errors.albumin}
          />
          <InputField
            label="Hemoglobin (g/dL) *"
            name="hemoglobin"
            value={form.hemoglobin}
            onChange={handleChange}
            type="number"
            step="0.1"
            min="0"
            error={errors.hemoglobin}
          />
          <InputField
            label="Red Blood Cell Count (millions/cmm) *"
            name="redBloodCellCount"
            value={form.redBloodCellCount}
            onChange={handleChange}
            type="number"
            step="0.1"
            min="0"
            error={errors.redBloodCellCount}
          />
          <SelectField
            label="Hypertension *"
            name="hypertension"
            value={form.hypertension}
            onChange={handleChange}
            options={["", "Yes", "No"]}
            error={errors.hypertension}
          />
          <SelectField
            label="Diabetes Mellitus *"
            name="diabetesMellitus"
            value={form.diabetesMellitus}
            onChange={handleChange}
            options={["", "Yes", "No"]}
            error={errors.diabetesMellitus}
          />
          <SelectField
            label="Appetite *"
            name="appetite"
            value={form.appetite}
            onChange={handleChange}
            options={["", "Normal", "Poor"]}
            error={errors.appetite}
          />
          <SelectField
            label="Pedal Edema *"
            name="pedalEdema"
            value={form.pedalEdema}
            onChange={handleChange}
            options={["", "Yes", "No"]}
            error={errors.pedalEdema}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded transition flex items-center justify-center ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            "Predict Kidney Disease Risk"
          )}
        </button>
      </form>

      {isLoading && (
        <div className="mt-8 p-6 rounded-lg max-w-3xl w-full bg-white text-center">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-blue-600 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-lg font-medium text-gray-700">
              Analyzing your kidney health data...
            </p>
          </div>
        </div>
      )}

      {result && riskLevel && !isLoading && (
        <div
          className={`mt-8 p-6 rounded-lg max-w-3xl w-full text-center font-semibold ${
            riskLevel === "high"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          <p className="text-xl">{result}</p>

          <Link
            href={dietCharts[riskLevel]}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block mt-4 px-6 py-3 ${
              riskLevel === "low"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            } text-white rounded transition`}
          >
            {riskLevel === "low"
              ? "Healthy Kidney Diet Chart"
              : "Kidney Disease Control Diet Chart"}
          </Link>

          {riskLevel === "high" && (
            <>
              <p className="mt-4 font-semibold text-red-800">
                Please consult a doctor immediately.
              </p>
              <Link
                href="/#contact"
                className="mt-2 inline-block text-blue-700 underline"
              >
                Contact a Specialist
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
  type = "text",
  error = "",
  ...props
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  [key: string]: any;
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
        className={`px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-400"
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

// Reusable SelectField component
function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error = "",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  error?: string;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-400"
        }`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option || "-- Select --"}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
