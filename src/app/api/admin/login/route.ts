import { NextRequest, NextResponse } from 'next/server';
import { signAdminToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const expectedPassword = process.env.ADMIN_PASSWORD || 'adminvdcet123';

    if (!password || password !== expectedPassword) {
      return NextResponse.json(
        { error: 'Invalid authentication credentials' },
        { status: 401 }
      );
    }

    const token = signAdminToken();
    const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: 'Server error during authentication' }, { status: 500 });
  }
}
