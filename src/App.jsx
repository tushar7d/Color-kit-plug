import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import chroma from "chroma-js";

function App() {
  const [color, setColor] = useState("#aabbcc");

  const [steps, setSteps] = useState(6);

  let scale = chroma
    .scale([chroma(color).brighten(1), color, chroma(color).darken(1)])
    .mode("lch")
    .colors(steps);

  let sendMessage = () => {
    parent.postMessage(
      { pluginMessage: {colors: scale}, pluginId: "1346053186775427251" },
      "https://www.figma.com"
    );

    console.log("wohoo");
  };

  return (
    <div className="flex flex-col justify-between h-screen p-3 resposive ">
      <section>
        <h2 className="flex items-center justify-between mb-4 font-mono text-lg ">
          <div>BASE COLOR</div>
          <div className=" ml-2 rounded-md size-[24px]" />
        </h2>

        <HexColorPicker color={color} onChange={setColor} />
        <h2 className="flex justify-between mt-8 font-mono text-lg ">
          <div>COLOR STEPS</div> <div> {" " + steps}</div>
        </h2>

        <Slider
          defaultValue={[steps]}
          min={2}
          max={12}
          step={1}
          className="mt-4"
          onValueChange={(i) => {
            setSteps(i);
          }}
        />

        <h2 className="inline-flex mt-8 font-mono text-lg ">PREVIEW</h2>

        <div className="flex mt-4 space-x-2">
          {scale.map((i, index) => {
            return (
              <div
                key={index}
                className="rounded-md size-8"
                style={{ backgroundColor: i }}
              />
            );
          })}
        </div>
      </section>
      <section className="flex flex-col items-center ">
        <Button onClick={sendMessage} className="w-full mt-12 mb-6">
          Generate
        </Button>
        <div className="font-mono text-xs text-black ">
          Made with ❤️ in India
        </div>
      </section>
    </div>
  );
}

export default App;
