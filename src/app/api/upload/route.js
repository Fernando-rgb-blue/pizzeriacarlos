export async function POST(req) {
    const data = await register.formData();
    if (data.get('file')) {
        // upload file
    }
    return Response.json(true);
}