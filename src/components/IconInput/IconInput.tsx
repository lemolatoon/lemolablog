import React, { ComponentProps, useRef } from "react";
import { IconType } from "react-icons";
import styled from "styled-components";
import { IconButton } from "@/components/IconButton";

const TransparentInput = styled.input`
  display: none;
`;

type IconInput = {
  children?: React.ReactNode;
  icon: IconType;
  onFileUploaded: (file: File) => void;
  accept?: ComponentProps<"input">["accept"];
} & Omit<ComponentProps<typeof IconButton>, "children">;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const IconInput = ({
  children,
  onFileUploaded,
  onClick: _onClick,
  accept,
  ...iconButtonProps
}: IconInput) => {
  const ref = useRef<HTMLInputElement>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files.item(0) : null;
    file && file.type.startsWith("image/") && onFileUploaded(file);
    if (ref.current) ref.current.value = "";
  };
  const onClick = () => {
    if (ref.current) {
      ref.current.click();
    }
    if (_onClick) {
      _onClick();
    }
  };
  return (
    <>
      <IconButton {...iconButtonProps} onClick={onClick}>
        {children}
      </IconButton>
      <TransparentInput
        onChange={onChange}
        ref={ref}
        type="file"
        accept={accept}
      />
    </>
  );
};
