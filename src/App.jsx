import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import chroma from "chroma-js";

function App() {
  const [color, setColor] = useState("#aabbcc");

  const [steps, setSteps] = useState(6);

  let scale = chroma
    .scale([chroma(color).brighten(1),color, chroma(color).darken(1)])
    .mode("lch")
    .colors(steps);

  

  return (
    <div className="p-3 resposive flex justify-between flex-col   h-screen  ">
      <section>
      <h2 className=" text-lg  font-mono mb-4 flex  items-center justify-between">
        <div>BASE COLOR</div>{" "}
        <div
          className=" ml-2 rounded-md size-[24px]"
         
        />
      </h2>

      <HexColorPicker color={color} onChange={setColor} />
      <h2 className=" text-lg  font-mono  mt-8  flex justify-between"><div>COLOR STEPS</div> <div > {" "+steps}</div></h2>

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

<h2 className=" text-lg font-mono  mt-8  inline-flex">PREVIEW</h2>

<div className="flex space-x-2 mt-4">
{scale.map((i,index)=>{
  return(
    <div key={index} className=" size-8 rounded-md"  style={{ backgroundColor: i }} />
  )
})}
</div>

</section>
<section className=" flex flex-col  items-center">
<Button className="mt-12 mb-6 w-full">Generate</Button>
<div className=" text-xs font-mono  text-black">Made with ❤️ in India</div>

</section>
      
    </div>
  );
}

export default App;
