import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import chroma from "chroma-js";

function App() {
  const [color, setColor] = useState("#aabbcc");
  const [colorUno, setColorUno] = useState("#aabbcc");
  const [colorDos, setColorDos] = useState("#aabbcc");

  const [steps, setSteps] = useState(6);

  let scale = chroma
    .scale([chroma(color).brighten(1), color, chroma(color).darken(1)])
    .mode("lch")
    .colors(steps);

    let scaleMulti = chroma
    .scale([ colorUno, colorDos])
    .mode("lch")
    .colors(steps);

  let sendMessage = () => {
    parent.postMessage(
      { pluginMessage: { colors: scale }, pluginId: "797696673804519719" },
      "https://www.figma.com"
    );
  };

  let sendMessageDos = () => {
    parent.postMessage(
      { pluginMessage: { colors: scaleMulti }, pluginId: "797696673804519719" },
      "https://www.figma.com"
    );
  };

  return (
    <Tabs defaultValue="account" className="w-[400px] p-3">
      <TabsList>
        <TabsTrigger value="account">Single</TabsTrigger>
        <TabsTrigger value="password">Multi</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="flex flex-col justify-between h-[90vh] resposive ">
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
      </TabsContent>
      <TabsContent value="password">
        <div className="flex flex-col justify-between h-[90vh]  ">
          <section>
            <h2 className="flex items-center justify-between mb-4 font-mono text-lg ">
              <div>BASE COLOR</div>
              <div className=" ml-2 rounded-md size-[24px]" />
            </h2>
            <div className="flex space-x-4" >
            <div> <HexColorPicker color={colorUno} onChange={setColorUno} /></div>
            <div> <HexColorPicker color={colorDos} onChange={setColorDos} /></div>
            
            </div>
             
            
            

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
              {scaleMulti.map((i, index) => {
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
            <Button onClick={sendMessageDos} className="w-full mt-12 mb-6">
              Generate
            </Button>
            <div className="font-mono text-xs text-black ">
              Made with ❤️ in India
            </div>
          </section>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default App;
