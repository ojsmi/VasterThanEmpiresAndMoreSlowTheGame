import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { useMUD } from "../store";
import { ClickWrapper } from "./theme/ClickWrapper";
import { SpriteImage } from "./theme/SpriteImage";
import { Sprites } from "../layers/phaser/constants";
import { getComponentValue, Has } from "@latticexyz/recs";

export const Counter = () => {
  const {
    networkLayer: {
      components: { CounterTable },
      worldSend,
      singletonEntity,
      world
    },
  } = useMUD();
  /* useMUD() is a helper function that gives us access to 'everything we need' at any point */


  /* get the value of the only entry in CounterTable by passing singletonEntity*/
  const counter = useComponentValue(CounterTable, singletonEntity);

  /* [Has()] allows us to query a table, in this case we get all counters that are added*/
  const counters = useEntityQuery([Has(CounterTable)])
  console.log(counters)

  return (
    <ClickWrapper style={{ marginLeft: "10em", marginTop: "10em" }}>
      <>
      {
        counters.map((counterEntity) => {
          return(
          <div style={{ color: "white" }}>
            Counter ({world.entities[counterEntity]}): <span>{getComponentValue(CounterTable, counterEntity)?.value ?? "??"}</span>
          </div>)
        })
      }
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          worldSend("increment", [{ gasLimit: 1_000_000 }]);
        }}
      >
        Add Solider
      </button>
      <SpriteImage spriteKey={Sprites.Soldier} scale={2} />
      </>
    </ClickWrapper>
  );
};
