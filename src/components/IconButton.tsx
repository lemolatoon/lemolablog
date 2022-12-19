import React from "react";
import { IconType } from "react-icons/lib";
import { ButtonProps, HoverButton, TransparentButton } from "./Button";

type IconButtonProps = {
  children: React.ReactNode;
  icon: IconType;
} & ButtonProps;

const HoverButtonLikeStyledDiv = HoverButton.withComponent("div");

export const IconButton = ({
  children,
  icon: Icon,
  ...buttonProps
}: IconButtonProps) => {
  return (
    <HoverButtonLikeStyledDiv {...buttonProps}>
      <Icon />
      <TransparentButton {...buttonProps}>{children}</TransparentButton>
    </HoverButtonLikeStyledDiv>
  );
};
