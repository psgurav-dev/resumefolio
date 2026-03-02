'use client';
import ProfileDetails from "@/components/dashboard/profile/profile-details";
import { account } from "@/config/appwrite";
import { useEffect, useState } from "react";

const ProfilePage = () => {
	const [user, setUser] = useState<any | null>(null)
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function getUsersDetails() {
			const jwt = await account.createJWT();
			try {
				const response = await fetch(`/api/users`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						"authorization": jwt.jwt ?? ""
					},
				});
				if (response.ok) {
					const data = await response.json();
					console.log(data)
					if (data.user) {
						setUser(data.user)
					}
				} else {
					console.error('Failed to fetch resume data');
				}
			} catch (error) {
				console.error('Error fetching resume data:', error);
			}
			finally {
				setLoading(false);
			}
		}
		getUsersDetails();
		return () => { }
	}, [])

	return (
		<div>
			{/* {loading ? <>loading...</> : <ProfileDetails user={user} />} */}
		</div>
	)
}

export default ProfilePage;