import { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function CropModal({ blobURL, setBlobURL, setBlobFile, onClose }) {
  const cropperRef = useRef(null);

  const handleCrop = async () => {
    const cropper = cropperRef.current?.cropper;

    if (cropper) {
      const canvas = cropper.getCroppedCanvas();

      const blobFile = await new Promise((res) =>
        canvas.toBlob(res, "image/jpeg", 0.9)
      );

      if (blobFile) {
        const createBlobUrl = URL.createObjectURL(blobFile);
        setBlobFile(blobFile);
        setBlobURL(createBlobUrl);
        onClose();
      }
    }
  };

  return (
    <div className="w-full h-screen fixed top-0 left-0 bg-black/50 flex justify-center items-center z-50">
      <div className="border-[10px] border-white rounded-md bg-white max-w-md w-full">
        <Cropper
          src={blobURL}
          style={{ height: 400, width: "100%" }}
          initialAspectRatio={1}
          guides={false}
          ref={cropperRef}
          viewMode={1}
          dragMode="move"
          background={false}
        />
        <div className="flex justify-end gap-4 px-4 py-3 border-t border-gray-200 bg-white rounded-b-md">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleCrop}
            className="px-4 py-2 rounded-md bg-sky-600 text-white transition"
          >
            Crop & Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CropModal;