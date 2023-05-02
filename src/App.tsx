import { useEffect, useState, useContext } from "react";
import "./App.css";
import cls from "classnames";
import { ColorContext } from "./ColorProvider";
import { SketchPicker } from "react-color";

function App() {
  const [color, setColor] = useState("#005FFD");
  const { colors, initialColor, fetchColor } = useContext(ColorContext);

  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  return (
    <div className="flex items-start justify-center gap-6">
      <div className="flex flex-col items-center gap-4">
        <SketchPicker
          color={color}
          disableAlpha
          onChange={(color) => setColor(color.hex)}
        />
        <input
          className="rounded-md p-3"
          value={color}
          // disabled={isLoading}
          onChange={({ target }) => setColor(target.value)}
        />
        <button
          className="bg-gray-600 hover:border-primary-500 focus:focus-visible:outline-2 focus:focus-visible:outline-primary-400"
          onClick={() => fetchColor(color)}
        >
          Set Color
        </button>
        <a
          className="text-primary-500 hover:opacity-50 focus:focus-visible:outline-2 focus:focus-visible:outline-primary-400"
          href="https://github.com/SunnyYdv/dynamic-colors"
        >
          Github link
        </a>
      </div>
      <div className="flex flex-col items-center">
        <div
          className={cls("mb-10 flex flex-col items-center gap-2", {
            // "animate-pulse": isLoading,
          })}
        >
          <h3 className="flex w-60 items-center text-3xl text-white">
            Source color is {initialColor}
          </h3>
          <div className="relative w-fit p-1">
            <div
              className={cls(
                "delay-400 h-40 w-40 rounded-lg bg-primary-500 p-2 transition-colors ease-in"
                // {
                //   "border-2 border-dashed border-white": !data?.hex?.value,
                // }
              )}
              style={{ backgroundColor: initialColor }}
            >
              <span
                className={cls(
                  "absolute -right-4 -top-3 h-8 w-20 whitespace-nowrap rounded-md bg-slate-500 p-1",
                  {
                    // "animate-pulse": isLoading,
                  }
                )}
              >
                {initialColor}
              </span>
            </div>
            <button className="w-50 mt-4 bg-primary-500 py-[0.75rem] hover:bg-primary-600 active:bg-primary-700">
              Test Button
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 self-start">
        {colors.map((color) => {
          const bgStyle = `bg-primary-${color.palleteNumber}`;
          return (
            <div key={color.name} className="relative flex items-center">
              <div
                className={`mr-8 flex h-10 w-10 items-center justify-center rounded font-semibold ${bgStyle}`}
              >
                Aa
              </div>
              <div className="flex flex-col items-start">
                <span>{color.name}</span>{" "}
                <span className="text-gray-500">{color.hex.toUpperCase()}</span>
              </div>
              <div
                className="absolute left-7 top-5 h-6 w-6 rounded"
                style={{ backgroundColor: initialColor }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
