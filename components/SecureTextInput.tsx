import React, { forwardRef, useRef, useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import * as Clipboard from "expo-clipboard";
import { getSecureTextInputProps, showSecurityWarning } from "../utils/appSecurity";

interface SecureTextInputProps extends TextInputProps {
  secure?: boolean;
}

const SecureTextInput = forwardRef<TextInput, SecureTextInputProps>(
  ({ secure = false, value: propValue, onChangeText, onFocus, onBlur, style, ...props }, ref) => {
    const inputRef = useRef<TextInput>(null);
    const mergedRef = (ref as React.RefObject<TextInput>) || inputRef;

    const [value, setValue] = useState<string>((propValue ?? "").toString());
    const lastValueRef = useRef<string>(value);

    const secureProps = getSecureTextInputProps();

    const clearClipboard = async () => {
      try {
        await Clipboard.setStringAsync("");
      } catch {}
    };

    const handleFocus = async (e: any) => {
      if (secure) {
        await clearClipboard();
        setTimeout(clearClipboard, 100);
        setTimeout(clearClipboard, 300);
      }
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      onBlur?.(e);
    };

    const isLikelyPaste = (prev: string, next: string, clip: string | null) => {
      if (!secure) return false;
      if (next.length - prev.length > 1) return true;
      if (clip && clip.length > 1 && next.includes(clip)) return true;
      return false;
    };

    const handleChangeText = async (next: string) => {
      if (secure) {
        let clip: string | null = null;
        try {
          clip = await Clipboard.getStringAsync();
        } catch {}
        if (isLikelyPaste(lastValueRef.current, next, clip)) {
          await clearClipboard();
          showSecurityWarning("Pasting is disabled for security reasons");
          setValue(lastValueRef.current);
          return;
        }
      }
      setValue(next);
      lastValueRef.current = next;
      onChangeText?.(next);
    };

    return (
      <TextInput
        ref={mergedRef}
        style={style}
        secureTextEntry={secure}
        {...secureProps}
        {...props}
        value={value}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        contextMenuHidden={secure}
        selectTextOnFocus={false}
        autoCorrect={false}
        autoCapitalize="none"
        spellCheck={false}
      />
    );
  }
);

SecureTextInput.displayName = "SecureTextInput";
export default SecureTextInput;

