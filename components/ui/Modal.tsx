"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { useClickAway } from "react-use";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const ref = useRef(null);
  useClickAway(ref, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-md z-[30000] flex items-center justify-center"
        >
          <motion.div
            ref={ref}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="max-w-md bg-white w-full p-8 rounded-md flex items-center flex-col gap-4"
          >
            <h1 className="sm:text-xl font-semibold">{title}</h1>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}