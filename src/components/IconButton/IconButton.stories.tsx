import { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";
import { FaCloudUploadAlt } from "react-icons/fa";

type Component = typeof IconButton;
type CMeta = Meta<Component>;
type Story = StoryObj<Component>;

const meta: CMeta = {
  component: IconButton,
};
export default meta;

export const UploadIconButtonStory: Story = {
  args: {
    icon: FaCloudUploadAlt,
    iconFontLevel: 3,
  },
};

export const WithText: Story = {
  args: {
    icon: FaCloudUploadAlt,
    children: "Upload",
    iconFontLevel: 3,
  },
};

export const UploadIconButtonDisabledStory: Story = {
  args: {
    icon: FaCloudUploadAlt,
    disabled: true,
  },
};
