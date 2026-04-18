// app/api/send-email/route.ts (for App Router)
// OR
// pages/api/send-email.ts (for Pages Router)

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, phoneNumber, reason } = await request.json();

    // Email content
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #7FE7D8; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #333; }
          .value { margin-top: 5px; color: #666; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Real Estate Guide Download Request</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Phone Number:</div>
              <div class="value">${phoneNumber || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="label">Reason:</div>
              <div class="value">${reason === 'invest' ? 'I want to invest in Rwanda' : reason === 'rentals' ? 'I need long term rentals in Rwanda' : 'Just gathering information'}</div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from your Invest Rwanda page</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Using EmailJS or FormSubmit (no configuration needed)
    // Option 1: Using FormSubmit.co (Easiest - no setup required)
    const formSubmitResponse = await fetch('https://formsubmit.co/ajax/pnteziryayo422@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phoneNumber,
        reason: reason,
        _subject: `New Guide Download Request from ${name}`,
        _template: 'table',
        _captcha: 'false'
      })
    });

    if (formSubmitResponse.ok) {
      return NextResponse.json({ 
        success: true, 
        message: 'Email sent successfully' 
      });
    } else {
      throw new Error('Failed to send email');
    }

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}