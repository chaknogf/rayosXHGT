import React, { useRef } from "react";
import useCopyToClipboard from "@/utils/copyClick";

interface CopyableTextProps {
  value: string;
}

const CopyableText: React.FC<CopyableTextProps> = ({ value }) => {
  const { isCopied, copyText } = useCopyToClipboard();
  const textRef = useRef<HTMLParagraphElement>(null);

  const handleClick = () => {
    if (textRef.current) {
      copyText(textRef.current.textContent || ""); // Copiar el texto del <p>
    }
  };

  return (
    <p
      ref={textRef}
      className="pointer"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {value}
      {isCopied && (
        <span style={{ color: "green", marginLeft: "10px" }}>¡Copiado!</span>
      )}
    </p>
  );
};

export default CopyableText;
