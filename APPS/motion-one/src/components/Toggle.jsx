import { useState } from "react";

const Toggle = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
    console.log("toggled:", !isOn);
  };

  return (
    <div
      onClick={handleToggle}
      className={`p-1 w-20 h-10 rounded-full cursor-pointer transition-colors duration-300 ${
        isOn ? "bg-teal-600" : "bg-teal-200"
      }`}
    >
      <span
        className={`block h-8 w-8 bg-white rounded-full transition-transform duration-300 ${
          isOn ? "translate-x-10" : "translate-x-0"
        }`}
      ></span>
    </div>
  );
};``

export default Toggle;
