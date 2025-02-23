'use server';

import { redirect } from 'next/navigation';
import { BACKEND_URL } from './constants';
import { FormState } from './type';
import { createSession, updateTokens } from './session';

export async function signUp(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    }),
  });

  if (response.ok) {
    redirect('/auth/signin');
  } else {
    return {
      message:
        response.status === 409
          ? 'The user is already existed!'
          : response.statusText,
    };
  }
}

export async function signIn(
  name: string,
  password: string
): Promise<{ ok: boolean; error?: string }> {
  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      password,
    }),
  });

  if (response.ok) {
    const result = await response.json();

    // Create The Session For Authenticated User.

    await createSession({
      user: {
        id: result.user.id,
        name: result.user.name,
        company_id: result.user.company_id,
        role_id: result.user.role_id,
        email: result.user.email,
        image: result.user.image,
      },
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
    return { ok: true };
  } else {
    return {
      ok: false,
      error:
        response.status === 401 ? 'Invalid Credentials!' : response.statusText,
    };
  }
}

export const refreshToken = async (oldRefreshToken: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: oldRefreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token' + response.statusText);
    }

    const { accessToken, refreshToken } = await response.json();
    // update session with new tokens
    const updateRes = await fetch('http://localhost:3000/api/auth/update', {
      method: 'POST',
      body: JSON.stringify({
        accessToken,
        refreshToken,
      }),
    });
    if (!updateRes.ok) throw new Error('Failed to update the tokens');

    return accessToken;
  } catch (err) {
    console.error('Refresh Token failed:', err);
    return null;
  }
};
