import { useEffect, useState, useContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";
import { useMutation } from "react-query";
import cls from "classnames";
import { Hsluv } from "hsluv";
import { ColorContext } from "./ColorProvider";

async function getColor(hex: string) {
  const res = await axios.get(
    `https://www.thecolorapi.com/id?hex=${hex.replace("#", "").toLowerCase()}`
  );

  return res.data;
}



function App() {
  const [color, setColor] = useState("#005FFD");
  // const [colorsByLightness, setColorsByLightness] = useState(
  //   getColorArrayByLightness("#005FFD")
  // );
  const { data, mutate, isLoading } = useMutation<
    { hex: { value: string; clean: string } },
    void,
    string
  >((hex: string) => getColor(hex));

  const colorContext = useContext(ColorContext)

  return (
    <div className="flex items-center">
      <div className="mr-10 flex flex-col items-center">
        <div
          className={cls("mb-10 flex flex-col items-center gap-6", {
            "animate-pulse": isLoading,
          })}
        >
          <h3 className="flex w-60 items-center text-3xl text-white">
            Source color is {colorContext ? colorContext.initialColor : "#?!%*!"}
          </h3>
          <div className="relative w-fit p-1">
            <div
              className={cls(
                "delay-400 h-40 w-40 rounded-lg bg-primary-500 p-2 transition-colors ease-in",
                // {
                //   "border-2 border-dashed border-white": !data?.hex?.value,
                // }
              )}
            >
              <span
                className={cls(
                  "absolute -right-4 -top-3 h-8 w-20 whitespace-nowrap rounded-md bg-slate-500 p-1",
                  {
                    "animate-pulse": isLoading,
                  }
                )}
              >
                {data?.hex.value}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <input
            className="rounded-md p-3"
            value={color}
            disabled={isLoading}
            onChange={({ target }) => setColor(target.value)}
          />
          <button
            className="hover:border-primary-500 focus:focus-visible:outline-2 focus:focus-visible:outline-primary-400"
            onClick={() => mutate(color)}
          >
            fetch color from input
          </button>
          <button
            className="hover:border-primary-500 focus:focus-visible:outline-2 focus:focus-visible:outline-primary-400"
            onClick={() => mutate("ff0000")}
          >
            fetch red
          </button>
          <button
            className="hover:border-primary-500 focus:focus-visible:outline-2 focus:focus-visible:outline-primary-400"
            onClick={() => mutate("0000ff")}
          >
            fetch blue
          </button>
          <a
            className="text-primary-500 hover:opacity-50 focus:focus-visible:outline-2 focus:focus-visible:outline-primary-400"
            href="https://github.com/SunnyYdv/dynamic-colors"
          >
            Github link
          </a>
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-2 self-start">
        {colorContext.colors.map((color) => {

          const bgStyle = `bg-primary-${color.palleteNumber}`;
          return (
            <div key={color.name} className="relative flex items-center">
              <div
                className={`mr-8 flex h-10 w-10 items-center justify-center rounded font-semibold ${bgStyle}`}
              >
                Aa
              </div>
              <div className="flex flex-col items-start">
                <span>{color.name}</span> <span className="text-gray-500">{color.hex.toUpperCase()}</span>
              </div>
              <div className="absolute left-7 top-5 h-6 w-6 rounded bg-primary-500" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
