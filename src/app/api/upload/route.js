export async function POST(req) {
    const data = await req.formData();
    if (data.get('file')) {
        const file = data.get('file');
        console.log('File obtained.', file);
        // GO BACK TO THIS
    }
    return Response.json(true);
}