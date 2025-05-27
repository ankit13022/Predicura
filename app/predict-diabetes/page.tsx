"use client";
import { useState } from "react";
import Link from "next/link";

type FormData = {
  pregnancies: string;
  glucose: string;
  bloodPressure: string;
  skinThickness: string;
  insulin: string;
  bmi: string;
  age: string;
};

export default function DiabetesPredictionForm() {
  const [form, setForm] = useState<FormData>({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    age: "",
  });

  const [result, setResult] = useState<string | null>(null);
  const [riskLevel, setRiskLevel] = useState<"low" | "high" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { glucose, bmi, age } = form;

    if (!glucose || !bmi || !age) {
      alert("Please fill in Glucose, BMI, and Age to get a prediction.");
      return;
    }

    setIsLoading(true);

    // Simulate processing delay
    setTimeout(() => {
      const score =
        parseFloat(glucose) * 0.5 +
        parseFloat(bmi) * 1.2 +
        parseFloat(age) * 0.3;

      const prediction = score > 100 ? "High Risk of Diabetes" : "Low Risk";

      setResult(prediction);
      setRiskLevel(prediction === "High Risk of Diabetes" ? "high" : "low");
      setIsLoading(false);
    }, 2000);
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
              value={form[name as keyof FormData]}
              onChange={handleChange}
              className="px-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 transition duration-300 text-lg"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 text-white text-xl font-semibold rounded-lg shadow-md transition duration-300 ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
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
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>

      {isLoading && (
        <div className="mt-10 w-full max-w-xl p-8 bg-white rounded-xl shadow-lg border border-gray-200 text-center">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-12 w-12 text-blue-600"
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
            <p className="mt-4 text-lg font-semibold text-gray-700">
              Analyzing your health data...
            </p>
          </div>
        </div>
      )}

      {result && riskLevel && !isLoading && (
        <div
          className={`mt-10 w-full max-w-xl p-6 rounded-xl shadow-lg text-center text-xl font-semibold ${
            riskLevel === "high"
              ? "bg-red-100 text-red-900 border border-red-400"
              : "bg-green-100 text-green-900 border border-green-400"
          }`}
        >
          <p>Prediction Result: {result}</p>

          <Link
            href={dietCharts[riskLevel]}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block mt-6 px-8 py-3 ${
              riskLevel === "high" ? "bg-red-600" : "bg-green-600"
            } text-white rounded-lg hover:${
              riskLevel === "high" ? "bg-red-700" : "bg-green-700"
            } shadow transition duration-300`}
          >
            Download{" "}
            {riskLevel === "high" ? "Diabetes Control" : "Healthy Diabetes"}{" "}
            Diet Chart
          </Link>

          {riskLevel === "high" && (
            <>
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
