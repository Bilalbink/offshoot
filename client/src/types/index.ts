export type User = {
    $id: string;
    name: string;
    email: string;
};

export interface SpotifyUserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean;
        filter_locked: boolean;
    };
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: number;
    };
    href: string;
    id: string;
    images: Array<{
        url: string;
        height: number;
        width: number;
    }>;
    product: string;
    type: string;
    uri: string;
}

export interface SpotifyPlaylist {
    collaborative: boolean;
    description: string;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: {
        url: string;
        height: number | null;
        width: number | null;
    }[];
    name: string;
    owner: {
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        type: "user";
        uri: string;
        display_name: string;
    };
    public: boolean;
    snapshot_id: string;
    tracks: {
        href: string;
        total: number;
    };
    type: "playlist";
    uri: string;
    primary_color: string | null;
}

export interface SpotifyTrack {
    track: {
        id: string;
        name: string;
        album: {
            name: string;
            images: {
                url: string;
                width: number;
                height: number;
            }[];
        };
        artists: {
            id: string;
            name: string;
            genres?: string[];
        }[];
    };
}

export type ApiResponse<T> = {
    success: boolean;
    data: T;
};
