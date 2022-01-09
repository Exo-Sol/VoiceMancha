import React, { useState, useEffect } from "react";
import styles3 from "../../css/emote.module.scss";
import GifEmote from "./GifEmote";
import getModeManch from "../../data/getModeManch";

const EmoteDispatch = ({ mancha, emoCue, dialInput, edit }) => {
  const storage = { ...localStorage };

  const [unmount, setUnmount] = useState(() => false);

  useEffect(() => {
    setUnmount(false);
  }, [mancha]);

  let allmanch = [];

  const retrivedDates = Object.keys(storage);

  const {
    manchaMods,
    manchaPerc,
    numAll,
    totalManch,
    manchaValues,
    mothObj,
    maxManch,
  } = getModeManch();

  const percAllManch1 = parseFloat((totalManch / numAll).toFixed(2));
  const percAllManch = Math.round((percAllManch1 + Number.EPSILON) * 100) / 100;

  console.log(mancha);

  /// last three zero situation

  const manche = mancha.map((e) => {
    return parseInt(e.manch);
  });

  if (manche.length >= 3) {
    var lastThree = manche.slice(-3);
    console.log(lastThree);
  }
  console.log(manchaPerc);

  if (manche.length >= 5) {
    var lastFive = manche.slice(-5);
    console.log();
  }

  const lastThree0 = () => {
    if (mancha.length) {
      if (edit) {
        emoCue(false); // ovo false !!!
        return false;
      } else if (mancha[mancha.length - 1].manch > maxManch && maxManch > 20) {
        emoCue(true);
        return <GifEmote type={"topManch"} />;
      } else if (lastFive) {
        if (
          lastFive[0] < percAllManch &&
          lastFive[1] < percAllManch &&
          lastFive[2] < percAllManch &&
          lastFive[3] < percAllManch &&
          lastFive[4] < percAllManch
        ) {
          emoCue(true);
          return <GifEmote type={"belowAvreage5"} />;
        } else if (
          lastFive[0] > percAllManch &&
          lastFive[1] > percAllManch &&
          lastFive[2] > percAllManch &&
          lastFive[3] > percAllManch &&
          lastFive[4] > percAllManch
        ) {
          emoCue(true);
          return <GifEmote type={"aboveAvreage5"} />;
        } else if (
          lastThree[0] < percAllManch &&
          lastThree[1] < percAllManch &&
          lastThree[2] < percAllManch
        ) {
          emoCue(true);
          return <GifEmote type={"belowAvreage3"} />;
        } else if (
          lastThree[0] > percAllManch &&
          lastThree[1] > percAllManch &&
          lastThree[2] > percAllManch
        ) {
          emoCue(true);
          return <GifEmote type={"aboveAvreage3"} />;
        } else {
          emoCue(false); // ovo false !!!
          return false; // i ovo
        }
      } else if (lastThree) {
        if (
          lastThree[0] < percAllManch &&
          lastThree[1] < percAllManch &&
          lastThree[2] < percAllManch
        ) {
          emoCue(true);
          return <GifEmote type={"belowAvreage3"} />;
        } else if (
          lastThree[0] > percAllManch &&
          lastThree[1] > percAllManch &&
          lastThree[2] > percAllManch
        ) {
          emoCue(true);
          return <GifEmote type={"aboveAvreage3"} />;
        } else {
          emoCue(false); // ovo false !!!
          return false; // i ovo
        }
      } else return false;
    } else return false;
  };

  // returning to main view after emote reqiires to return false on this component and also set state in parent component

  const getBack = () => {
    setUnmount(true);
    emoCue(false);
  };

  return unmount ? (
    false
  ) : lastThree0() ? (
    <div
      onClick={getBack}
      className={dialInput ? styles3.emoteSwitch : styles3.emote}
    >
      {lastThree0()}
    </div>
  ) : (
    false
  );
};

export default EmoteDispatch;
