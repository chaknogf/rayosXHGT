import { useState } from "react";

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyText = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 10000); // Restablecer el estado después de 2 segundos
      })
      .catch((err) => {
        console.error("Error al copiar el texto:", err);
        setIsCopied(false);
      });
  };

  return { isCopied, copyText };
};

export default useCopyToClipboard;
