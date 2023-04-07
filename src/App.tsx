import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";
import { useMutation } from "react-query";
import cls from "classnames";

async function getColor(hex: string) {
  const res = await axios.get(
    `https://www.thecolorapi.com/id?hex=${hex.replace("#", "").toLowerCase()}`
  );

  return res.data;
}

function App() {
  const [color, setColor] = useState("00ff00");
  const { data, mutate, isLoading } = useMutation<
    { hex: { value: string; clean: string } },
    void,
    string
  >((hex: string) => getColor(hex));

  useEffect(() => {
    if (data && data.hex) {
      setColor(data.hex.clean);
      document
        .getElementById("root")!
        .style.setProperty("--color-primary", data.hex.value);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center">
      <div
        className={cls("mb-10 flex flex-col items-center gap-6", {
          "animate-pulse": isLoading,
        })}
      >
        <h3 className="text-3xl text-white">
          Color is {data && data.hex ? data.hex.value : "#?!%*!"}
        </h3>
        <div className="relative w-fit p-1">
          <div
            className={cls(
              "h-40 w-40 rounded-lg bg-primary p-2 transition-colors delay-400 ease-in",
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
  );
}

export default App;
