import TemplatePreview from "@/components/dashboard/template-preview";
import { account } from "@/config/appwrite-server";

const UserPortfolioPage = async ({ params }: { params: { userId: string } }) => {

	const token = await account.createJWT();

	return <TemplatePreview id={userId} />;
}

export default UserPortfolioPage;