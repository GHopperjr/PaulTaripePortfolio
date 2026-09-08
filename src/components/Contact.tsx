import React, { useEffect, useRef, useState } from 'react';
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

// Throttles repeat submissions from the same browser after a send.
const COOLDOWN_SECONDS = 60;
const LAST_SENT_STORAGE_KEY = 'portfolio_contact_last_sent';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

const getCooldownSecondsRemaining = (): number => {
  const lastSent = Number(localStorage.getItem(LAST_SENT_STORAGE_KEY) ?? 0);
  const elapsedSeconds = (Date.now() - lastSent) / 1000;
  return Math.max(0, Math.ceil(COOLDOWN_SECONDS - elapsedSeconds));
};

function Contact() {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);

  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [honeypot, setHoneypot] = useState<string>('');
  const [cooldown, setCooldown] = useState<number>(0);

  const form = useRef();

  // Ticks the cooldown down once a second; picks up an in-progress cooldown
  // from a previous visit too, since it's tracked by wall-clock time.
  useEffect(() => {
    setCooldown(getCooldownSecondsRemaining());

    const timer = setInterval(() => {
      setCooldown(getCooldownSecondsRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const startCooldown = () => {
    localStorage.setItem(LAST_SENT_STORAGE_KEY, String(Date.now()));
    setCooldown(COOLDOWN_SECONDS);
  };

  const sendEmail = (e: any) => {
    e.preventDefault();

    if (cooldown > 0 || status === 'sending') {
      return;
    }

    // Honeypot: a real visitor never sees or fills this field, so anything in
    // it marks the submission as automated. Pretend it succeeded so a bot
    // gets no signal to adapt around, but skip the actual EmailJS call.
    if (honeypot !== '') {
      startCooldown();
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      return;
    }

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
        startCooldown();
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
            {/* Honeypot: hidden from real visitors, so anything filling it in is automated. */}
            <div className="honeypot-field" aria-hidden="true">
              <label htmlFor="contact-company">Company</label>
              <input
                type="text"
                id="contact-company"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>
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
              {status !== 'success' && status !== 'error' && cooldown > 0 && (
                <p className="form-status form-status--info">
                  You can send another message in {cooldown}s.
                </p>
              )}
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={sendEmail}
                disabled={status === 'sending' || cooldown > 0}
              >
                {status === 'sending' ? 'Sending…' : cooldown > 0 ? `Wait ${cooldown}s` : 'Send'}
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Contact;
