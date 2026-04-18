// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, phoneNumber, reason } = req.body;

    // Validate required fields
    if (!name || !email || !reason) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and reason are required' 
      });
    }

    // Send email using FormSubmit.co
    const formSubmitResponse = await fetch('https://formsubmit.co/ajax/pnteziryayo422@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phoneNumber || 'Not provided',
        reason: reason === 'invest' ? 'I want to invest in Rwanda' 
                : reason === 'rentals' ? 'I need long term rentals in Rwanda' 
                : 'Just gathering information',
        _subject: `New Guide Download Request from ${name}`,
        _template: 'table',
        _captcha: 'false'
      })
    });

    if (formSubmitResponse.ok) {
      return res.status(200).json({ 
        success: true, 
        message: 'Email sent successfully' 
      });
    } else {
      throw new Error('Failed to send email');
    }

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send email. Please try again.' 
    });
  }
}