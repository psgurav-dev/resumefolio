import { motion } from "motion/react";
import ProfileCard from "./profile-header";


//  "user": {
//         "_id": "698483f7992e6af961b03b00",
//         "appwriteUserId": "68de38b8003d49705791",
//         "__v": 0,
//         "createdAt": "2026-02-05T11:50:10.635Z",
//         "email": "dev.psgurav@gmail.com",
//         "name": "Prasad Gurav",
//         "provider": "google",
//         "updatedAt": "2026-02-18T12:37:49.297Z",
//         "selectedResume": "6986e2020d1a3eea4a9d262f",
//         "username": "dev.psgurav"
//     }



const ProfileDetails = ({ user }: { user: any }) => {
	return (
		<div>
			<ProfileCard user={user} />
			<div className="p-10 font-bricolage">
				<motion.div>
					
				</motion.div>
			</div>
		</div>
	)
}

export default ProfileDetails;