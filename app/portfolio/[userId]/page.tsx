import TemplatePreview from "@/components/dashboard/template-preview";

const UserPortfolioPage = async ({ params }: { params: { userId: string } }) => {
	const { userId } = await params;

	return <TemplatePreview id={userId} />;
}

export default UserPortfolioPage;