const About = () => {
  return (
    <section className="bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
          About This Project
        </h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          The Diabetes Predictor is an AI-powered web application that allows
          users to assess their risk of developing diabetes based on a variety
          of health-related inputs. Built using modern web technologies like
          Next.js and TailwindCSS, this project aims to make predictive health
          tools more accessible and user-friendly.
        </p>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          The core of this application is a machine learning model trained on
          real-world medical data. By inputting values such as glucose levels,
          blood pressure, BMI, insulin levels, and other health indicators, the
          app quickly analyzes the data and provides an instant prediction. It's
          designed not as a replacement for professional diagnosis, but as a
          tool to increase awareness and encourage users to consult healthcare
          professionals if needed.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          This project was created to showcase how machine learning can be
          integrated into web development, and how technology can support
          personal health monitoring in a privacy-focused and intuitive way.
          Whether you're a developer exploring ML or someone interested in
          learning more about your health, this app is built with you in mind.
        </p>
      </div>
    </section>
  );
};

export default About;
