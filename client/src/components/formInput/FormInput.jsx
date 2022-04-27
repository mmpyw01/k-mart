import { useState } from "react";
import "./formInput.css";
import styled from 'styled-components';

const Forminput = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
`;

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <Forminput>
      <label class ="labelRe">{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className="spanError">{errorMessage}</span>
    </Forminput>
  );
};

export default FormInput;
