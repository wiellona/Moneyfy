import React from 'react';

const AboutUsSection = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold">
          About <span className="text-purple-600">Us</span>
        </h2>
        <p className="text-gray-600 mt-4 max-w-3xl mx-auto leading-relaxed">
          We're dedicated to transforming your financial journey with innovative solutions that make money management simple and effective.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div>
          <img
            src="https://via.placeholder.com/600x400"
            alt="Financial journey"
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </div>

        {/* Text and Stats */}
        <div>
          <h3 className="text-xl font-semibold mb-5">Our Mission</h3>
          <p className="mb-8 text-gray-700 leading-relaxed">
            At MoneyFy, we believe everyone deserves financial freedom. Our platform combines cutting-edge technology with user-friendly design to help you make smarter financial decisions.
          </p>

          <div className="flex gap-6 justify-center md:justify-start">
            <div className="bg-white rounded-lg shadow p-6 w-40 text-center">
              <h4 className="text-purple-600 font-semibold text-2xl">1M+</h4>
              <p className="text-gray-600 text-sm mt-1">Active Users</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 w-40 text-center">
              <h4 className="text-purple-600 font-semibold text-2xl">$500M+</h4>
              <p className="text-gray-600 text-sm mt-1">Savings Tracked</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
