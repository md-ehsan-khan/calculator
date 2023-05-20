/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import Buttons from "../atoms/Buttons";
import {
  btnsLevel1,
  btnsLevel2,
  btnsLevel3,
  btnsLevel4,
} from "../constants/buttonConstants";

const styles = {
  calculatorWrapper: (isLightTheme) => css`
    padding: 30px;
    height: 700px;
    width: 400px;
    overflow: hidden;
    border-radius: 20px;
    background-color: var(--calc-bg);
    box-shadow: var(--box-shadow);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-image: ${isLightTheme
      ? "var(--light-theme);"
      : "var(--dark-theme);"};
  `,
  resultWrapper: css`
    position: relative;
    margin-bottom: 20px;
    text-align: right;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    max-height: 240px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  resultInput: css`
    font-size: 1.5rem;
    max-width: 320px;
    word-wrap: break-word;
  `,
  result: css`
    font-size: 3.5rem;
    line-height: 1;
    color: var(--calc-res-color);
    max-width: 320px;
    word-wrap: break-word;
  `,
  themeButton: css`
    border: 0;
    outline: 0;
    font-size: 1.25rem;
    font-weight: 500;
    background-color: transparent;
    color: var(--txt-color);
  `,
};

const Calculator = () => {
  const [buttonsSelected, setButtonsSelected] = React.useState("");
  const [isLightTheme, setIsLightTheme] = React.useState(true);
  const [result, setResult] = React.useState("");

  const calculateResult = () => {
    let selectedButtons = buttonsSelected
      .replaceAll("x", "*")
      .split(["*", "+", "/", "-"])
      .join(" ");
    let result;
    try {
      result = eval(selectedButtons);
    } catch {
      setResult("Catch Error");
      setButtonsSelected("");
    }
    if (result === undefined) {
      setResult("Error");
      setButtonsSelected("");
    } else {
      setResult(result);
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      if (key === "Enter") {
        calculateResult();
      } else if (key === "Escape") {
        setButtonsSelected("");
        setResult("");
      } else if (key.match(/[0-9.+\-*/]/)) {
        // Handle numeric and operator keys
        setButtonsSelected((prevState) => prevState + key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonsSelected]);

  const handleButtonClick = (value) => {
    if (value === "C") {
      setButtonsSelected("");
      setResult("");
      return;
    }
    if (value === "=") {
      calculateResult();
      return;
    }
    setButtonsSelected((prevState) => prevState + value);
  };

  return (
    <div css={styles.calculatorWrapper(isLightTheme)}>
      <div css={styles.resultWrapper}>
        <div css={styles.resultInput}>{buttonsSelected}</div>
        <div css={styles.result}>{result}</div>
      </div>
      <Buttons buttons={btnsLevel1} handleButtonClick={handleButtonClick} />
      <Buttons buttons={btnsLevel2} handleButtonClick={handleButtonClick} />
      <Buttons buttons={btnsLevel3} handleButtonClick={handleButtonClick} />
      <Buttons buttons={btnsLevel4} handleButtonClick={handleButtonClick} />
      <button
        css={styles.themeButton}
        onClick={() => setIsLightTheme(!isLightTheme)}
      >
        Switch Theme
      </button>
    </div>
  );
};

export default Calculator;
