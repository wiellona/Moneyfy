import "lucide-react";
import { useContext, useState } from "react";
import { UserContext } from "../context/AuthContext";
import ProfileImageModal from "./ProfileImageModal";

const Header = ({ user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { logout } = useContext(UserContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };
  return (
    <div className="sticky top-0 left-0 w-full z-10 py-5 px-5">
      <ProfileImageModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
        currentImage={user?.profileImage}
        user={user}
      />
      <header className="bg-white shadow-md p-4 rounded-lg ">
        {/* Desktop Menu */}
        <div className="hidden md:flex justify-between items-center">
          <a href="/">
            <div className="text-3xl font-bold text-black">MoneyFy</div>
          </a>
          {/* Navigation Links */}
          <div className="flex gap-4">
            <a href="/#about" className="text-gray-700 hover:text-indigo-600">
              About us
            </a>
            <a href="/" className="text-gray-700 hover:text-indigo-600">
              Our Features
            </a>
            <a href="#footer" className="text-gray-700 hover:text-indigo-600">
              Contact Us
            </a>
          </div>

          {user ? (
            <div className="flex gap-4 items-center">
              {" "}
              <button
                onClick={() =>
                  document
                    .getElementById("userDropdown")
                    .classList.toggle("hidden")
                }
                className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 "
                type="button"
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    openProfileModal();
                  }}
                >
                  {user.profileImage ? (
                    <img
                      className="w-10 h-10 me-2 rounded-full object-cover cursor-pointer"
                      src={user.profileImage}
                      alt="user avatar"
                    />
                  ) : (
                    <div className="w-10 h-10 me-2 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-bold cursor-pointer">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                </div>
                <span>{user.name || "User"}</span>
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="userDropdown"
                className="hidden absolute right-2 top-full bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-48 z-20"
              >
                <div className="px-4 py-3 text-sm text-gray-900">
                  <div className="font-medium">{user.name}</div>
                  <div className="truncate">{user.email}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <li>
                      {" "}
                      <button
                        onClick={() => {
                          setIsProfileModalOpen(true);
                        }}
                        className="w-full px-4 py-2 hover:bg-gray-100 text-left flex items-center gap-2"
                      >
                        Change Profile
                      </button>
                    </li>
                    <a
                      href="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="/settings"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                  </li>
                </ul>
                <div className="py-2">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <a href="/login" className="text-gray-700 hover:text-indigo-600">
                Register
              </a>
              <a
                href="/login"
                className="text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
              >
                Login
              </a>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex justify-between items-center">
          <div className="text-3xl font-bold text-black">MoneyFy</div>
          <button onClick={toggleMobileMenu} className="text-indigo-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden  flex flex-col items-start bg-white shadow-lg p-4 space-y-5">
            {user ? (
              <div className="flex gap-4 items-center">
                {" "}
                <button
                  onClick={() =>
                    document
                      .getElementById("userDropdownMobile")
                      .classList.toggle("hidden")
                  }
                  className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 "
                  type="button"
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      openProfileModal();
                    }}
                  >
                    {user.profileImage ? (
                      <img
                        className="w-10 h-10 me-2 rounded-full object-cover cursor-pointer"
                        src={user.profileImage}
                        alt="user avatar"
                      />
                    ) : (
                      <div className="w-10 h-10 me-2 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-bold cursor-pointer">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                    )}
                  </div>
                  <span>{user.name || "User"}</span>
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="userDropdownMobile"
                  className="hidden absolute top-32 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-48 z-20"
                >
                  <div className="px-4 py-3 text-sm text-gray-900">
                    <div className="font-medium">{user.name}</div>
                    <div className="truncate">{user.email}</div>
                  </div>{" "}
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <button
                        onClick={() => {
                          setIsProfileModalOpen(true);
                        }}
                        className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                      >
                        Change Profile
                      </button>
                    </li>
                    <li>
                      <a
                        href="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="/settings"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Settings
                      </a>
                    </li>
                  </ul>
                  <div className="py-2">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-4 items-center">
                <a
                  href="/login"
                  className="block text-gray-700 hover:text-indigo-600"
                >
                  Register
                </a>
                <a
                  href="/login"
                  className="block text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Login
                </a>
              </div>
            )}
            <a href="#" className="block text-gray- hover:text-indigo-600">
              About us
            </a>
            <a href="#" className="block text-gray- hover:text-indigo-600">
              Our Features
            </a>
            <a href="#" className="block text-gray-700 hover:text-indigo-600">
              Contact Us
            </a>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
