import { Meta, StoryObj } from "@storybook/react";
import { BannerMenu } from "./BannerMenu";

type Component = typeof BannerMenu;
type CMeta = Meta<Component>;
type Story = StoryObj<Component>;

const meta: CMeta = {
  component: BannerMenu,
};
export default meta;

export const BannerMenuStory: Story = {
  args: {
    isOpen: false,
    children: ["Home", "About", "Blog", "Contact"],
    headerHeight: "3em",
  },
};
