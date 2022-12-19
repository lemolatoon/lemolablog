import React from "react";
import { IconType } from "react-icons/lib";
import { ButtonProps, HoverButton, TransparentButton } from "./Button";

type IconButtonProps = {
  children: React.ReactNode;
  icon: IconType;
  onClick?: () => void;
} & ButtonProps;

const HoverButtonLikeStyledDiv = HoverButton.withComponent("div");

export const IconButton = ({
  children,
  icon: Icon,
  onClick,
  ...buttonProps
}: IconButtonProps) => {
  return (
    <HoverButtonLikeStyledDiv {...buttonProps}>
      <Icon />
      <TransparentButton {...buttonProps} onClick={onClick}>
        {children}
      </TransparentButton>
    </HoverButtonLikeStyledDiv>
  );
};
