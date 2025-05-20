import React, { useState, useRef, useContext } from "react";
import { UserContext } from "../context/AuthContext";
import axios from "axios";

const ProfileImageModal = ({ isOpen, onClose, currentImage, user }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { updateProfileImage } = useContext(UserContext);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectImage = () => {
    fileInputRef.current.click();
  };
  const handleUpload = async () => {
    if (!selectedImage) return;

    setIsUploading(true);
    try {
      // Create a FormData object to send the image
      const formData = new FormData();
      formData.append("profileImage", selectedImage);

      // Add user ID from context if available
      if (user && user.user_id) {
        formData.append("userId", user.user_id);
      } // Call API to update profile image using axios
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/profile-image`,
        formData
      );
      console.log("Response from server:", response.data);

      // Update the user's profile image in the context
      updateProfileImage(response.data.payload.profile_img_url);

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error uploading profile image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full">
        <h2 className="text-xl font-bold mb-4">Change Profile Picture</h2>

        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-indigo-600">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : currentImage ? (
              <img
                src={currentImage}
                alt="Current profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
                {user && user.name ? user.name.charAt(0) : "U"}
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <button
            onClick={handleSelectImage}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Select Image
          </button>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedImage || isUploading}
            className={`px-4 py-2 rounded text-white transition ${
              !selectedImage || isUploading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageModal;
