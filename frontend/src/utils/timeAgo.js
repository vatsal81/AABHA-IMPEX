export const formatTimeAgo = (dateString) => {
    if (!dateString) return '';
    const now = new Date();
    const past = new Date(dateString);
    const diffInMs = now - past;
    const diffInSecs = Math.floor(diffInMs / 1000);
    const diffInMins = Math.floor(diffInSecs / 60);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSecs < 60) {
        return 'just now';
    } else if (diffInMins < 60) {
        return `${diffInMins} min ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} h ago`;
    } else if (diffInDays < 7) {
        return `${diffInDays} d ago`;
    } else {
        return past.toLocaleDateString();
    }
};
