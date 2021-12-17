import React, { useState } from "react";
import styles from "../../css/main.module.scss";

const DialInput = ({ saveDialInput }) => {
  const [amount, setAmount] = useState(0);

  const amountChange = (e) => {
    setAmount(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (amount === "" || amount === undefined) {
      alert("netocan unos");
    } else {
      saveDialInput(amount);
      setAmount(0);
    }
  };

  const clickDelete = () => setAmount(0);

  return (
    <div className={styles.dialInput}>
      <input
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        className={styles.inputField}
        name="mancha"
        placeholder="Mancha"
        value={amount}
        onChange={amountChange}
        style={{ display: "block" }}
        autoFocus={true}
        onKeyDown={(evt) =>
          ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()
        }
      />
      <br />
      <div className={styles.saveDel}>
        <input
          type="submit"
          onClick={onSubmit}
          value="Save"
          className={styles.saveDelButtons}
        />

        <button
          id="delete"
          onClick={clickDelete}
          className={styles.saveDelButtons}
        >
          Del
        </button>
      </div>
    </div>
  );
};

export default DialInput;
