import React, { useRef, useState } from 'react';
import '../assets/styles/Contact.scss';
import emailjs from '@emailjs/browser';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

const EMAILJS_SERVICE_ID = 'service_pirlb0s';
const EMAILJS_TEMPLATE_ID = 'template_e6r727n';
const EMAILJS_PUBLIC_KEY = 'O_omsYZ_z-EnQIGGV';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

function Contact() {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);

  const [status, setStatus] = useState<SubmitStatus>('idle');

  const form = useRef();

  const sendEmail = (e: any) => {
    e.preventDefault();

    const hasNameError = name === '';
    const hasEmailError = email === '';
    const hasMessageError = message === '';

    setNameError(hasNameError);
    setEmailError(hasEmailError);
    setMessageError(hasMessageError);

    if (hasNameError || hasEmailError || hasMessageError) {
      return;
    }

    setStatus('sending');

    const templateParams = { name, email, message };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY).then(
      () => {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      },
      () => {
        setStatus('error');
      },
    );
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contact Me</h1>
          <p>Got a project waiting to be realized? Let's collaborate and make it happen!</p>
          <Box
            ref={form}
            component="form"
            noValidate
            autoComplete="off"
            className='contact-form'
          >
            <div className='form-flex'>
              <TextField
                required
                variant="filled"
                id="contact-name"
                label="Your Name"
                placeholder="What's your name?"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                error={nameError}
                helperText={nameError ? "Please enter your name" : ""}
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                variant="filled"
                id="contact-email"
                label="Email / Phone"
                placeholder="How can I reach you?"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                error={emailError}
                helperText={emailError ? "Please enter your email or phone number" : ""}
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <TextField
              required
              variant="filled"
              id="contact-message"
              label="Message"
              placeholder="Send me any inquiries or questions"
              multiline
              rows={10}
              className="body-form"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              error={messageError}
              helperText={messageError ? "Please enter the message" : ""}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start" className="textarea-adornment">
                    <ChatBubbleOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
            <div className="form-actions">
              {status === 'success' && (
                <p className="form-status form-status--success">
                  <CheckCircleOutlineIcon/> Message sent — thanks for reaching out! I'll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="form-status form-status--error">
                  <ErrorOutlineIcon/> Something went wrong. Please email me directly at paultrpe@gmail.com instead.
                </p>
              )}
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={sendEmail}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send'}
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Contact;
