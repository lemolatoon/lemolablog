import React from "react";
import { IconType } from "react-icons/lib";
import { ButtonProps, HoverButton, TransparentButton } from "./Button";

type IconButtonProps = {
  children: React.ReactNode;
  icon: IconType;
  onClick?: () => void;
  type?: React.ComponentProps<"button">["type"];
  disabled?: boolean;
} & ButtonProps;

const HoverButtonLikeStyledDiv = HoverButton.withComponent("div");

export const IconButton = ({
  children,
  icon: Icon,
  onClick,
  type,
  disabled,
  ...buttonProps
}: IconButtonProps) => {
  return (
    <HoverButtonLikeStyledDiv onClick={onClick} {...buttonProps}>
      <Icon />
      <TransparentButton {...buttonProps} disabled={disabled} type={type}>
        {children}
      </TransparentButton>
    </HoverButtonLikeStyledDiv>
  );
};
