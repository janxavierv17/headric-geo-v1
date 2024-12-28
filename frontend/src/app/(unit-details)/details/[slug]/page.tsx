export default async function UnitDetails({ params }: { params: Promise<{ slug: number }> }) {
	const id = (await params).slug;
	return <h1>Unit details of id {id}</h1>;
}
