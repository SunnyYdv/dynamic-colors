import { useEffect, useState, createContext } from "react";
import axios from "axios";
import "./App.css";
import { useMutation } from "react-query";
import { Hsluv } from "hsluv";

export type Color = {
  hex: string;
  name: string;
  palleteNumber: string;
};

export type ColorContext = {
  colors: Color[];
  initialColor: string;
  fetchColor: (hex: string) => void;
};

export const ColorContext = createContext<ColorContext>({
  colors: [],
  initialColor: '#000',
  fetchColor: () => {
    return
  }
});

async function getColor(hex: string) {
  const res = await axios.get(
    `https://www.thecolorapi.com/id?hex=${hex.replace("#", "").toLowerCase()}`
  );

  return res.data;
}

const getHSLuvColorPalette = (primaryHex: string) => {
  const converter = new Hsluv();
  converter.hex = primaryHex;
  converter.hexToHsluv();

  const colorPalette: Color[] = [];

  const lightnessRemainder = converter.hsluv_l % 10 + 90;

  converter.hsluv_l = 95;
  converter.hsluvToHex();
  colorPalette.push({
    hex: converter.hex,
    name: "primary/50",
    palleteNumber: "50",
  });

  converter.hsluv_l = lightnessRemainder;

  for (let i = 1; i < 10; i++) {
    converter.hsluv_l -= 10;
    converter.hsluvToHex();
    colorPalette.push({
      hex: converter.hex,
      name: `primary/${i * 100}`,
      palleteNumber: `${i * 100}`
    });
  }

  return colorPalette;
};

const applyColorsToRoot = (colors: Color[]) => {
  colors.forEach((color) => {
    const { hex, name } = color;

    const colorNumber = name.split("/")[1];
    document
      .getElementById("root")!
      .style.setProperty(`--color-primary-${colorNumber}`, hex);
  });
};

export interface Props {
  children: React.ReactNode;
}

const ColorProvider = (props: Props) => {
  const { children } = props;
  const [colorsByLightness, setColorsByLightness] = useState<Color[]>([]);
  const {
    data: systemColor,
    mutate,
    isLoading,
    isSuccess,
  } = useMutation<{ hex: { value: string; clean: string } }, void, string>(
    (hex: string) => getColor(hex)
  );

  useEffect(() => {
    mutate("#005FFD");
  }, []);

  useEffect(() => {
    if (systemColor && systemColor.hex) {
      const colors = getHSLuvColorPalette(systemColor.hex.value);
      applyColorsToRoot(colors);
      setColorsByLightness(colors);
    } else if (!isLoading && !isSuccess) {
      const colors = getHSLuvColorPalette("#005FFD");
      applyColorsToRoot(colors);
      setColorsByLightness(colors);
    }
  }, [systemColor]);

  if (isLoading) return <div className="animate-spin text-8xl">Loading</div>;

  return (
    <ColorContext.Provider
      value={{
        colors: colorsByLightness,
        initialColor: systemColor ? systemColor.hex.value : "#000",
        fetchColor: mutate
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export default ColorProvider;
