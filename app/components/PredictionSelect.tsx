"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PredictionSelect = () => {
  const router = useRouter();

  const handleSelect = (type: string) => {
    if (type === "diabetes") {
      router.push("/predict-diabetes");
    } else if (type === "kidney") {
      router.push("/predict-kidney");
    }
  };

  return (
    <section
      id="predict"
      className="flex flex-col items-center justify-center min-h-[60vh] bg-white px-6"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-10 text-center">
        Choose a Prediction Type
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
        {/* Diabetes Prediction Card */}
        <div
          onClick={() => handleSelect("diabetes")}
          className="cursor-pointer bg-gray-100 shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-xl transition mb-5"
        >
          <Image
            src="/diabetes-icon.png"
            alt="Diabetes Prediction"
            width={100}
            height={100}
            className="mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800">
            Diabetes Prediction
          </h3>
        </div>

        {/* Kidney Prediction Card */}
        <div
          onClick={() => handleSelect("kidney")}
          className="cursor-pointer bg-gray-100 shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-xl transition mb-5"
        >
          <Image
            src="/kidney-icon.png"
            alt="Kidney Prediction"
            width={100}
            height={100}
            className="mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800">
            Kidney Prediction
          </h3>
        </div>
      </div>
    </section>
  );
};

export default PredictionSelect;
