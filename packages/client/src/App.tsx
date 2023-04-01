import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { getComponentValue, Has } from "@latticexyz/recs";

export const App = () => {
  const {
    components: { Gamefield },
    singletonEntity,
    worldSend,
    world
  } = useMUD();

  const tiles = useEntityQuery([Has(Gamefield)])
  console.log( tiles )

  return (
    <div className="vte-world">
    {
      tiles.map((tileEntity) => {
        return(
          <span key={world.entities[tileEntity]}>{getComponentValue(Gamefield, tileEntity)?.value ?? ""}</span>
        )
      })
    }
    </div>
  );
};