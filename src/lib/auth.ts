import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'vdcet_secret_jwt_key_local_development_2026';
const COOKIE_NAME = 'vdcet_admin_session';

export function signAdminToken(): string {
  return jwt.sign({ role: 'admin', site: 'vdcet' }, JWT_SECRET, { expiresIn: '8h' });
}

export function verifyAdminToken(token: string): boolean {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded && decoded.role === 'admin' && decoded.site === 'vdcet';
  } catch (err) {
    return false;
  }
}

export function getAdminSessionFromCookies(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return verifyAdminToken(token);
  } catch {
    return false;
  }
}

export function isAuthorizedAdminRequest(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}

export { COOKIE_NAME };
