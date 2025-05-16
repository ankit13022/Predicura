import Link from "next/link";
import Image from "next/image";

const Intro = () => {
  return (
    <section className="bg-white py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        {/* Left content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
            Check Your Risk, Take Control
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Enter your medical information and let our intelligent AI model help
            predict the likelihood of diabetes and kidney disease. Fast, easy,
            and secure — empowering you to take control of your health with
            early insights, awareness, and confidence.
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
            src="/3657873.jpg"
            alt="disease illustration"
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
