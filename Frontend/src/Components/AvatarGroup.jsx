import React from "react";

function AvatarGroup({ avatars, maxVisible = 3 }) {
  return (
    <div className="flex items-center">
      {/* Display grouped avatar after selecting */}
      {avatars.slice(0, maxVisible).map((avatar, ind) => (
        <img
          key={ind}
          src={avatar}
          alt={`Avatar${ind}`}
          className="w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0"
        />
      ))}

      {/* Visible +1 design If more avatar available */}
      {avatars.length > maxVisible && (
        <div className="w-9 h-9 flex items-center justify-center bg-blue-50 text-sm font-medium rounded-full border-2 border-white -ml-3">
          +{avatars.length - maxVisible}
        </div>
      )}
    </div>
  );
}

export default AvatarGroup;