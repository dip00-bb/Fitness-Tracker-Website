import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { ThemeContext } from "../ThemeContext/DarkLight";

export default function ThemeToggle() {
  const { mode, handleToggleMode } = useContext(ThemeContext);

  return (
    <button
      onClick={handleToggleMode}
      className="sticky right-4 bottom-5 flex items-center justify-center w-18 h-10 rounded-full cursor-pointer transition-colors "
    >
      <AnimatePresence mode="wait" initial={false}>
        {mode === "light" ? (
          <motion.div
            key="sun"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center w-6 h-6 bg-yellow-400 rounded-full"
          >
            <SunIcon className="w-8 h-8 text-white" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center w-6 h-6 bg-white rounded-full"
          >
            <MoonIcon className="w-8 h-8 text-gray-800" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}