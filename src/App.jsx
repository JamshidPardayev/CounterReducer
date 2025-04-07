import { useReducer, useCallback, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState("red");

  const increment = useCallback(() => dispatch({ type: "increment" }), []);
  const decrement = useCallback(() => dispatch({ type: "decrement" }), []);
  const reset = useCallback(() => dispatch({ type: "reset" }), []);

  const isDarkLight = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const changeColor = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className={`body flex flex-col items-center justify-center h-[100vh] ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="flex items-center">
        <div className="flex gap-x-3 text-[25px]">
          <p onClick={isDarkLight} className="hover:text-gray-700 duration-500 absolute top-[20px] right-[100px]">
            {isDarkMode ? <IoSunny /> : <FaMoon />}
          </p>
        </div>
        <div className="flex gap-x-1">
          {["red", "green", "blue", "blueviolet", "yellow", "lime", "fuchsia", "aqua"].map(color => (
            <div
              key={color}
              className={`h-[40px] w-[40px] bg-[${color}] rounded-[50%] cursor-pointer`}
              onClick={() => changeColor(color)}
            ></div>
          ))}
        </div>
      </div>
      <div className={`w-[350px] h-[400px] rounded-[10px] mt-3 content-center bg-[${selectedColor}] text-center`}>
        <h2 className="text-black text-[68px]">{state.count}</h2>
        <div className="flex justify-between mb-8 mt-3 w-[70%] mx-auto">
          <button className="text-[30px] px-4 bg-black text-white rounded-[5px] hover:bg-gray-900 duration-500" onClick={decrement}>-</button>
          <button className="text-[30px] px-4 bg-black text-white rounded-[5px] hover:bg-gray-900 duration-500" onClick={reset}>Reset</button>
          <button className="text-[30px] px-4 bg-black text-white rounded-[5px] hover:bg-gray-900 duration-500" onClick={increment}>+</button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
