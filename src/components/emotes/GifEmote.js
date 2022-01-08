import React from "react";
import angryPanda from "../../emotes/panda-angry.gif";
import marioCoin from "../../emotes/mario-coin.gif";
import dontCry from "../../emotes/dont-cry.gif";
import moneyMouth from "../../emotes/money-mouth.gif";
import styles3 from "../../css/emote.module.scss";
import coolDoge from "../../emotes/cool-doge.gif";

const GifEmote = ({ type, dialInput }) => {
  const emoteSwitch = (emote) => {
    switch (emote) {
      case "belowAvreage3":
        return (
          <>
            <img className={styles3.giff} src={angryPanda} alt="angry panda" />

            <h4>last 3 below avreage</h4>
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
            <h4>last 3 above avreage</h4>
          </>
        );
      case "belowAvreage5":
        return (
          <>
            <img className={styles3.giff} src={dontCry} alt="dont cry" />

            <h4>last 5 below avreage</h4>
          </>
        );
      case "aboveAvreage5":
        return (
          <>
            <img
              className={styles3.giffMoneyMouth}
              src={moneyMouth}
              alt="money mounth"
            />
            <img
              className={styles3.giffMoneyMouth}
              src={moneyMouth}
              alt="money mounth"
            />
            <img
              className={styles3.giffMoneyMouth}
              src={moneyMouth}
              alt="money mounth"
            />
            <img
              className={styles3.giffMoneyMouth}
              src={moneyMouth}
              alt="money mounth"
            />
            <img
              className={styles3.giffMoneyMouth}
              src={moneyMouth}
              alt="money mounth"
            />

            <h4>last 5 above avreage</h4>
          </>
        );

      case "topManch":
        return (
          <>
            <img
              className={styles3.giff}
              id={styles3.topTip}
              src={coolDoge}
              alt="cool doge"
            />

            <h4 style={{ fontSize: "1.2em" }}>TOP TIP !!!</h4>
          </>
        );

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
