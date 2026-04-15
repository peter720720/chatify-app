import { useAuthStore } from "../store/useAuthStore";

function ProfileHeader({ isVertical = false }) {
  const { authUser } = useAuthStore();

  if (!authUser) return null;

  // ============================================================
  // VERTICAL MODE: Used only as a Navigation Button in Sidebar
  // No file upload, no sound, no logout. Just the image.
  // ============================================================
  if (isVertical) {
    return (
      <div className="flex flex-col items-center shrink-0">
        <div className="size-12 rounded-full overflow-hidden border-2 border-slate-700/50">
          <img 
            src={authUser.profilePic || "/avatar.png"} 
            alt="User avatar" 
            className="size-full object-cover" 
          />
        </div>
      </div>
    );
  }

  // ============================================================
  // HORIZONTAL MODE: Used inside the Settings list
  // This version shows the name and status.
  // ============================================================
  return (
    <div className="flex items-center gap-4">
      <div className="size-14 rounded-full overflow-hidden border-2 border-slate-700">
        <img 
          src={authUser.profilePic || "/avatar.png"} 
          alt={authUser.fullName} 
          className="size-full object-cover" 
        />
      </div>
      <div className="text-left">
        <h3 className="text-lg font-semibold text-white truncate max-w-[160px]">
          {authUser.fullName}
        </h3>
        <p className="text-slate-400 text-xs">
          Available
        </p>
      </div>
    </div>
  );
}

export default ProfileHeader;
