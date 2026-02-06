import { account } from "@/config/appwrite";
import { Models } from "appwrite";
import { useEffect, useState } from "react";

export function useAppwriteUser() {
	const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

	useEffect(() => {
		account.get().then(setUser).catch(() => setUser(null));
	}, []);

	return user;
}
