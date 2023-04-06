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
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center mb-10 gap-6'>
        <h3 className='text-white text-3xl transition-transform ease-in-out delay-300'>
          Color is {data && data.hex ? data.hex.value : "#?!%*!"}
        </h3>
        <div
          className={cls("h-40 w-40 bg-primary rounded-lg relative", {
            "animate-pulse": isLoading,
            "border-2 border-dashed border-white": !data?.hex?.value,
          })}
        >
          <span
            className={cls(
              "absolute -top-3 -right-4 whitespace-nowrap bg-slate-500 p-1 rounded-md",
              { "-top-3.5": !data }
            )}
          >
            bg-primary
          </span>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <input
          className='p-3 rounded-md'
          value={color}
          disabled={isLoading}
          onChange={({ target }) => setColor(target.value)}
        />
        <button
          className={cls({ "animate-pulse": isLoading })}
          onClick={() => mutate(color)}
        >
          fetch color from input
        </button>
        <button onClick={() => mutate("ff0000")}>fetch red</button>
        <button onClick={() => mutate("0000ff")}>fetch blue</button>
      </div>
    </div>
  );
}

export default App;
