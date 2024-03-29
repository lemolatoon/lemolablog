import React from "react";
import { IconType } from "react-icons/lib";
import { FontLevel, fontLevel2FontSize } from "@/types/style";
import {
  ButtonProps,
  HoverButton,
  TransparentButton,
} from "@/components/Button";

type IconButtonProps = {
  children?: React.ReactNode;
  icon: IconType;
  iconFontLevel?: FontLevel;
  onClick?: () => void;
  type?: React.ComponentProps<"button">["type"];
  disabled?: boolean;
} & ButtonProps;

const HoverButtonLikeStyledDiv = HoverButton.withComponent("div");

export const IconButton = ({
  children,
  icon: Icon,
  onClick,
  iconFontLevel,
  type,
  disabled,
  ...buttonProps
}: IconButtonProps) => {
  return (
    <HoverButtonLikeStyledDiv onClick={onClick} {...buttonProps}>
      <Icon
        fontSize={iconFontLevel ? fontLevel2FontSize(iconFontLevel) : undefined}
      />
      {children && (
        <TransparentButton {...buttonProps} disabled={disabled} type={type}>
          {children}
        </TransparentButton>
      )}
    </HoverButtonLikeStyledDiv>
  );
};
