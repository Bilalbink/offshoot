// client/src/components/ProfileCard.tsx
import type { SpotifyUserProfile } from "../../../types/index";

type ProfileCardProps = {
    profile: SpotifyUserProfile;
};

const ProfileCard = ({ profile }: ProfileCardProps) => {
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex items-center gap-6">
                    {profile.images?.[0] && (
                        <div className="avatar">
                            <div className="w-24 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
                                <img
                                    src={profile.images[0].url}
                                    alt={profile.display_name}
                                />
                            </div>
                        </div>
                    )}
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold">
                            {profile.display_name}
                        </h3>
                        <p className="text-base-content/60 mt-1">
                            {profile.email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
