import { MoreVertical } from "lucide-react";
import { useEffect, useRef } from "react";

function DropdownMore({ id, item }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        const dropdown = document.getElementById(`moreDropdown-${id}`);
        if (dropdown && !dropdown.classList.contains("hidden")) {
          dropdown.classList.add("hidden");
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [id]);

  const handleClickDelete = () => {
    if (!item?.budget_id) {
      const dropdown = document.getElementById(`moreDropdown-${id}`);
      if (dropdown && !dropdown.classList.contains("hidden")) {
        dropdown.classList.add("hidden");
      }

      const modal = document.getElementById("popup-modal");
      if (modal) {
        modal.classList.toggle("hidden");
      }
    } else if (item?.budget_id) {
      console.log("clicked", item);
      const dropdown = document.getElementById(`moreDropdown-${id}`);
      if (dropdown && !dropdown.classList.contains("hidden")) {
        dropdown.classList.add("hidden");
      }

      const modal = document.getElementById("popup-modal-budget");
      if (modal) {
        modal.classList.toggle("hidden");
      }
    }
  };

  const handleClickEdit = () => {
    if (!item?.budget_id) {
      const dropdown = document.getElementById(`moreDropdown-${id}`);
      if (dropdown && !dropdown.classList.contains("hidden")) {
        dropdown.classList.add("hidden");
      }

      const modal = document.getElementById("crud-modal");
      if (modal) {
        modal.classList.toggle("hidden");
      }
    } else if (item?.budget_id) {
      console.log("clicked", item);
      const dropdown = document.getElementById(`moreDropdown-${id}`);
      if (dropdown && !dropdown.classList.contains("hidden")) {
        dropdown.classList.add("hidden");
      }

      const modal = document.getElementById("crud-modal-budget");
      if (modal) {
        modal.classList.toggle("hidden");
      }
    }
  };

  return (
    <div className="relative flex gap-4 items-center" ref={dropdownRef}>
      <button
        onClick={() =>
          document
            .getElementById(`moreDropdown-${id}`)
            .classList.toggle("hidden")
        }
        className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600"
        type="button"
      >
        <MoreVertical className="w-4 h-4 text-gray-500" />
      </button>

      <div
        id={`moreDropdown-${id}`}
        className="hidden absolute right-full ml-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-24 z-20"
      >
        <ul className="py-2 text-sm text-gray-700">
          <li>
            <a
              onClick={handleClickEdit}
              className="cursor-pointer block px-4 py-2 hover:bg-gray-100"
            >
              Edit
            </a>
          </li>
          <li>
            <a
              onClick={handleClickDelete}
              className="cursor-pointer block px-4 py-2 hover:bg-gray-100"
            >
              Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DropdownMore;
