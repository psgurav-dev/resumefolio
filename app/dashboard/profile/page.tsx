'use client';
import ProfileCard from "@/components/dashboard/profile/profile-header";
import { selectCurrentUserId, useAppSelector } from "@/redux";
import { selectJWT } from "@/redux/selectors";
import { useEffect, useState } from "react";

const ProfilePage = () => {
	const [user, setUser] = useState<any | null>(null)
	const [loading, setLoading] = useState(false);

	const currenUserId = useAppSelector(selectCurrentUserId)
	const jwtToken = useAppSelector(selectJWT)

	console.log("current user", currenUserId)

	useEffect(() => {
		async function getUsersDetails() {
			try {
				const response = await fetch(`/api/users`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						"authorization": jwtToken ?? ""
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
	}, [user])

	return (
		<div>
			{loading ? <>loading...</> : <ProfileCard user={{}} />}
		</div>
	)
}

export default ProfilePage;