import React, { FunctionComponent } from "react";

interface containerProps {
  children: React.ReactNode;
  title: string;
}

const Container: FunctionComponent<containerProps> = ({ children, title }) => {
  return (
    <div className="container">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Container;
