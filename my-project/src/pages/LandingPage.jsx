import iqbalImage from "../assets/M. Iqbal.jpg";
import neylaImage from "../assets/Neyla.jpeg";
import wieloImage from "../assets/Wielo.jpeg";
import ikhsanImage from "../assets/ikhsan.jpeg";

import { AlignEndHorizontal, FolderLock, Goal } from "lucide-react";
import { motion } from "motion/react";

// Animation variants for elements
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const LandingPage = () => {
  return (
    <div className="">
      {" "}
      <div className="bg-gradient-to-br from-white to-purple-200 h-full p-4">
        <div className="landing-page text-black">
          {/* Hero Section */}
          <motion.div
            className="text-center py-20 px-8 flex flex-col justify-center items-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              className="text-5xl font-extrabold mb-6"
              variants={fadeInUp}
            >
              Track. Save.{" "}
              <span className="text-indigo-600">Spend smarter.</span>
            </motion.h1>
            <motion.p
              className="text-xl mb-6 text-gray-700"
              variants={fadeInUp}
            >
              Moneyfy shows where your cash goes, helps you save more, and spend
              like a boss 😎. No stress, just smart moves. 🧠
            </motion.p>
            <motion.button
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 px-6 rounded-full text-xl hover:bg-indigo-800 mt-6"
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get started
            </motion.button>
          </motion.div>{" "}
          {/* Image showcase */}
          <motion.div
            className="my-8 md:px-[10%]"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <motion.img
              src=".\src\assets\dashboard.png"
              className="w-full shadow-lg rounded-lg border"
              alt="Dashboard preview"
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
            />
          </motion.div>{" "}
          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-8 mb-12 py-6 rounded-lg"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              className="stat-box bg-white p-6 rounded-lg shadow-md text-center"
              variants={fadeInUp}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 className="text-3xl font-bold text-indigo-600">1M+</h3>
              <p className="text-sm text-gray-600">Active Users</p>
            </motion.div>
            <motion.div
              className="stat-box bg-white p-6 rounded-lg shadow-md text-center"
              variants={fadeInUp}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 className="text-3xl font-bold text-indigo-600">50M+</h3>
              <p className="text-sm text-gray-600">Transactions Tracked</p>
            </motion.div>
            <motion.div
              className="stat-box bg-white p-6 rounded-lg shadow-md text-center"
              variants={fadeInUp}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 className="text-3xl font-bold text-indigo-600">$500M+</h3>
              <p className="text-sm text-gray-600">User Savings</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* About MoneyFy Section */}
      <div id="about" className="about-container bg-white text-black py-10">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-4xl font-extrabold mb-4">
            <span className="text-black">About </span>
            <span className="text-indigo-600">MoneyFy</span>
          </h2>
          <p className="text-lg mb-8 text-gray-600">
            We’re on a mission to revolutionize personal finance management,
            making it simple, smart, and accessible for everyone.
          </p>
        </div>
      </div>
      {/* About Us Section */}
      {/* <AboutUsSection /> */}
      {/* Why Choose Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h3 className="text-4xl font-extrabold mb-6">
            Why Choose <span className="text-indigo-600">MoneyFy</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="feature-box flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
              <span className="text-indigo-600">
                <AlignEndHorizontal />
              </span>
              <h3 className="text-xl font-semibold mb-4 text-indigo-600">
                Smart Tracking
              </h3>
              <p className="text-gray-600">
                Automatically categorize and track your expenses with AI-powered
                insights.
              </p>
            </div>
            <div className="feature-box flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
              <span className="text-indigo-600">
                <Goal />
              </span>
              <h3 className="text-xl font-semibold mb-4 text-indigo-600">
                Goal Setting
              </h3>
              <p className="text-gray-600">
                Set and achieve your financial goals with personalized saving
                plans.
              </p>
            </div>
            <div className="feature-box flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
              <span className="text-indigo-600">
                <FolderLock />
              </span>
              <h3 className="text-xl font-semibold mb-4 text-indigo-600">
                Bank-Grade Security
              </h3>
              <p className="text-gray-600">
                Your financial data is protected with the highest security
                standards.
              </p>
            </div>
          </div>

          {/* Our Team Section */}
          <h3 className="text-4xl font-extrabold mb-6 text-indigo-600">
            Our Team
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="team-member text-center">
              <img
                src={wieloImage}
                alt="Wielo"
                className="w-48 aspect-square object-cover rounded-full mx-auto mb-4"
              />
              <p className="font-semibold text-indigo-600">
                Wiellona Darlene Oderia Saragih
              </p>
              <p className="text-sm text-gray-600">CEO & Founder</p>
            </div>
            <div className="team-member text-center">
              <img
                src={ikhsanImage}
                alt="ikhsan"
                className="w-48 aspect-square object-cover rounded-full mx-auto mb-4"
              />
              <p className="font-semibold text-indigo-600">
                M. Ikhsan Kurniawan
              </p>
              <p className="text-sm text-gray-600">CTO</p>
            </div>
            <div className="team-member text-center">
              <img
                src={neylaImage}
                alt="Neyla"
                className="w-48 aspect-square object-cover rounded-full mx-auto mb-4"
              />
              <p className="font-semibold text-indigo-600">Neyla Shakira</p>
              <p className="text-sm text-gray-600">Head of Design</p>
            </div>
            <div className="team-member text-center">
              <img
                src={iqbalImage}
                alt="M. Iqbal Alfajri"
                className="w-48 aspect-square object-cover rounded-full mx-auto mb-4"
              />
              <p className="font-semibold text-indigo-600">M. Iqbal Alfajri</p>
              <p className="text-sm text-gray-600">Head of Product</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
