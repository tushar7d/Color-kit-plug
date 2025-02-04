import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import chroma from "chroma-js";

const ColorPreview = ({ colors }) => (
  <div className="flex mt-4 space-x-2">
    {colors.map((color, index) => (
      <div
        key={index}
        className="rounded-md size-8"
        style={{ backgroundColor: color }}
      />
    ))}
  </div>
);

const StepsControl = ({ steps, setSteps }) => (
  <>
    <h2 className="flex justify-between mt-8 font-mono text-sm">
      <div>COLOR STEPS</div> <div>{" " + steps}</div>
    </h2>
    <Slider
      defaultValue={[steps]}
      min={2}
      max={12}
      step={1}
      className="mt-4"
      onValueChange={setSteps}
    />
  </>
);

const GenerateButton = ({ onClick }) => (
  <section className="flex flex-col items-center">
    <Button onClick={onClick} className="w-full mt-12 mb-6">
      Generate
    </Button>
    <div className="font-mono text-xs text-black">Made with ❤️ in India</div>
  </section>
);

const SingleColorTab = ({ color, setColor, steps, setSteps, scale, sendMessage }) => (
  <div className="flex flex-col justify-between h-[90vh] responsive">
    <section>
      <h2 className="flex items-center justify-between mb-4 font-mono text-lg">
        <div className="text-sm">BASE COLOR</div>
        <div className="ml-2 rounded-md size-[24px]" />
      </h2>
      <HexColorPicker color={color} onChange={setColor} />
      <StepsControl steps={steps} setSteps={setSteps} />
      <h2 className="inline-flex mt-8 font-mono text-sm">PREVIEW</h2>
      <ColorPreview colors={scale} />
    </section>
    <GenerateButton onClick={sendMessage} />
  </div>
);

const MultiColorTab = ({ colorUno, colorDos, setColorUno, setColorDos, steps, setSteps, scaleMulti, sendMessageDos }) => (
  <div className="flex flex-col justify-between h-[90vh]">
    <section>
      <h2 className="flex items-center justify-between mb-4 font-mono text-lg">
        <div className="text-sm">BASE COLOR</div>
        <div className="ml-2 rounded-md size-[24px]" />
      </h2>
      <div className="flex space-x-4 ">
        <div className=" mod"><HexColorPicker className="mod" color={colorUno} onChange={setColorUno} /></div>
        <div className=" mod"><HexColorPicker className="mod" color={colorDos} onChange={setColorDos} /></div>
      </div>
      <StepsControl steps={steps} setSteps={setSteps} />
      <h2 className="inline-flex mt-8 font-mono text-sm">PREVIEW</h2>
      <ColorPreview colors={scaleMulti} />
    </section>
    <GenerateButton onClick={sendMessageDos} />
  </div>
);

function App() {
  const [color, setColor] = useState("#aabbcc");
  const [colorUno, setColorUno] = useState("#aabbcc");
  const [colorDos, setColorDos] = useState("#aabbcc");
  const [steps, setSteps] = useState(6);

  const scale = chroma
    .scale([chroma(color).brighten(1), color, chroma(color).darken(1)])
    .mode("lch")
    .colors(steps);

  const scaleMulti = chroma
    .scale([colorUno, colorDos])
    .mode("lch")
    .colors(steps);

  const sendMessage = () => {
    parent.postMessage(
      { pluginMessage: { colors: scale }, pluginId: "797696673804519719" },
      "https://www.figma.com"
    );
  };

  const sendMessageDos = () => {
    parent.postMessage(
      { pluginMessage: { colors: scaleMulti }, pluginId: "797696673804519719" },
      "https://www.figma.com"
    );
  };

  return (
    <Tabs defaultValue="account" className="w-[400px] p-3 ">
      <TabsList>
        <TabsTrigger value="account">Single</TabsTrigger>
        <TabsTrigger value="password">Multi</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <SingleColorTab
          color={color}
          setColor={setColor}
          steps={steps}
          setSteps={setSteps}
          scale={scale}
          sendMessage={sendMessage}
        />
      </TabsContent>
      <TabsContent value="password">
        <MultiColorTab
          colorUno={colorUno}
          colorDos={colorDos}
          setColorUno={setColorUno}
          setColorDos={setColorDos}
          steps={steps}
          setSteps={setSteps}
          scaleMulti={scaleMulti}
          sendMessageDos={sendMessageDos}
        />
      </TabsContent>
    </Tabs>
  );
}

export default App;
