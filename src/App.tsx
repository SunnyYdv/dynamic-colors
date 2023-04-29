import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";
import { useMutation } from "react-query";
import cls from "classnames";
import { Hsluv } from "hsluv";

async function getColor(hex: string) {
  const res = await axios.get(
    `https://www.thecolorapi.com/id?hex=${hex.replace("#", "").toLowerCase()}`
  );

  return res.data;
}

const getColorArrayByLightness = (primaryHex: string) => {
  const converter = new Hsluv();
  converter.hex = primaryHex;
  converter.hexToHsluv();

  const colorPallete = [];

  converter.hsluv_l = (converter.hsluv_l % 10) + 90;
  converter.hsluvToHex();
  colorPallete.push({
    hex: converter.hex,
    name: "primary/50",
  });

  for (let i = 1; i < 10; i++) {
    converter.hsluv_l -= 10;
    converter.hsluvToHex();
    colorPallete.push({
      hex: converter.hex,
      name: `primary/${i * 100}`,
    });
  }

  return colorPallete;
};

function App() {
  const [color, setColor] = useState("00ff00");
  const [colorsByLightness, setColorsByLightness] = useState(
    getColorArrayByLightness("00ff00")
  );
  const { data, mutate, isLoading } = useMutation<
    { hex: { value: string; clean: string } },
    void,
    string
  >((hex: string) => getColor(hex));

  useEffect(() => {
    if (data && data.hex) {
      setColor(data.hex.clean);
      setColorsByLightness(getColorArrayByLightness(data.hex.value));
      document
        .getElementById("root")!
        .style.setProperty("--color-primary", data.hex.value);
    }
  }, [data]);

  return (
    <div className="flex items-center">
      <div className="mr-10 flex flex-col items-center">
        <div
          className={cls("mb-10 flex flex-col items-center gap-6", {
            "animate-pulse": isLoading,
          })}
        >
          <h3 className="flex w-60 items-center text-3xl text-white">
            Color is {data && data.hex ? data.hex.value : "#?!%*!"}
          </h3>
          <div className="relative w-fit p-1">
            <div
              className={cls(
                "delay-400 h-40 w-40 rounded-lg bg-primary p-2 transition-colors ease-in",
                {
                  "border-2 border-dashed border-white": !data?.hex?.value,
                }
              )}
            >
              <span
                className={cls(
                  "absolute -right-4 -top-3 whitespace-nowrap rounded-md bg-slate-500 p-1"
                )}
              >
                bg-primary
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
            className="hover:border-primary focus:focus-visible:outline-2 focus:focus-visible:outline-primary"
            onClick={() => mutate(color)}
          >
            fetch color from input
          </button>
          <button
            className="hover:border-primary focus:focus-visible:outline-2 focus:focus-visible:outline-primary"
            onClick={() => mutate("ff0000")}
          >
            fetch red
          </button>
          <button
            className="hover:border-primary focus:focus-visible:outline-2 focus:focus-visible:outline-primary"
            onClick={() => mutate("0000ff")}
          >
            fetch blue
          </button>
          <a
            className="text-primary hover:opacity-50 focus:focus-visible:outline-2 focus:focus-visible:outline-primary"
            href="https://github.com/SunnyYdv/dynamic-colors"
          >
            Github link
          </a>
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-2 self-start">
        {colorsByLightness.map((color) => {
          return (
            <div className="relative flex items-center">
              <div
                className="mr-4 flex h-10 w-10 items-center justify-center rounded font-semibold"
                style={{ backgroundColor: color.hex }}
              >
                Aa
              </div>
              <div>{color.name}</div>
              <div className="absolute left-7 top-5 h-6 w-6 rounded bg-primary" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
