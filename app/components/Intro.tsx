import Link from "next/link";
import Image from "next/image";

const Intro = () => {
  return (
    <section className="bg-white py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        {/* Left content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
            Welcome to the Diabetes Predictor
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Enter your medical information and let our AI model help you predict
            the likelihood of diabetes. Fast, easy, and secure.
          </p>
          <Link
            href="#predict"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Right image */}
        <div className="md:w-1/2">
          <Image
            src="/diabetes-illustration.png"
            alt="Diabetes illustration"
            width={500}
            height={500}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Intro;
