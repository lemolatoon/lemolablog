import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

type Component = typeof Button;
type CMeta = Meta<Component>;
type Story = StoryObj<Component>;

const meta: CMeta = {
  component: Button,
};
export default meta;

export const ButtonStory: Story = {
  args: {
    children: "Click me",
  },
};
