import playlistBackground from "../assets/images/playlist-splitter-bg.png";
import wrapBackground from "../assets/images/wrap-background.webp";
import discoverBackground from "../assets/images/discover-background.jpg";

export type ToolType = "playlist-splitter" | "monthly-wrap" | "discover";

export const TOOLS_CONFIG: Record<
    ToolType,
    {
        name: string;
        description: string;
        image: string;
        route: string;
        active: boolean;
    }
> = {
    "playlist-splitter": {
        name: "Playlist Splitter",
        description:
            "Split your large playlists into smaller, organized collections based on genre, mood and more",
        image: playlistBackground,
        route: "/playlist-splitter",
        active: true,
    },
    "monthly-wrap": {
        name: "Monthly Wrap",
        description:
            "View detailed statistics about your listening habits over the past month",
        image: wrapBackground,
        route: "/monthly-wrap",
        active: false,
    },
    discover: {
        name: "Discover Music",
        description:
            "Get personalized music recommendations based on your listening history",
        image: discoverBackground,
        route: "/discover",
        active: false,
    },
};
