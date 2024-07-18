import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-24 bg-opacity-70">
      <div className=" bg-opacity-70 p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-heading mb-4 text-light">Welcome to SheetCraft</h1>
        <p className="mb-4 text-light">
          Our application helps you analyze data related to Trypanosoma, also known as African sleeping sickness. We facilitate massive drug screens to see how various drugs affect parameters like pH, cell viability, and glucose levels in the cells.
        </p>
        <div className="mb-8">
          <div className="h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-gray-500">Image Placeholder 1</span>
          </div>
          <p className="mb-4 text-light">
            This section provides detailed analysis and insights into the effects of different drugs. Our tools allow you to visualize and interpret complex data sets with ease.
          </p>
        </div>
        <div className="mb-8">
          <div className="h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-gray-500">Image Placeholder 2</span>
          </div>
          <p className="mb-4 text-light">
            Explore our comprehensive suite of features designed to support your research and data analysis needs. From data visualization to statistical analysis, our application offers everything you need.
          </p>
        </div>
        <div className="mb-8">
          <div className="h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-gray-500">Image Placeholder 3</span>
          </div>
          <p className="mb-4 text-light">
            Join us in advancing biotech research with cutting-edge tools and technology. Our platform is designed to be user-friendly and accessible, ensuring that you can focus on your research without any hassle.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
