import { writeFile } from "fs/promises";
import path from "path";
import uniqid from 'uniqid';

export async function POST(req) {
    const data = await req.formData();
    if (data.get('file')) {
        const file = data.get('file');
        const buffer = Buffer.from(await file.arrayBuffer());
        const ext = file.name.split('.').slice(-1)[0];
        const newFileName = uniqid() + '.' + ext;
        const directory = "/uploads/" + newFileName

        await writeFile(
            path.join(
                process.cwd(), 'public' + directory
            ),
            buffer
        );

        return Response.json(directory);
    }
    return Response.json(true);
}