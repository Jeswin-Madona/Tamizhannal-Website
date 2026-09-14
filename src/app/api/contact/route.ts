import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'செல்லாத தரவு வடிவம் (Invalid data format)' },
        { status: 400 }
      );
    }

    const { name, email, subject, message, website } = body;

    // Honeypot spam check: if hidden website field is filled, silently ignore bot
    if (website && typeof website === 'string' && website.trim() !== '') {
      return NextResponse.json(
        { success: true, message: 'உங்கள் செய்தி வெற்றிகரமாக அனுப்பப்பட்டது! நன்றி.' },
        { status: 200 }
      );
    }

    // Input Validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'உங்கள் பெயர் தேவை (Name is required)' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'சரியான மின்னஞ்சல் முகவரி தேவை (Valid email is required)' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'செய்தி விவரம் தேவை (Message is required)' },
        { status: 400 }
      );
    }

    const sanitizedSubject =
      subject && typeof subject === 'string' && subject.trim() !== ''
        ? subject.trim()
        : `TAMIZHANNAL Contact Form: ${name.trim()}`;

    const googleAppsScriptUrl =
      process.env.GOOGLE_APPS_SCRIPT_URL ||
      'https://script.google.com/macros/s/AKfycbzXUIVivu-y58nmakRfxoTd1AaT-DUbT8pZYY1QBc_C-vHiEMQopLbMVEC9JKHbLjAg3A/exec';

    if (!googleAppsScriptUrl) {
      return NextResponse.json(
        { success: false, error: 'சேவையக அமைப்பு பிழை (Server configuration error)' },
        { status: 500 }
      );
    }

    // 15-second server timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      subject: sanitizedSubject,
      message: message.trim(),
    };

    const response = await fetch(googleAppsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      redirect: 'follow',
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(
        `Google Apps Script responded with HTTP ${response.status}. ` +
          `If status is 401, ensure the Apps Script deployment setting "Who has access" is set to "Anyone".`
      );
      return NextResponse.json(
        { success: false, error: 'செய்தி அனுப்புவதில் பிழை ஏற்பட்டது. தயவுசெய்து பின்னர் முயற்சிக்கவும்.' },
        { status: 502 }
      );
    }

    const responseText = await response.text();

    if (!responseText || responseText.trim() === '') {
      console.warn('Google Apps Script returned empty response body.');
      return NextResponse.json(
        { success: false, error: 'சேவையகத்திலிருந்து வெற்று பதில் வந்தது.' },
        { status: 502 }
      );
    }

    // Check if Google returned an HTML redirect page (e.g. Google sign-in required)
    if (responseText.includes('<!DOCTYPE html>') || responseText.includes('<html')) {
      console.warn(
        'Google Apps Script returned an HTML page instead of JSON response. ' +
          'Please verify that "Who has access" in Google Apps Script deployment is set to "Anyone".'
      );
      return NextResponse.json(
        { success: false, error: 'செய்தி அனுப்புவதில் பிழை ஏற்பட்டது. தயவுசெய்து பின்னர் முயற்சிக்கவும்.' },
        { status: 502 }
      );
    }

    let responseData: Record<string, unknown> = {};
    try {
      responseData = JSON.parse(responseText);
    } catch {
      // Non-JSON string response from Apps Script is acceptable if HTTP status is 200 OK
    }

    if (responseData.result === 'error' || responseData.status === 'error') {
      return NextResponse.json(
        { success: false, error: 'செய்தி அனுப்புவதில் பிழை ஏற்பட்டது.' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'உங்கள் செய்தி வெற்றிகரமாக அனுப்பப்பட்டது! நன்றி.',
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { success: false, error: 'இணைப்பு நேரம் முடிந்தது. மீண்டும் முயற்சிக்கவும்.' },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'செய்தி அனுப்புவதில் பிழை ஏற்பட்டது. பின்னர் முயற்சிக்கவும்.' },
      { status: 500 }
    );
  }
}
