import React from "react";
import angryPanda from "../../emotes/panda-angry.gif";
import marioCoin from "../../emotes/mario-coin.gif";
import dontCry from "../../emotes/dont-cry.gif";
import moneyMouth from "../../emotes/money-mouth.gif";
import styles3 from "../../css/emote.module.scss";

const GifEmote = ({ type, dialInput }) => {
  const emoteSwitch = (emote) => {
    switch (emote) {
      case "belowAvreage3":
        return (
          <>
            <img className={styles3.giff} src={angryPanda} alt="angry panda" />

            <h4>last 3 manch below avreage</h4>
          </>
        );

      case "aboveAvreage3":
        return (
          <>
            <img
              className={styles3.giffmario}
              src={marioCoin}
              alt="mario coin"
            />{" "}
            <img
              className={styles3.giffmario}
              src={marioCoin}
              alt="mario coin"
            />{" "}
            <img
              className={styles3.giffmario}
              src={marioCoin}
              alt="mario coin"
            />
            <h4>last 3 manch above avreage</h4>
          </>
        );
      case "belowAvreage5":
        return (
          <>
            <img className={styles3.giff} src={dontCry} alt="dont cry" />

            <h4>last 5 manch below avreage</h4>
          </>
        );
      case "aboveAvreage5":
        return (
          <>
            <img className={styles3.giff} src={moneyMouth} alt="money mounth" />
            <img className={styles3.giff} src={moneyMouth} alt="money mounth" />
            <img className={styles3.giff} src={moneyMouth} alt="money mounth" />
            <img className={styles3.giff} src={moneyMouth} alt="money mounth" />
            <img className={styles3.giff} src={moneyMouth} alt="money mounth" />

            <h4>last 5 manch above avreage</h4>
          </>
        );

      case "info":
        return "emote";

      case "prosjek po danima":
        return "emote";
      case "globalna statistika":
        return "emote";
      default:
        return "emote";
    }
  };

  return <div>{emoteSwitch(type)}</div>;
};

export default GifEmote;
