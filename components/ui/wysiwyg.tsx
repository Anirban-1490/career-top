"use client";

import { TextAlignCenter, TextAlignEnd, TextAlignStart } from "lucide-react";
import { GenericLabel, IGenericLabelProps } from "./generic-label";
import Editor, {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnStrikeThrough,
  BtnUnderline,
  createButton,
  EditorProps,
  Toolbar,
} from "react-simple-wysiwyg";
const BtnAlignCenter = createButton(
  "Align center",
  <TextAlignCenter size={18} />,
  "justifyCenter"
);
const BtnAlignLeft = createButton(
  "Align left",
  <TextAlignStart size={18} />,
  "justifyLeft"
);
const BtnAlignRight = createButton(
  "Align right",
  <TextAlignEnd size={18} />,
  "justifyRight"
);
export function WYSIWYG({
  labelContent,
  showToolbar = true,
  ...props
}: IGenericLabelProps & EditorProps & { showToolbar?: boolean }) {
  return (
    <GenericLabel
      parentProps={{
        id: "editor",
      }}
      labelContent={labelContent}
    >
      <Editor
        {...props}
        containerProps={{
          className: `!min-h-[14rem] !border-input-outline ${props.className}`,
        }}
      >
        {showToolbar ? (
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <BtnBulletList />
            <BtnLink />
            <BtnAlignLeft />
            <BtnAlignCenter />
            <BtnAlignRight />
          </Toolbar>
        ) : (
          <></>
        )}
      </Editor>
    </GenericLabel>
  );
}
