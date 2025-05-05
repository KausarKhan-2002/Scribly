import { IoCloseOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

function Modal({ children, isOpen, onClose, title }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 right-0 left-0 z-50 px-4 flex justify-center items-center w-screen h-screen max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        > 
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative p-4 w-full max-w-2xl max-h-full"
          >
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {title}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 dark:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  onClick={onClose}
                >
                  <IoCloseOutline className="text-2xl" />
                </button>
              </div>

              {/* Modal Body */}
              <section className="p-4 md:p-5 space-y-4">{children}</section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;