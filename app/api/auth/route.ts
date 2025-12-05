import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'lib', 'users.json');

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: 'ユーザー名とパスワードは必須です' },
                { status: 400 }
            );
        }

        const usersData = fs.readFileSync(usersFilePath, 'utf-8');
        const { users } = JSON.parse(usersData);

        const user = users.find(
            (u: any) => u.username === username && u.password === password
        );

        if (!user) {
            return NextResponse.json(
                { error: 'ユーザー名またはパスワードが正しくありません' },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { success: true, message: `${username}でログインしました` },
            { status: 200 }
        );
    } catch (error) {
        console.error('認証エラー:', error);
        return NextResponse.json(
            { error: 'サーバーエラーが発生しました' },
            { status: 500 }
        );
    }
}
