import React, { useState } from 'react';

const Footer = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <footer id="footer" className="px-10 py-8 mt-8 border-t">
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div>
            <h5 className="font-bold mb-2">MoneyFy</h5>
            <p className="text-xs text-gray-500">Your smart financial companion for better money management</p>
          </div>
          <div>
            <h5 className="font-bold mb-2">Company</h5>
            <ul className="text-sm flex flex-col gap-1">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-2">Resources</h5>
            <ul className="text-sm flex flex-col gap-1">
              <li><a href="#">Blog</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-2">Legal</h5>
            <ul className="text-sm flex flex-col gap-1">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t text-xs text-gray-500">
          <p>© 2025 MoneyFy. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </footer>
  )
}
export default Footer;