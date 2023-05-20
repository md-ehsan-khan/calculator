/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const styles = {
  buttonWrapper: css`
    display: flex;
    alig-items: center;
    justify-content: space-between;
    padding-bottom: 72px;
  `,
  buttons: css`
    border: 0;
    outline: 0;
    border-radius: 10px;
    font-size: 1.25rem;
    font-weight: 500;
    background-color: transparent;
    color: var(--txt-color);
  `,
};


const Buttons = (props) => {
  const {buttons, handleButtonClick} = props;
  return (
    <>
    <div css={styles.buttonWrapper}>
      {buttons.map((item, index) => (
        <button
          key={index}
          css={styles.buttons}
          onClick={() => handleButtonClick(item)}
        >
          {item}
        </button>
      ))}
    </div>
    </>
  );
};

export default Buttons;
