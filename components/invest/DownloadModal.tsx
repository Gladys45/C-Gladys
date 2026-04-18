// // components/invest/DownloadModal.tsx

// "use client";
// import { useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { useClickAway } from "react-use";
// import { DownloadFormData } from "@/types/invest-rwanda";

// type DownloadModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   guideTitle?: string;
//   onSubmit: (data: DownloadFormData) => void;
// };

// export default function DownloadModal({ 
//   isOpen, 
//   onClose, 
//   guideTitle = "Real Estate Guide",
//   onSubmit 
// }: DownloadModalProps) {
//   const [formData, setFormData] = useState<DownloadFormData>({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     reason: "",
//   });
  
//   const ref = useRef(null);
//   useClickAway(ref, onClose);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//     // Reset form
//     setFormData({ name: "", email: "", phoneNumber: "", reason: "" });
//   };

//   if (!isOpen) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black/80 backdrop-blur-md z-[30000] flex items-center justify-center p-4"
//     >
//       <motion.div
//         ref={ref}
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="max-w-md bg-white w-full rounded-lg overflow-hidden"
//       >
//         <div className="bg-primary p-6">
//           <h2 className="text-2xl font-bold text-white">
//             Download Your {guideTitle}
//           </h2>
//           <p className="text-white/90 mt-2">
//             Fill in your details to get instant access
//           </p>
//         </div>
        
//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           <input
//             type="text"
//             placeholder="Full Name *"
//             required
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
//           />
          
//           <input
//             type="email"
//             placeholder="Email Address *"
//             required
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
//           />
          
//           <input
//             type="tel"
//             placeholder="Phone Number"
//             value={formData.phoneNumber}
//             onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
//           />
          
//           <select
//             required
//             value={formData.reason}
//             onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
//           >
//             <option value="">Reason for download *</option>
//             <option value="invest">I want to invest in Rwanda</option>
//             <option value="rentals">I need long term rentals in Rwanda</option>
//             <option value="information">Just gathering information</option>
//           </select>
          
//           <button
//             type="submit"
//             className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
//           >
//             Download Guide
//           </button>
//         </form>
//       </motion.div>
//     </motion.div>
//   );
// }

// components/invest/DownloadModal.tsx

"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useClickAway } from "react-use";
import { DownloadFormData } from "@/types/invest-rwanda";

type DownloadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  guideTitle?: string;
  onSubmit: (data: DownloadFormData) => Promise<void>;
};

export default function DownloadModal({ 
  isOpen, 
  onClose, 
  guideTitle = "Real Estate Guide",
  onSubmit 
}: DownloadModalProps) {
  const [formData, setFormData] = useState<DownloadFormData>({
    name: "",
    email: "",
    phoneNumber: "",
    reason: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const ref = useRef(null);
  useClickAway(ref, () => {
    if (!isLoading) onClose();
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await onSubmit(formData);
      // Reset form on success
      setFormData({ name: "", email: "", phoneNumber: "", reason: "" });
      onClose();
    } catch (err) {
      setError("Failed to send. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[30000] flex items-center justify-center p-4"
    >
      <motion.div
        ref={ref}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md bg-white w-full rounded-lg overflow-hidden"
      >
        <div className="bg-primary p-6">
          <h2 className="text-2xl font-bold text-white">
            Download Your {guideTitle}
          </h2>
          <p className="text-white/90 mt-2">
            Fill in your details to get instant access
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
              {error}
            </div>
          )}
          
          <input
            type="text"
            placeholder="Full Name *"
            required
            disabled={isLoading}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary disabled:bg-gray-100"
          />
          
          <input
            type="email"
            placeholder="Email Address *"
            required
            disabled={isLoading}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary disabled:bg-gray-100"
          />
          
          <input
            type="tel"
            placeholder="Phone Number"
            disabled={isLoading}
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary disabled:bg-gray-100"
          />
          
          <select
            required
            disabled={isLoading}
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary disabled:bg-gray-100"
          >
            <option value="">Reason for download *</option>
            <option value="invest">I want to invest in Rwanda</option>
            <option value="rentals">I need long term rentals in Rwanda</option>
            <option value="information">Just gathering information</option>
          </select>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:bg-primary/50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Download Guide"
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}