import { motion } from 'framer-motion';
import { useState } from 'react';
import { MdContentCopy } from 'react-icons/md';

function CaptionCard({ caption, index, patrick_Hand }: any) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    const captionText = caption;
    const textArea = document.createElement('textarea');
    textArea.value = captionText;

    // Add the textarea to the DOM
    document.body.appendChild(textArea);

    // Select the text in the textarea
    textArea.select();

    // Copy the text to the clipboard
    document.execCommand('copy');

    // Remove the textarea from the DOM
    document.body.removeChild(textArea);

    // Set the copied state to true
    setIsCopied(true);

    // Reset the copied state after a short delay
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.5 }}
      key={caption}
      className="flex max-w-2xl rounded-lg drop-shadow-md  bg-gradient-to-r from-pink-100 via-red-100 to-red-200 px-4 py-2"
    >
      <h3
        className={`drop-shadow-xl shadow-black  text-xl font-semibold leading-10 ${patrick_Hand}`}
      >
        {index + 1}. “ {caption} ”
      </h3>

      <div
        onClick={handleCopyClick}
        className="-mt-4 rounded-md flex items-center justify-center ml-auto cursor-pointer"
      >
        {isCopied ? (
          <p className="text-xs font-sans">Copied!</p>
        ) : (
          <MdContentCopy size={20} />
        )}
      </div>
    </motion.article>
  );
}

export default CaptionCard;
