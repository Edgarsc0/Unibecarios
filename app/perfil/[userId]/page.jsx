import ProfileModal from "../ProfileModal";

export default async function ProfilePage({ params }) {

    const { userId } = await params;

    return (
        <ProfileModal user={userId} />
    );
}