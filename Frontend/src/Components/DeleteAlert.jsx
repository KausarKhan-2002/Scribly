import Spinner from "../Shared/Spinner";

function DeleteAlert({ content, onDelete, onClose, onLoading }) {
  return (
    <div className="p-4 space-y-5">
      <h2 className="text-center text-slate-700 font-medium">{content}</h2>

      <div className="flex justify-center gap-4">
        {onLoading ? (
          <p className="bg-rose-100 text-rose-600 px-4 py-1 rounded-md flex items-center w-50 justify-center gap-5">
            Deleting... <Spinner />
          </p>
        ) : (
          <>
            <button
              onClick={onClose}
              className="text-sm font-medium px-4 py-1 rounded-md bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="text-sm font-medium px-4 py-1 rounded-md bg-red-50 text-red-600 border border-red-200 hover:border-red-300 transition cursor-pointer"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default DeleteAlert;